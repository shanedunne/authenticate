import styled from "styled-components";
import { Colors } from "./assets/Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavMenu from "./assets/components/NavMenu";
import HomePage from "./assets/components/HomePage";
import VendorPage from "./assets/components/VendorPage";
import Product from "./assets/components/Product";

const AppEl = styled.div`
  display: flex;
  flex-direction: column;
  positioin: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  overfolow: hidden;
  height: 100vh;
`;

const Pages=styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

function App() {
  return (
    <Router>
      <AppEl>
        <Pages>
          <Routes>
            <Route excat path="/vendor" element={<VendorPage />}/>
            <Route excat path="/product" element={<Product />}/>
            <Route excat path="/" element={<HomePage />}/>
          </Routes>
        </Pages>
        <NavMenu />
      </AppEl>
    </Router>
  );
}

export default App;