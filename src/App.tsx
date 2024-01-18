import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import { Provider } from "react-redux";
import store from "./data/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
