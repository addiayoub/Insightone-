import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/actions/UserActions";
import { resetUpdateState } from "../../../redux/slices/UserSlice";
import { notyf } from "../../../utils/notyf";
import ModalComponent from "../../../components/Modal";
import Button from "../../../components/Ui/Buttons";
import { Edit } from "react-feather";
import Form from "./Form";

const modalStyle = {
  width: "100%",
  maxWidth: "400px",
};

export default function Update({ open, setModalOff, userData }) {
  const { error, loading } = useSelector((state) => state.user.updateState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const dispatch = useDispatch();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData?.username);
      setIsAdmin(userData?.isAdmin ?? false);
    }
  }, [userData]);

  const handelSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id: userData._id,
        user: {
          username,
          password,
          passwordConfirmation,
          isAdmin,
        },
      })
    )
      .unwrap()
      .then((successValue) => {
        notyf.success(successValue.message);
        handleClose();
        dispatch(resetUpdateState());
      })
      .catch((rejectedValue) => {
        if (rejectedValue?.failed) {
          notyf.error(rejectedValue.message);
        }
        console.log("update rejectedValue:", rejectedValue);
      });
  };

  const handleClose = () => {
    resetForm();
    setModalOff();
    dispatch(resetUpdateState());
  };

  return (
    <ModalComponent
      {...{ open, handleClose }}
      style={modalStyle}
      withHeader
      headerText="Modifier un utilisateur"
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
            text={loading ? "Veuillez patienter..." : "Modifier"}
            onClick={handelSubmit}
            disabled={loading || !username}
            icon={!loading ? <Edit size={18} /> : null}
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
    checked={!isAdmin}
  />
  <FormControlLabel
    value="true"
    control={<Radio />}
    label="Admin"
    onChange={handleRadioChange}
    checked={isAdmin}
  />
</RadioGroup>; */
}
