import { IStockRetrieverResult } from '../models/IStockResult';
import StockType from '../models/StockType';
import StockRetriever from './StockRetriever';

// todo: physical stock
export default class BestBuyRetriever extends StockRetriever {
    public supportsStockType(stockType: StockType) {
        return stockType === StockType.online;
    }

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const addToCartButton = document.getElementsByClassName('add-to-cart-button')[0];

        if (!(addToCartButton instanceof HTMLElement)) {
            throw new Error('Could not get button');
        }

        const buttonText = addToCartButton.innerText;
        const isOnline = buttonText.toLowerCase().includes('sold out');
        return { isOnline };
    }
}