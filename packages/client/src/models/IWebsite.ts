import StockRetriever, { IStockRetrieverParams } from '../retrievers/StockRetriever';

export default interface IWebsite {
    name: string;
    url: string;
    retriever: {
        create: (params?: IStockRetrieverParams) => StockRetriever,
        isClientside: boolean
    };
    isDisabled?: boolean;
};