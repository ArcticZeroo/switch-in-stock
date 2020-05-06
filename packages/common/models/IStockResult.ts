// To be returned from retrievers
export interface IStockRetrieverResult {
    isInStock?: boolean;
    extraData?: any;
}

// To be used on the website
export interface IStockResult extends IStockRetrieverResult {
    isError: boolean;
}


export interface IStockSuccessResult extends IStockResult {
    isError: false,
    isInStock: boolean,
}

export interface IStockFailureResult extends IStockResult {
    isError: true,
    errorText: string
}
