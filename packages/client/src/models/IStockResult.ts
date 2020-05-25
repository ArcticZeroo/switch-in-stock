// To be returned from retrievers
export interface IStockRetrieverResult<T = any> {
    isOnline?: boolean;
    isPhysical?: boolean;
    extraData?: T;
}

export interface IPhysicalStockRetrieverResult<T = any> extends IStockRetrieverResult<T> {
    isPhysical: boolean;
}

export interface IOnlineStockRetrieverResult<T = any> extends IStockRetrieverResult<T> {
    isOnline: boolean;
}

// To be used on the website
export interface IStockResult<T = any> extends IStockRetrieverResult<T> {
    isError: boolean;
    errorText?: string;
}

export interface IStockSuccessResult<T = any> extends IStockResult<T> {
    isError: false;
}

export interface IStockSuccessOnlineResult<T = any> extends IStockSuccessResult<T> {
    isOnline: boolean;
}

export interface IStockSuccessPhysicalResult<T = any> extends IStockSuccessResult<T> {
    isPhysical: boolean;
}

export interface IStockFailureResult extends IStockResult<undefined> {
    isError: true,
    errorText: string
}
