import StockRetriever, { IStockRetrieverParams } from './StockRetriever';

export default interface IWebsite {
    name: string;
    url: string;
    retriever: (params: IStockRetrieverParams) => StockRetriever;
};