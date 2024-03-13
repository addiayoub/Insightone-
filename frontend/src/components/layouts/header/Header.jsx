import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowDown2, ArrowUp2, Logout, ProfileCircle } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slices/AuthSlice";
import { toggleSidebar } from "../../../redux/slices/DashboardSlice";
import { notyf } from "../../../utils/notyf";
import resetStates from "../../../utils/resetStates";
import "./Header.css";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import ToggleTheme from "./ToggleTheme";

function Header() {
  const { isOpen } = useSelector((state) => state.dashboard);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    resetStates();
    notyf.success("Vous avez été déconnecté avec succès.");
  };
  return (
    <header className="header">
      <div
        className={`menu-icon  ${isOpen ? "opened" : "closed"} toggle-sidebar`}
      >
        <IconButton onClick={() => dispatch(toggleSidebar(!isOpen))}>
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </IconButton>
      </div>
      <div className="header-right">
        <ToggleTheme />
        {/* <IconButton
          sx={{ ml: 1 }}
          onClick={() => dispatch(toggleTheme())}
          color="inherit"
        >
          {theme.darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}
        <div
          className="profile"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          <div className="profile-icons">
            <ProfileCircle size="25" />
            <span className="user" id="user">
              {user.username}
            </span>
            <IconButton sx={{ padding: 0 }}>
              {isOpenDropdown ? (
                <ArrowUp2 size={23} />
              ) : (
                <ArrowDown2 size={23} />
              )}
            </IconButton>
          </div>
          <ul className={`profile-links ${isOpenDropdown ? "show" : ""}`}>
            <li>
              <Link to="/profile">
                <ProfileCircle size="25" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={handelLogout}>
                <Logout size="25" />
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
