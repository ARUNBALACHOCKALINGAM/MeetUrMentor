import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./data/store/store"; // Import your Redux store
import Router from "./pages/router";
import {Alert} from "./components/ui/Alert"; // Import your Modal component
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "./data/store/user"; // Import the closeModal action

const App = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalMessage ,userType} = useSelector((state:any) => state.user);

  // Auto-close the modal after 3 seconds
  React.useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        dispatch(closeModal());
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isModalOpen, dispatch]);

  return (
    <BrowserRouter>
      <Router />
      {isModalOpen && <Alert message={modalMessage} onClose={() => dispatch(closeModal())} userType={userType} />}
    </BrowserRouter>
  );
};

// Wrap the App component with Provider
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;