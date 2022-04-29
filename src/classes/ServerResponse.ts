export interface ServerError {
    errorCode: number;
    errorMessage: string;
}
export interface ServerResponse {
    invoiceId: string;
    country: string;
    amount: number;
    currency: string;
    localAmount: number;
    localCurrency: string;
    createdDate: string;
    status: string;
}