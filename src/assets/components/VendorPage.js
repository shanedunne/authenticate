import styled from 'styled-components'
import { Colors } from '../Theme';
import { RiSearchLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import Tabs from "./styled/Tabs.styled";
import Img from "./styled/Img.styled";
import { useNavigate } from "react-router-dom";
import ShopImage from '../../assets/images/shopImage2.png'
import VendorHeader from './VenderHeader';

const tabs = [
    {id: 1, title: 'Current', content: <Img src={ShopImage} />},
    {id: 2, title: 'Past', content: 'Past Collections'},
    {id: 3, title: 'About', content: 'About'}
]

const VendorPageEl = styled.div`
    background-color: ${Colors.Background};
    flex: 1;
    padding-bottom: 10vh;
    overflow: auto;
    overflow-x: hidden;
    min-height: min-content;
    padding-top: 1rem;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
    font-size: 1.5rem;

`;


export default function VendorPage(){
    const nav = useNavigate();
    return (
        <VendorPageEl>
            <TopMenu>
                <FiArrowLeft onClick={() => {
                    nav(-1);
                }}/>
                <span>
                    <RiSearchLine style={{marginRight: '1.5rem'}}/>
                    <BsThreeDots />
                </span>
            </TopMenu>
            <VendorHeader />
            <Tabs tabs={tabs} />
        </VendorPageEl>
    )
}