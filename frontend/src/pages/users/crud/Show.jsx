import React, { memo, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { LogIn, User, Key } from "react-feather";
import { Wallet } from "iconsax-react";
import ModalComponent from "../../../components/Modal/index";
import { hostName } from "../../../api/config";
import moment from "moment";
import { momentFr } from "../../../utils/momentFr";

moment.updateLocale("fr", momentFr);

const Show = ({ data, setModalOff }) => {
  const { state, payload } = data;
  const lastLogin = useMemo(() => {
    return payload.loginHistory[payload.loginHistory.length - 1]
      ? moment(payload.loginHistory[payload.loginHistory.length - 1]).fromNow()
      : "-";
  }, [payload]);
  console.log("Show data", data);
  return (
    <ModalComponent
      open={state}
      withHeader
      headerText={payload.username}
      handleClose={setModalOff}
      containerClassName="max-w-[550px] w-full"
    >
      <Box className="mx-auto w-full py-[10px] flex flex-wrap items-center justify-between gap-y-[20px] phone:justify-center phone:flex-col">
        <Box className="">
          <img
            src={`${hostName}/images/${payload.pic}`}
            onError={(ev) => {
              ev.currentTarget.onerror = null;
              ev.target.src = `${hostName}/images/default-profile.jpg`;
            }}
            alt="profile-pic"
            className="select-none m-auto max-w-[150px] max-h-[150px] w-[150px] h-[150px] rounded-full"
          />
        </Box>
        <Box>
          <Box className="flex gap-4 items-center mb-1">
            <User size={22} color="var(--primary-color)" />
            <Typography className="select-none font-semibold">
              {payload.isAdmin ? "Admin" : "User"}
            </Typography>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <LogIn size={22} color="var(--primary-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">
                Dernière connexion:
              </Typography>
              <Typography className="font-semibold">{lastLogin}</Typography>
            </Box>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <Key size={22} color="var(--primary-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">
                Nombre de connexions:
              </Typography>
              <Typography className="font-semibold">
                {payload.loginHistory.length}
              </Typography>
            </Box>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <Wallet size={22} color="var(--primary-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">Portefeuilles:</Typography>
              <Typography className="font-semibold">
                {payload.portefeuilles.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default memo(Show);
