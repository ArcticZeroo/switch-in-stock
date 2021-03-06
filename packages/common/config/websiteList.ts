import IWebsite from '../models/IWebsite';
import AdoramaRetriever from '../retrievers/AdoramaRetriever';
import AmazonRetriever from '../retrievers/AmazonRetriever';
import BestBuyRetriever from '../retrievers/BestBuyRetriever';
import BHPhotoRetriever from '../retrievers/BHPhotoRetriever';
import CostcoRetriever from '../retrievers/CostcoRetriever';
import TargetRetriever from '../retrievers/TargetRetriever';

const websiteList: IWebsite[] = [
    {
        name: 'Best Buy',
        url: 'https://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/6364253.p?skuId=6364253',
        retriever: {
            create: () => new BestBuyRetriever(),
            isClientside: false
        },
        isDisabled: false
    },
    {
        name: 'Amazon',
        url: 'https://www.amazon.com/dp/B07VJRZ62R',
        retriever: {
            create: () => new AmazonRetriever(),
            isClientside: false
        },
        isDisabled: false
    },
    {
        name: 'Target',
        url: 'https://www.target.com/p/nintendo-switch-with-gray-joy-con/-/A-77464002',
        retriever: {
            create: params => new TargetRetriever(params),
            isClientside: true
        },
        isDisabled: false
    },
    {
        name: 'GameStop',
        url: 'https://www.gamestop.com/video-games/switch/consoles/products/nintendo-switch-with-gray-joy-con/11095821.html',
        retriever: {
            create: params => new TargetRetriever(params),
            isClientside: true
        },
        isDisabled: false
    },
    {
        name: 'Costco',
        url: 'https://www.costco.com/nintendo-switch-bundle-with-12-month-online-family-plan-and-case.product.100519747.html',
        retriever: {
            create: () => new CostcoRetriever(),
            isClientside: false
        },
        isDisabled: false
    },
    {
        name: 'B&H Photo',
        url: 'https://www.bhphotovideo.com/c/product/1496115-REG/nintendo_hadskaaaa_switch_with_gray_controllers.html',
        retriever: {
            create: () => new BHPhotoRetriever(),
            isClientside: false
        },
        isDisabled: false
    },
    {
        name: 'Adorama',
        url: 'https://www.adorama.com/nihadskaaaa.html',
        retriever: {
            create: () => new AdoramaRetriever(),
            isClientside: false
        },
        isDisabled: false
    },
];

export default websiteList;