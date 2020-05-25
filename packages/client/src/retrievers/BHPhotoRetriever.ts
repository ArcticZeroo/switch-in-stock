import { IStockRetrieverResult } from '../models/IStockResult';
import StockType from '../models/StockType';
import StockRetriever from './StockRetriever';

export default class BHPhotoRetriever extends StockRetriever {
    private static readonly DATA_KEY = 'data-selenium';
    private static readonly DATA_VALUE = 'stockStatus';
    private static readonly IN_STOCK_REGEX = /^\s*in\s+stock/i;

    public supportsStockType(stockType: StockType) {
        return stockType === StockType.online;
    }

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const stockStatus = document.querySelector(`[${BHPhotoRetriever.DATA_KEY}=${BHPhotoRetriever.DATA_VALUE}]`);

        if (!stockStatus || !(stockStatus instanceof HTMLElement)) {
            throw new Error('Stock status is not on the page');
        }

        const stockText = stockStatus.innerText.toLowerCase().trim();
        const isOnline = BHPhotoRetriever.IN_STOCK_REGEX.test(stockText);

        return { isOnline };
    }
}