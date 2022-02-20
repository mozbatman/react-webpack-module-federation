import React, {useState} from "react";
import "./App.css";
const Button = React.lazy(() => import("SHELL/Button"));

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const increaseGlobalCount = () => {
    const event = new CustomEvent("setGlobalCounter", { detail: inputValue });
    window.dispatchEvent(event);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="product2-app">
      <h2>Hi from Product2 App</h2>
      <input type="number" name="name" value={inputValue} onChange={handleChange} />
      <React.Suspense fallback="...loading">
        <Button title='Button' onClick={() => {increaseGlobalCount()}} />
      </React.Suspense>
    </div>
  );
};

export default App;
