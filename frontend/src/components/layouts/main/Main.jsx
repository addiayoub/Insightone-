import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Main.css";
import ScrollToTop from "../../Ui/ScrollToTop";
export default function Main() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    setShowScrollButton(scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Sidebar />
      <div id="content">
        <Header />
        <main className="main-container">
          {showScrollButton && <ScrollToTop />}
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}
