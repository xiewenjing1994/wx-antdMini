export interface RequestService {
    /**
     * get请求
     * @param url     // 记得写注释
     * @param params
     * @return
     */
    get<T>(url: string, params: Record<string, any>): Promise<Request.ResponseData<T>>;

    /**
     * post请求
     * @param url      // 记得写注释
     * @param data
     * @return
     */
    post<T>(url: string, data: Record<string, any>): Promise<Request.ResponseData<T>>;

    /**
     * put请求
     * @param url      // 记得写注释
     * @param data
     * @return
     */
    put<T>(url: string, data: Record<string, any>): Promise<Request.ResponseData<T>>;
}
