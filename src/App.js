import styled from "styled-components";
import { Colors } from "./assets/Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavMenu from "./assets/components/NavMenu";

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
            <Route excat path="/store" element={<div>Store</div>}/>
            <Route excat path="/product" element={<div>Product</div>}/>
            <Route excat path="/" element={<div>Home</div>}/>
          </Routes>
        </Pages>
        <NavMenu />
      </AppEl>
    </Router>
  );
}

export default App;