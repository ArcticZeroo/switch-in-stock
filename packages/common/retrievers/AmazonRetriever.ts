import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from '../models/StockRetriever';

export default class AmazonRetriever extends StockRetriever {
    private static readonly DESIRED_PRICE = '299.99';

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const priceElement = document.querySelector('.a-color-price');

        if (!(priceElement instanceof HTMLElement)) {
            throw new Error('Could not get price');
        }

        const priceText = priceElement.innerText.replace(/[^\d.]/g, '');
        const isAtDesiredPrice = priceText === AmazonRetriever.DESIRED_PRICE;

        return {
            isInStock: isAtDesiredPrice,
            extraData: {
                price: priceText
            }
        };
    }
}