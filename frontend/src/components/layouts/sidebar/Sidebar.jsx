import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPath, toggleSidebar } from "../../../redux/slices/DashboardSlice";
import "./Sidebar.css";
import { sidebarData } from "./sidebarData";
import Logo from "../../../assets/images/Logo.png";
import MiniLogo from "../../../assets/images/mini-logo.png";
import SideMenu from "./SideMenu";

function Sidebar() {
  const { isOpen, path } = useSelector((state) => state.dashboard);
  const [isHovered, setIsHovered] = useState(true);
  const { role } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const shouldHideSidebar = windowWidth < 992;
  useEffect(() => {
    if (shouldHideSidebar) {
      dispatch(toggleSidebar(false));
    } else {
      dispatch(toggleSidebar(true));
    }
  }, [shouldHideSidebar]);
  return (
    <aside
      className={`side-menu ${isHovered ? "opened" : "closed"} ${
        !isOpen ? "hide" : ""
      }`}
      id="sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-header">
        <img src={Logo} alt="ida-tech-logo-1" className="logo" />
        <img src={MiniLogo} alt="ida-tech-logo-2" className="mini-logo" />
      </div>
      <div className="sidebar-body">
        <ul className="side-menu">
          {sidebarData.map((item, index) => {
            const isAllowed =
              (!item.isPrivate && role !== 305) ||
              (item.isPrivate && role === 305);
            return isAllowed ? (
              <li
                key={index}
                className={`side-menu-item ${
                  item.link !== null && path === item.link ? "active" : ""
                }`}
                onClick={() => {
                  if (item.link !== null) {
                    dispatch(setPath(item.link));
                  }
                }}
              >
                <SideMenu item={item} key={index} isHovered={isHovered} />
              </li>
            ) : null;
            // const isAllowed = !item.isPrivate || (item.isPrivate && role === 305);
            // return isAllowed ? (
            //   <li
            //     key={index}
            //     className={`side-menu-item ${
            //       path === item.link ? "active" : ""
            //     }`}
            //     onClick={() => dispatch(setPath(item.link))}
            //   >
            //     <Link to={item.link} className="nav-link">
            //       {item.icon && <item.icon size={25} className="icon" />}{" "}
            //       <span className="link-title">{item.title}</span>
            //     </Link>
            //   </li>
            // ) : null;
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
