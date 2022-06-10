import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Yezzy from '../../assets/images/image1.png'
import fender from '../../assets/images/image2.png';
import supreme from '../../assets/images/image3.png';
import rolex from '../../assets/images/image4.png';
import { Colors } from "../Theme";
import Img from "./styled/Img.styled";

const items = [
    {id:1, title:'Yeezy 350', artist:'Kanye West', image:Yezzy},
    {id:2, title:'Paisley Stratocaster', artist:'Fender', image:fender},
    {id:3, title:'Supreme x North Face', artist:'Supreme', image:supreme},
    {id:4, title:'Diamond', artist:'Rolex', image:rolex}
]

const FeaturedTabEl = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    height: 400px;


`;

const Item = styled.div`
    background-color: ${Colors.CardBackground};
    padding: 0.4rem;
    border-radius: 12px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
`;
const Title = styled.span`
    font-size: 1.5rem;
    margin-top: 0.5rem;

`;
const Artist = styled.span`
    color: ${Colors.Gray};
    font-size: 1rem;
`;
const ShowMore = styled.span`
    text-align: center;
    position: absolute;
    cursor: pointer;
    left: 0;
    bottom: 0;
    width: 100%;
    font-weight: 500;
    background-color: rgba(255,255,255,0.32);
    padding: 1rem;
    border: 1px solid ${Colors.GrayBoarder};
    backdrop-filter: blur(17px);
    border-radius: 12px;
`;
const BottomFade = styled.span`
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25%;
    background-image: linear-gradient(rgba(255,255,255,0), ${Colors.Background});
`;

export default function FeaturedTab(){
    const nav = useNavigate()
    return (
        <FeaturedTabEl>
            {items.map(item => {
                return <Item onClick={() => {
                    nav('/product')
                }}>
                    <Img src={item.image}/>
                    <Title> {item.title} </Title>
                    <Artist> {item.artist} </Artist>
                </Item>
            })}
            <BottomFade />
            <ShowMore>
                <BiChevronDown /> Show More
            </ShowMore>
        </FeaturedTabEl>
    )
}