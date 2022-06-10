import styled from 'styled-components'
import bidImage from '../../assets/images/bidImage.png'
import bidImage2 from '../../assets/images/bidImage2.png'
import { Colors } from '../Theme';
import Img from './styled/Img.styled';

const BidItemeL = styled.span`
    display: flex;
    padding: 0.5rem;
    cursor: pointer;
    width: 100%;
    align-items: center;
    transition-property: background-color, border-radius;
    transition-duration: 0.5s;

    &:hover {
        background-color: ${Colors.GrayBoarder};
        border-radius: 12px;
    }
`;
const BidData = styled.span`

    margin-left: 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 0.5rem;
    justify-content: center;
    
`;
const BidTitle = styled.span`
    font-weight: 500;
    font-size: 1.2rem;

`;
const BidArtist = styled.span`
    color: ${Colors.Gray};
`;
const BidAmount = styled.span`
    font-weight: 500;
`;


export default function BidItem() {
    return (
        <BidItemeL>
            <Img width= "4rem" height= "4rem" borderRadius= "12px" src={bidImage} />
            <BidData>
                <BidTitle>Stompers</BidTitle>
                <BidArtist>Dr Martens</BidArtist>
                <BidAmount>1.3 ETH</BidAmount>
                
                
            </BidData>
        

        </BidItemeL>
    )
}