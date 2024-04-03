import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPath } from "../../../redux/slices/DashboardSlice";

const NestedMenu = ({ menuItem, isHovered }) => {
  console.log("render NestedMEnu");
  const [isShow, setIsShow] = useState(false);
  const showNestedNav = () => setIsShow(!isShow);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("isShow", isShow);
  }, [isShow]);
  console.log("NestedMenu item is", menuItem);
  const { nestedMenu, title, icon } = menuItem;
  return (
    <div className="nested-menu" onClick={nestedMenu && showNestedNav}>
      <div className="nested-menu-header flex font-semibold cursor-pointer  text-[15px] gap-x-[15px]">
        {icon && <menuItem.icon size={25} className="icon" />}
        <div className="flex items-center justify-between  w-full nested-menu-link-title">
          <span>{title}</span>
          <span>
            {nestedMenu && isShow ? (
              <menuItem.iconOpened />
            ) : nestedMenu ? (
              <menuItem.iconClosed />
            ) : null}
          </span>
        </div>
      </div>
      {isShow && isHovered && (
        <div className="nestedmenu-links">
          {nestedMenu.map((item, index) => {
            return (
              <Link
                className="nestedmenu-link"
                to={item.link}
                key={index}
                onClick={() => dispatch(setPath(item.link))}
              >
                {item.icon && <item.icon size={18} className="icon" />}
                <span className="nestedmenu-link-title">{item.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NestedList = ({ nestedMenu }) => {
  console.log("NESTED list is", nestedMenu);
  return (
    <div className="nestedmenu-links">
      {nestedMenu.map((item, index) => {
        return (
          <Link
            className={`nestedmenu-link ${
              "path" === item.link ? "active" : ""
            }`}
            to={item.link}
            key={`${item.link}-${index}`}
            // onClick={() => {
            //   dispatch(setPath(item.link));
            // }}
          >
            {item.icon && <item.icon size={18} className="icon" />}
            <span className="nestedmenu-link-title">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

const SideMenu = ({ item, isHovered }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const [isShow, setIsShow] = useState(false);
  const showNestedNav = () => setIsShow(!isShow);
  const dispatch = useDispatch();
  const { isOpen, path } = useSelector((state) => state.dashboard);
  console.log("render SideMenu", isShow, subnav);
  return (
    <>
      {/* Submenu parent */}
      <Link
        to={!item.subMenu && item.link}
        className="nav-link"
        onClick={item.subMenu && showSubnav}
      >
        {item.icon && <item.icon size={30} className="icon" />}
        <div className="link-title">
          <span className="text-sm">{item.title}</span>

          <span>
            {item.subMenu && subnav ? (
              <item.iconOpened />
            ) : item.subMenu ? (
              <item.iconClosed />
            ) : null}
          </span>
        </div>
      </Link>
      {/* Submenu list */}
      {subnav && isHovered && (
        <div className="submenu-links">
          {item.subMenu.map((item, index) => {
            const { icon, link, nestedMenu, title } = item;
            return nestedMenu ? (
              // <NestedMenu menuItem={item} key={index} {...{ isHovered }} />
              <div className="nested-menu" key={`${title}-${index}`}>
                {/* Nested menu parent */}
                <div
                  className="nested-menu-header flex font-semibold cursor-pointer text-[15px] gap-x-[15px]"
                  onClick={nestedMenu && showNestedNav}
                >
                  {icon && <item.icon size={25} className="icon" />}
                  <div className="flex items-center justify-between  w-full nested-menu-link-title">
                    {/* <span>Parent</span> */}
                    <span>{title}</span>
                    <span>
                      {nestedMenu && isShow ? (
                        <item.iconOpened />
                      ) : nestedMenu ? (
                        <item.iconClosed />
                      ) : null}
                    </span>
                  </div>
                </div>
                {/* Nested menu List */}
                {isShow && isHovered && <NestedList nestedMenu={nestedMenu} />}
              </div>
            ) : (
              <Link
                to={link}
                key={index}
                className={`submenu-link ${link} ${
                  path === link ? "active" : ""
                }`}
                onClick={() => dispatch(setPath(link))}
              >
                {icon && <item.icon size={22} className="icon" />}
                <span className="submenu-link-title">{title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(SideMenu);
