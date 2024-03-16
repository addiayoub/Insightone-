import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";
import DeleteModal from "../../../components/DeleteModal";
import ModalComponent from "../../../components/Modal";

export default function Delete({ open, setModalOff, id }) {
  const dispatch = useDispatch();
  const handelDelete = async (id) => {
    try {
      dispatch(deleteUser(id))
        .unwrap()
        .then((successValue) => {
          console.log("del successValue", successValue);
          notyf.success(successValue.message);
        })
        .catch((rejectedValue) => {
          if (rejectedValue?.failed) {
            notyf.error(rejectedValue.message);
            return;
          }
          // notyf.error(rejectedValue);
          console.log("delete rejectedWithValue:", rejectedValue);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmation = (confirmation) => {
    if (confirmation) {
      handelDelete(id);
    }
    setModalOff();
  };
  return (
    <ModalComponent open={open} handleClose={() => setModalOff()}>
      <DeleteModal
        bodyText="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        handleDeleteConfirmation={handleConfirmation}
      />
    </ModalComponent>
  );
}
