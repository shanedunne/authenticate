import styled from 'styled-components'
import { Colors } from '../Theme';
import { RiSearchLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import Tabs from "./styled/Tabs.styled";
import Img from "./styled/Img.styled";
import { useNavigate } from "react-router-dom";
import ShopImage from '../../assets/images/shopImage2.png'
import VendorHeader from './VendorHeader';
import PageContainer from "./styled/PageContainer.styled";

const tabs = [
    {id: 1, title: 'Current', content: <Img src={ShopImage} width="100%" />},
    {id: 2, title: 'Past', content: 'Past Collections'},
    {id: 3, title: 'About', content: 'About'}
]


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
        <PageContainer>
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
        </PageContainer>
    )
}