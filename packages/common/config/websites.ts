import IWebsite from '../models/IWebsite';
import AmazonRetriever from '../retrievers/AmazonRetriever';
import BestBuyRetriever from '../retrievers/BestBuyRetriever';
import TargetRetriever from '../retrievers/TargetRetriever';

const websites: IWebsite[] = [
    {
        name: 'Best Buy',
        url: 'https://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/6364253.p?skuId=6364253',
        retriever: () => new BestBuyRetriever()
    },
    {
        name: 'Amazon',
        url: 'https://www.amazon.com/dp/B07VJRZ62R?ref=emc_p_m_5_i',
        retriever: () => new AmazonRetriever()
    },
    {
        name: 'Target',
        url: 'https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-77464002',
        retriever: () => new TargetRetriever()
    },
    {
        name: 'GameStop',
        url: 'https://www.gamestop.com/video-games/switch/consoles/products/nintendo-switch-with-gray-joy-con/11095821.html',
        retriever: () => null
    },
    {
        name: 'Costco',
        url: 'https://www.costco.com/nintendo-switch-bundle-with-12-month-online-family-plan-and-case.product.100519747.html',
        retriever: () => null
    },
    {
        name: 'B&H Photo',
        url: 'https://www.bhphotovideo.com/c/product/1496115-REG/nintendo_hadskaaaa_switch_with_gray_controllers.html',
        retriever: () => null
    },
    {
        name: 'Adorama',
        url: 'https://www.adorama.com/nihadskaaaa.html',
        retriever: () => null
    },
];

export default websites;