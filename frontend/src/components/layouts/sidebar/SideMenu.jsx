import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setPath } from "../../../redux/slices/DashboardSlice";

const SidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    // background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  // background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  // color: #f5f5f5;
  font-size: 18px;

  &:hover {
    // background: #632ce4;
    cursor: pointer;
  }
`;

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
      {/* <SidebarLink
        to={!item.subMenu && item.link}
        onClick={item.subMenu && showSubnav}
      >
        <div>
          <item.icon size={25} className="icon" />
          <span className="link-title">{item.title}</span>
        </div>
        <div>
          {item.subMenu && subnav ? (
            <item.iconOpened />
          ) : item.subMenu ? (
            <item.iconClosed />
          ) : null}
        </div>
      </SidebarLink> */}
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
