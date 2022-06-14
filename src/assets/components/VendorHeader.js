import styled from "styled-components";
import {Colors} from "../Theme";
import storeImage from "./../images/shopImage1.png";
import Button from "./styled/Button.styled";
import Img from "./styled/Img.styled";


const VenderHeaderEl = styled.section`
    margin-top: 1rem;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
`;
const Name = styled.span`
    font-weight: 500;
    font-size: 1.5rem;
`;
const Category = styled.span`
    color: ${Colors.Gray};
`;
const InfoContainer = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    column-gap: 1rem;

`;
const ButtonContainer = styled.span`
    display: flex;
    column-gap: 1rem;
`;

export default function VendorHeader() {
    return (
        <VenderHeaderEl>
            <Img src={storeImage} width="30vw" />
            <InfoContainer>
                <Name>Supreme</Name>
                <Category>Collectable Clothing and Fashion</Category>
            </InfoContainer>
            <ButtonContainer>
                <Button>Follow</Button>
                <Button np>Contact</Button>
            </ButtonContainer>

        </VenderHeaderEl>
    )
}