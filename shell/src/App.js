import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Button from "./components/publicComponents/Button/Button";

const Product1App = React.lazy(() => import("PRODUCT1/App"));
const Product2App = React.lazy(() => import("PRODUCT2/App"));

function App() {
  return (
    <div className="shell-app">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<div>dsadasda <Button title='Button' /></div>} />
          <Route
            path="/product1"
            element={
              <React.Suspense fallback="...loading">
                <Product1App />
              </React.Suspense>
            }
          />
          <Route
            path="/product2"
            element={
              <React.Suspense fallback="...loading">
                <Product2App />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
