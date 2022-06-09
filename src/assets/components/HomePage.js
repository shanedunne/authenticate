import styled from "styled-components";
import { Colors } from "../Theme";
import SearchBar from "./styled/SearchBar.styled";

const HomePageEl=styled.div`
    background-color: ${Colors.Background};
    flex: 1;
    padding-bottom: 10vh;
    overflow: auto;
    overflow-x: hidden;
    min-height: min-content;
    padding-top: 1rem;
    scrollbar-width: 0;
    ::-webkit-scrollbar {
        display: none;
    }

`;
const Title=styled.h1`
    font-family: 'Kdam Thmor Pro', sans-serif;
    font-weight: normal;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    `;

export default function HomePage() {
    return (
        <HomePageEl>
            <Title>Authentic</Title>
            <SearchBar />
        </HomePageEl>
    )
}