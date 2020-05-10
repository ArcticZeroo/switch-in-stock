import * as React from 'react';
import styled from 'styled-components';
import usePromise from '../../hooks/usePromise';
import { IStockResult } from '../../models/IStockResult';
import IWebsite from '../../models/IWebsite';
import StockStatus from './StockStatus';

const WebsiteContainer = styled.div`
    border-radius: 0.125rem;
    padding: 0.5rem;
`;

const stockViewColors = {
    inStock: '#11DD33',
    outOfStockOrError: '#DD3311',
    loadingOrDisabled: '#666'
};

interface IWebsiteProps {
    config: IWebsite;
    stock: Promise<IStockResult>;
}

const StockView: React.FC<IWebsiteProps> = ({ config, stock }) => {
    const {value: promiseResult, error: promiseError} = usePromise(stock);

    let child;
    if (config.isDisabled) {
        child = (
            <StockStatus backgroundColor={stockViewColors.loadingOrDisabled}>
                Disabled
            </StockStatus>
        );
    } else if (promiseResult) {
        child = (
            <StockStatus backgroundColor={promiseResult.isInStock ? stockViewColors.inStock : stockViewColors.outOfStockOrError}>
                {promiseResult.isInStock ? 'In Stock' : 'Out of Stock'}
            </StockStatus>
        );
    } else if (promiseError) {
        child = (
            <StockStatus backgroundColor={stockViewColors.outOfStockOrError}>
                Error
            </StockStatus>
        );
    } else {
        child = (
            <StockStatus backgroundColor={stockViewColors.loadingOrDisabled}>
                Loading
            </StockStatus>
        );
    }

    const view = (
        <WebsiteContainer>
            {config.name}
            {child}
        </WebsiteContainer>
    );

    if (config.isDisabled) {
        return (
            <a href={config.url} target="_blank">
                {view}
            </a>
        );
    }

    return view;
};

export default StockView;