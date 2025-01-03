import {RequestService} from "./requestService";
import Message from "../../showMessage";
import {StorageKeys} from "../../../constants/storageKeys";
import {ServiceKey, storage} from "../serviceManager";

export class RequestImpl implements RequestService {
    private readonly BASE_URL: string; // 后端接口地址
    constructor() {
        this.BASE_URL = 'http://localhost:8080'; // 后端接口地址
    }

    serviceKey: string = ServiceKey.REQUEST_SERVICE_KEY;

    // 统一处理 GET 请求
    get<T>(url: string, params: Record<string, any> = {}): Promise<Request.ResponseData<T>> {
        return this.request<T>('GET', url, params);
    }

    // 统一处理 POST 请求
    post<T>(url: string, data: Record<string, any> = {}): Promise<Request.ResponseData<T>> {
        return this.request<T>('POST', url, data);
    }

    // 统一处理 PUT 请求
    put<T>(url: string, data: Record<string, any> = {}): Promise<Request.ResponseData<T>> {
        return this.request<T>('PUT', url, data);
    }

    // 内部请求方法
    private request<T>(
        method: 'GET' | 'POST' | 'PUT',
        url: string,
        data: Record<string, any> = {}
    ): Promise<Request.ResponseData<T>> {
        return new Promise<Request.ResponseData<T>>((resolve, reject) => {
            // 获取 token
            const token = storage.get(StorageKeys.TOKEN);
            // 配置请求参数
            const options: WechatMiniprogram.RequestOption<Request.ResponseData<T>> = {
                url: this.BASE_URL + url,
                method,
                data,
                header: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
                success: (res: WechatMiniprogram.RequestSuccessCallbackResult<Request.ResponseData<T>>) => {
                    const {statusCode, data} = res || {};
                    let {success, message} = data || {};
                    if (statusCode === 200 && success) {
                        resolve(data);
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