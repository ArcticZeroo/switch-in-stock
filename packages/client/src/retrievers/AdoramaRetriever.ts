import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from './StockRetriever';

export default class AdoramaRetriever extends StockRetriever {
    private static readonly PRODUCT_INFO_JSON_REGEX = /\s*adrma\.productData\s*=\s*({.+})/;

    protected async parseResult(document: Document, html: string): Promise<IStockRetrieverResult> {
        const stockInElements = document.getElementsByClassName('stock-in');
        const isInStock = stockInElements.length > 0;
        return {isInStock};
    }
}