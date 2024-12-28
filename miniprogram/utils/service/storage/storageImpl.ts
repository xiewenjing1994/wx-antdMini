import {StorageService} from "./storageService";

export class StorageImpl implements StorageService {


    // 设置本地存储
    set<T>(key: string, value: T): void {
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;
        wx.setStorageSync(key, valueStr);
    }

    // 获取本地存储
    get<T>(key: string): T | null {
        const value = wx.getStorageSync(key);
        return value ? (this.isJson(value) ? JSON.parse(value) : value) : null;
    }

    // 删除本地存储
    removeItem(key: string): void {
        wx.removeStorageSync(key);
    }

    // 清除所有本地存储
    clear(): void {
        wx.clearStorageSync();
    }

    // 判断是否是 JSON 字符串
    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

}