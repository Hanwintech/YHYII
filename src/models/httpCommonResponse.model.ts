export interface IHttpCommonResponse<T> {
    success: boolean;
    reason: string;
    data: any;
}