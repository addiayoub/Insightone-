import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPath } from "../../../redux/slices/DashboardSlice";

const SubMenu = ({ item, subnav, showSubnav }) => {
  return (
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
  );
};

const SubMenuList = ({ item, isHovered, nestedId, handleNestedNav, path }) => {
  return (
    <div className="submenu-links">
      {item.subMenu.map((item, index) => {
        const { icon, nestedMenu, title } = item;
        return nestedMenu ? (
          <div className="nested-menu" key={`${title}-${index}`}>
            {/* Nested menu parent */}
            <div
              className="nested-menu-header flex font-semibold cursor-pointer text-[15px] gap-x-[15px]"
              onClick={nestedMenu ? () => handleNestedNav(index) : null}
            >
              {icon && <item.icon size={25} className="icon" />}
              <div className="flex items-center justify-between  w-full nested-menu-link-title">
                <span>{title}</span>
                <span>
                  {nestedMenu && index === nestedId ? (
                    <item.iconOpened />
                  ) : nestedMenu ? (
                    <item.iconClosed />
                  ) : null}
                </span>
              </div>
            </div>
            {/* Nested menu List */}
            {index === nestedId && isHovered && (
              <NestedList {...{ path, nestedMenu }} />
            )}
          </div>
        ) : (
          <SubMenuLink {...{ item, path }} />
        );
      })}
    </div>
  );
};

const SubMenuLink = ({ item, path }) => {
  const { link, icon, title } = item;
  const dispatch = useDispatch();
  return (
    <Link
      to={link}
      className={`submenu-link ${link} ${path === link ? "active" : ""}`}
      onClick={() => dispatch(setPath(link))}
    >
      {icon && <item.icon size={22} className="icon" />}
      <span className="submenu-link-title">{title}</span>
    </Link>
  );
};

const NestedList = ({ nestedMenu, path }) => {
  const dispatch = useDispatch();
  console.log("NESTED list is", nestedMenu);
  return (
    <div className="nestedmenu-links">
      {nestedMenu.map((item, index) => {
        return (
          <Link
            className={`nestedmenu-link ${path === item.link ? "active" : ""}`}
            to={item.link}
            key={`${item.link}-${index}`}
            onClick={() => {
              dispatch(setPath(item.link));
            }}
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
  const [nestedId, setNestedId] = useState(null);
  const handleNestedNav = (id) => {
    setNestedId(id === nestedId ? null : id);
  };
  const { path } = useSelector((state) => state.dashboard);
  return (
    <>
      {/* Submenu parent */}
      <SubMenu {...{ item, showSubnav, subnav, path }} />
      {/* Submenu list */}
      {subnav && isHovered && (
        <SubMenuList
          {...{ item, isHovered, nestedId, handleNestedNav, path }}
        />
      )}
    </>
  );
};

export default memo(SideMenu);
