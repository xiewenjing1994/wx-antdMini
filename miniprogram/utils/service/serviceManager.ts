// 服务层管理类（单例模式）
import {RequestService} from "./request/requestService";
import {RequestImpl} from "./request/requestImpl";

export class ServiceManager {
    // 单例实例
    private static instance: ServiceManager;

    // 存储服务实例的 Map
    private services: Map<string, any>;

    private constructor() {
        this.services = new Map();
    }

    /**
     * 首次初始化的时候注册服务，在app.js中调用
     */
    public static initRegister() {
        ServiceManager.getIns().registerService(ServiceKey.REQUEST_SERVICE_KEY, new RequestImpl())

        // 后续不断添加注册各种服务。
    }

    /**
     * 获取 ServiceManager 单例实例
     * @returns ServiceManager 实例
     */
    public static getIns(): ServiceManager {
        if (!ServiceManager.instance) {
            ServiceManager.instance = new ServiceManager();
        }
        return ServiceManager.instance;
    }

    /**
     * 注册一个服务实例
     * @param key 服务标识符
     * @param instance 服务实例
     */
    private registerService(key: string, instance: RequestService): void {
        if (this.services.has(key)) {
            throw new Error(`服务 "${key}" 已经注册.`);
        }
        this.services.set(key, instance);
    }

    /**
     * 获取一个服务实例
     * @param key 服务标识符
     * @returns 服务实例
     */
    private getService(key: string): RequestService | null {
        return this.services.get(key) || null;
    }


    /**
     * 检查某个服务是否已注册
     * @param key 服务标识符
     * @returns 是否已注册
     */
    // @ts-ignore
    private hasService(key: string): boolean {
        return this.services.has(key);
    }

    /**
     * 移除一个服务实例
     * @param key 服务标识符
     */
    // @ts-ignore
    private removeService(key: string): void {
        if (!this.services.has(key)) {
            throw new Error(`服务 "${key}" 未注册.`);
        }
        this.services.delete(key);
    }

    /**
     * 获取网络服务实例
     * @returns RequestService 实例
     */
    public getRequestService(): RequestService | null {
        return this.getService(ServiceKey.REQUEST_SERVICE_KEY);
    }
}

// 服务标识符常量
export enum ServiceKey {
    REQUEST_SERVICE_KEY = "request"
    // 可以不断添加其他的服务标识字段
}
