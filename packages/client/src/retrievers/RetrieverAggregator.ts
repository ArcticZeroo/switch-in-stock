import websites from '../config/websites';
import StockType from '../models/StockType';
import StockRetriever, { IStockRetrieverParams } from './StockRetriever';

export default class RetrieverAggregator {
    private readonly _retrievers: Map<String, StockRetriever> = new Map();

    constructor() {
        this.createRetrievers();
    }

    createRetrievers(params?: IStockRetrieverParams) {
        this._retrievers.clear();

        for (const key of Object.keys(websites)) {
            const website = websites[key];

            if (website.isDisabled) {
                continue;
            }

            this._retrievers.set(key, website.retriever.create(params));
        }
    }

    filterWebsitesByStockType(stockType: StockType) {
        const websites = [];
        for (const [key, retriever] of this._retrievers) {
            if (retriever.supportsStockType(stockType)) {
                websites.push(key);
            }
        }
        return websites;
    }
}