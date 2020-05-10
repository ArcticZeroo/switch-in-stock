import styled from 'styled-components';

interface IStockStatusProps {
    backgroundColor: string;
}

const StockStatus = styled.div<IStockStatusProps>`
    border-radius: 0.125rem;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    text-align: center;
    background: ${props => props.backgroundColor};
`;

export default StockStatus;