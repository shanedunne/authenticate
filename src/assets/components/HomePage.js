import styled from "styled-components";
import { Colors } from "../Theme";
import BidList from "./BidList";
import FeaturedTab from "./FeaturedTab";
import SearchBar from "./styled/SearchBar.styled";
import Tabs from "./styled/Tabs.styled";
import PageContainer from "./styled/PageContainer.styled";

const tabs = [
    {id: 1, title:'Featured', content:<FeaturedTab />},
    {id: 2, title:'Collections', content:<div>Tab 2</div>},
    {id: 3, title:'Artist', content:<div>Tab 3</div>},
    {id: 4, title:'Tag', content:<div>Tab 4</div>}
]


const Title=styled.h1`
    font-family: 'Kdam Thmor Pro', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    `;

export default function HomePage() {
    return (
        <PageContainer>
            <Title>Authentic</Title>
            <SearchBar />
            <Tabs tabs={tabs}/>
            <BidList />
        </PageContainer>
    )
}