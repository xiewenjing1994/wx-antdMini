import {RequestImpl} from "./requestImpl";
import {RequestService} from "./requestService";

class RequestManager<T> {
    // 创建单例对象
    private static instance: RequestManager<any> | undefined;

    static getInstance(): RequestManager<any> | undefined {
        if (!this.instance) {
            this.instance = new RequestManager();
        }
        return RequestManager.instance;
    }
    // 返回RequestService的实例
    getRequest(): RequestService<T> {
        return new RequestImpl<T>();
    }
}

const request = RequestManager.getInstance()!.getRequest();
export default request;