import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from './StockRetriever';

export default class BHPhotoRetriever extends StockRetriever {
    private static readonly DATA_KEY = 'data-selenium';
    private static readonly DATA_VALUE = 'stockStatus';
    private static readonly IN_STOCK_REGEX = /^\s*in\s+stock/i;

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const stockStatus = document.querySelector(`[${BHPhotoRetriever.DATA_KEY}=${BHPhotoRetriever.DATA_VALUE}]`);

        if (!stockStatus || !(stockStatus instanceof HTMLElement)) {
            throw new Error('Stock status is not on the page');
        }

        const stockText = stockStatus.innerText.toLowerCase().trim();
        const isInStock = BHPhotoRetriever.IN_STOCK_REGEX.test(stockText);

        return { isInStock };
    }
}