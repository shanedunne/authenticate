import styled from "styled-components";
import { Colors } from "../../Theme";

const PageContainer = styled.div`
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

export default PageContainer;