import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from './StockRetriever';

export default class CostcoRetriever extends StockRetriever {
    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const outOfStockElements = document.getElementsByClassName('out-of-stock');

        const isInStock = outOfStockElements.length === 0;

        return { isInStock };
    }
}