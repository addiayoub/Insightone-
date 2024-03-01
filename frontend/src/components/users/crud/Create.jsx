import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";
import { resetStoreState } from "../../../redux/slices/UserSlice";
import ModalComponent from "../../Modal";
import Form from "./Form";
import Button from "../../Ui/Buttons";
import { UserPlus } from "react-feather";

const modalStyle = {
  width: "100%",
  maxWidth: "400px",
};

export default function Create({ open, setModalOff }) {
  const { error, loading } = useSelector((state) => state.user.storeState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const handelSubmit = (event) => {
    event.preventDefault();
    dispatch(
      storeUser({
        username,
        password,
        passwordConfirmation,
        isAdmin,
      })
    )
      .unwrap()
      .then((successValue) => {
        notyf.success(successValue.message);
        handleClose();
        dispatch(resetStoreState());
      })
      .catch((rejectedValue) => {
        if (rejectedValue?.failed) {
          notyf.error(rejectedValue.message);
        }
        console.log("create rejectedValue:", rejectedValue);
      });
  };

  const handleClose = () => {
    setModalOff();
    dispatch(resetStoreState());
  };

  return (
    <ModalComponent
      {...{ open, handleClose }}
      style={modalStyle}
      withHeader
      headerText="Ajouter un utilisateur"
    >
      <Form
        {...{
          handelSubmit,
          username,
          setUsername,
          password,
          setPassword,
          passwordConfirmation,
          setPasswordConfirmation,
          isAdmin,
          setIsAdmin,
          error,
          loading,
        }}
        submitBtn={
          <Button
            text={loading ? "Veuillez patienter..." : "Ajouter"}
            onClick={handelSubmit}
            disabled={loading || !username}
            icon={!loading ? <UserPlus size={18} /> : null}
          />
        }
      />
    </ModalComponent>
  );
}
{
  /* <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="false"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="User"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Admin"
                  onChange={handleRadioChange}
                />
              </RadioGroup> */
}
