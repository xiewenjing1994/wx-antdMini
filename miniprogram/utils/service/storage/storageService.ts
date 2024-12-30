import {IService} from "../service";

export interface StorageService extends IService {

    /**
     * 存储数据
     * @param key
     * @param value
     */
    set<T>(key: string, value: T): void

    /**
     * 获取数据
     * @param key
     */
    get<T>(key: string): T | null

    /**
     * 移除数据
     * @param key
     */
    removeItem(key: string): void

    /**
     * 清除数据
     */
    clear(): void
}