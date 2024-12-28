// 服务层管理类（单例模式）
import {RequestService} from "./request/requestService";
import {RequestImpl} from "./request/requestImpl";
import {StorageImpl} from "./storage/storageImpl";
import {StorageService} from "./storage/storageService";
import {IService} from "./service";

class ServiceManager {

    // 存储服务实例的 Map
    private services: Map<string, IService>;

    constructor() {
        this.services = new Map();
    }

    /**
     * 注册一个服务实例
     * @param instance 服务实例
     */
    private registerService(instance: IService): void {
        const key = instance.serviceKey
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
    private getService(key: string): IService | null {
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
    public getRequestService(): RequestService {
        if (!this.hasService(ServiceKey.REQUEST_SERVICE_KEY)) {
            this.registerService(new RequestImpl())
        }
        return this.getService(ServiceKey.REQUEST_SERVICE_KEY) as RequestService;
    }


    /**
     * 获取存储服务实例
     * @package StorageService 实例
     */
    getStorageService(): StorageService {
        if (!this.hasService(ServiceKey.STORAGE_SERVICE_KEY)) {
            this.registerService(new StorageImpl())
        }
        return this.getService(ServiceKey.STORAGE_SERVICE_KEY)! as StorageService;
    }

}

// 服务标识符常量
export enum ServiceKey {
    REQUEST_SERVICE_KEY = "request",

    STORAGE_SERVICE_KEY = "storage"
}

const server: ServiceManager = new ServiceManager()
export const request = server.getRequestService()
export const storage = server.getStorageService()

