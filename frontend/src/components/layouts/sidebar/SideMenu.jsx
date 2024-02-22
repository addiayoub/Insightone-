import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPath } from "../../../redux/slices/DashboardSlice";

const SideMenu = ({ item, isHovered }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const dispatch = useDispatch();
  const { isOpen, path } = useSelector((state) => state.dashboard);
  return (
    <>
      <Link
        to={!item.subMenu && item.link}
        className="nav-link"
        onClick={item.subMenu && showSubnav}
      >
        {item.icon && <item.icon size={30} className="icon" />}
        <div className="link-title">
          <span>{item.title}</span>
          <span>
            {item.subMenu && subnav ? (
              <item.iconOpened />
            ) : item.subMenu ? (
              <item.iconClosed />
            ) : null}
          </span>
        </div>
      </Link>
      {subnav && isHovered && (
        <div className="submenu-links">
          {item.subMenu.map((item, index) => {
            return (
              <Link
                to={item.link}
                key={index}
                className={`submenu-link ${item.link} ${
                  path === item.link ? "active" : ""
                }`}
                onClick={() => dispatch(setPath(item.link))}
              >
                {item.icon && <item.icon size={22} className="icon" />}
                <span className="submenu-link-title">{item.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SideMenu;
