import axios from 'axios';
import { JSDOM } from 'jsdom';
import { IStockRetrieverResult } from './IStockResult';

export interface IStockRetrieverParams {
    zipCode: string;
}

export default abstract class StockRetriever {
    protected static readonly DEFAULT_HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
        'dnt': 1,
        'referrer': 'https://google.com/?q=nintendo+switch+stock'
    };

    protected zipCode: string;

    constructor({ zipCode }: IStockRetrieverParams) {
        this.zipCode = zipCode;
    }

    protected abstract parseResult(document: Document): Promise<IStockRetrieverResult>;

    protected async retrieveAndParse({ url, parse, request = url => this.requestHtml(url) }: { url: string, request?: typeof StockRetriever.prototype.requestHtml, parse: typeof StockRetriever.prototype.parseResult }) {
        try {
            const html = await request(url);
            const dom = new JSDOM(html);
            return parse(dom.window.document);
        } catch (e) {
            throw e;
        }
    }

    protected requestHtml(url: string): Promise<string> {
        return axios.get(url, { headers: StockRetriever.DEFAULT_HEADERS }).then(r => r.data);
    }

    async isInStock(url: string): Promise<IStockRetrieverResult> {
        return this.retrieveAndParse({ url, parse: document => this.parseResult(document) });
    }
};