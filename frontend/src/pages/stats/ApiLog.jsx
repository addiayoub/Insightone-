import React, { useState } from "react";
import ModalComponenet from "../../components/Modal";
const ApiLog = () => {
  const [open, setOpen] = useState(false);
  return (
    <ModalComponenet
      // open={false}
      handleClose={() => setOpen(false)}
      withHeader
      headerText="API Log"
    >
      <Box></Box>{" "}
    </ModalComponenet>
  );
};

export default ApiLog;
