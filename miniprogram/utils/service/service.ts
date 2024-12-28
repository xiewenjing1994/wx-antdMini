import {RequestService} from "./request/requestService";

export interface IService {
    /**
     * 获取网络服务
     */
    getRequestService(): RequestService
}