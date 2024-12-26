// 网络命令层，用于输出类型
export interface RequestService<T> {
    get: (url: string, params: Record<string, any>) => Promise<Request.ResponseData<T>>;
    post: (url: string, data: Record<string, any>) => Promise<Request.ResponseData<T>>;
    put: (url: string, data: Record<string, any>) => Promise<Request.ResponseData<T>>;
}
