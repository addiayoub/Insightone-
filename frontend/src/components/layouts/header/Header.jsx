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
import ModalComponent from "../../Modal/index";
import Profile from "../../Profile.jsx";
import { hostName } from "../../../api/config.js";

function Header() {
  const { isOpen } = useSelector((state) => state.dashboard);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    resetStates();
    notyf.success("Vous avez été déconnecté avec succès.");
  };
  return (
    <>
      <header className="header">
        <div
          className={`menu-icon  ${
            isOpen ? "opened" : "closed"
          } toggle-sidebar`}
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
              {/* <ProfileCircle size="25" /> */}
              <div className="profile-icon w-[27px] h-[27px] rounded-[50%] overflow-hidden">
                <img
                  src={`${hostName}/images/${user.pic}`}
                  className="h-full w-full object-cover"
                />
              </div>
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
                <Link to={null} onClick={() => setOpenProfile(true)}>
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
      {openProfile && (
        <ModalComponent
          open={openProfile}
          handleClose={() => setOpenProfile(false)}
          withHeader
          headerText={`Profile`}
        >
          <Profile />
        </ModalComponent>
      )}
    </>
  );
}

export default Header;
