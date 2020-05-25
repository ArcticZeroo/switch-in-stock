import { IStockRetrieverResult } from '../models/IStockResult';
import StockType from '../models/StockType';
import StockRetriever from './StockRetriever';

export default class AdoramaRetriever extends StockRetriever {
    private static readonly PRODUCT_INFO_JSON_REGEX = /\s*adrma\.productData\s*=\s*({.+})/;

    public supportsStockType(stockType: StockType) {
        return stockType === StockType.online;
    }

    protected async parseResult(document: Document, html: string): Promise<IStockRetrieverResult> {
        const stockInElements = document.getElementsByClassName('stock-in');
        const isOnline = stockInElements.length > 0;
        return { isOnline };
    }
}