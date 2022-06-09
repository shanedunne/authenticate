import styled from "styled-components";
import {RiSearchLine} from "react-icons/ri";
import { Colors } from "../../Theme";


const SearchBarEl = styled.div``;
const Input = styled.input``;

export default function SearchBar() {
    return (
        <SearchBarEl>
            <Input placeholder="Search the marketplace"/>

        </SearchBarEl>
    )
}