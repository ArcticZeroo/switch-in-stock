import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from './StockRetriever';

export default class BestBuyRetriever extends StockRetriever {
    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const addToCartButton = document.getElementsByClassName('add-to-cart-button')[0];

        if (!(addToCartButton instanceof HTMLElement)) {
            throw new Error('Could not get button');
        }

        const buttonText = addToCartButton.innerText;
        const isInStock = buttonText.toLowerCase().includes('sold out');
        return { isInStock };
    }
}