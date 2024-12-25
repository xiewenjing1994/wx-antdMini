// utils/request.ts
import {Storage} from "./storage";
import Message from "./showMessage";

interface ResponseData<T = any> {
    success: boolean;
    data: T;
    message?: string;
}

export default class Request {
    private static BASE_URL: string = 'http://localhost:8080'; // 后端接口地址
    private static TOKEN_KEY: string = 'token';  // 存储 token 的键
    // 统一处理 GET 请求
    static get<T>(url: string, params: Record<string, any> = {}): Promise<ResponseData<T>> {
        return this.request<T>('GET', url, params);
    }
    // 统一处理 POST 请求
    static post<T>(url: string, data: Record<string, any> = {}): Promise<ResponseData<T>> {
        return this.request<T>('POST', url, data);
    }

    // 内部请求方法
    private static request<T>(
        method: 'GET' | 'POST',
        url: string,
        data: Record<string, any> = {}
    ): Promise<ResponseData<T>> {
        return new Promise((resolve, reject) => {
            // 获取 token
            const token = Storage.get(this.TOKEN_KEY);
            // 配置请求参数
            const options: WechatMiniprogram.RequestOption = {
                url: this.BASE_URL + url,
                method,
                data,
                header: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
                success: (res) => {
                    const { statusCode, data }: { statusCode: number, data: ResponseData } = res || {};
                    let { success, message, data: resData } = data || {};
                    if (statusCode === 200 && success) {
                        resolve(resData as T);
                    } else {
                        // 报错提示
                        Message.showMessage({
                            message,
                            icon: 'error',
                        });
                    }
                },
                fail: (err) => {
                    reject(new Error(`请求失败: ${err.errMsg}`));
                },
            }
            // 发起请求
            wx.request(options);
        })
    }
}