import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [logoCounter, setLogoCounter] = useState(0);

  useEffect(() => {
    window.addEventListener("setGlobalCounter", (event) => {
      setLogoCounter(event.detail);
    });
    
    return () => {
      window.removeEventListener("setGlobalCounter");
    };
  }, []);

  return (
    <div className="header">
      <Link to="/">LOGO {logoCounter}</Link>
      <div className="products">
        <Link to="/product1">Product 1</Link>
        <Link to="/product2">Product 2</Link>
      </div>
    </div>
  );
};

export default Header;
