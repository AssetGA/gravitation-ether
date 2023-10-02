import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
// import { CrowdfundingStateContextProvider } from "./context/Crowdfunding";
import { StateContextProvider } from "./context/StateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Provider>
  </Router>
);
