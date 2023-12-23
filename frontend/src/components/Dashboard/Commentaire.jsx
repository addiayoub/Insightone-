import { IconButton } from "@mui/material";
import { RefreshCcw } from "react-feather";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/actions/StockActions";
import COMMENTAIRE from "../../data/COMMENTAIRE_MARCHE_PARAM1.json";
import MainLoader from "../loaders/MainLoader";
import { notyf } from "../../utils/notyf";

function Commentaire({ date }) {
  const [comments, setComments] = useState(COMMENTAIRE);
  const {
    comments: { loading },
  } = useSelector((state) => state.stock);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getComments({ date }))
      .unwrap()
      .then((success) => setComments(success))
      .catch((error) => notyf.error(error));
  };
  return (
    <>
      {loading && <MainLoader />}
      <div className="flex items-center gap-3">
        <h3>Commentaire du marché</h3>
        <IconButton title="Actualiser les commentaires" onClick={handleClick}>
          <RefreshCcw color="var(--primary-color)" />
        </IconButton>
      </div>
      <div
        className={`w-full leading-6 min-h-[345px] max-h-[345px] overflow-auto border border-solid border-[var(--primary-color)] p-4 rounded-lg my-2.5 `}
      >
        {comments.map((item, index) => (
          <React.Fragment key={item.num_comment}>
            {index > 0 && (
              <>
                <br />
                <br />
              </>
            )}{" "}
            {item.commentaire}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Commentaire;
