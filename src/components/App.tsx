import { BrowserRouter, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </BrowserRouter>
  );
}

export default App;
