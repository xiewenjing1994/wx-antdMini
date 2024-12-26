declare namespace Request {
    interface ResponseData<T = any> {
        success: boolean;
        data: T;
        message?: string;
    }
}