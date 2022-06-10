import styled from 'styled-components'
import bidImage from '../../assets/images/bidImage.png'
import bidImage2 from '../../assets/images/bidImage2.png'
import { Colors } from '../Theme';
import BidItem from './BidItem';
import Img from './styled/Img.styled';

const BidListEl = styled.div`
    padding: 0 1rem;
    margin-top: 1rem;
`;
const Title = styled.h3`
    font-weight: 500;
    margin-bottom: 1rem;
`;
const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;


export default function BidList() {
    return (
        <BidListEl>

            <Title>My Bids</Title>
            <ItemList>
                <BidItem />
                <BidItem />
            </ItemList>

        </BidListEl>
    )
}