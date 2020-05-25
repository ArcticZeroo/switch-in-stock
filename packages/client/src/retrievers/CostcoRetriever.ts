import { IStockRetrieverResult } from '../models/IStockResult';
import StockType from '../models/StockType';
import StockRetriever from './StockRetriever';

export default class CostcoRetriever extends StockRetriever {
    private isPage404(document: Document) {
        return document.getElementById('not_found_body') != null;
    }

    public supportsStockType(stockType: StockType) {
        return stockType === StockType.online;
    }

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        if (this.isPage404(document)) {
            return { isOnline: false };
        }

        const outOfStockElements = document.getElementsByClassName('out-of-stock');

        const isOnline = outOfStockElements.length === 0;

        return { isOnline };
    }
}