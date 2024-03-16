import { Box, Divider, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/UserActions";
import { updateCurrentUser } from "../redux/slices/AuthSlice";
import { setPath } from "../redux/slices/DashboardSlice";
import { resetUpdateProfileState } from "../redux/slices/UserSlice";
import { notyf } from "../utils/notyf";
import EndAdorment from "./Ui/EndAdorment";
import { FileUploader } from "react-drag-drop-files";
import { hostName } from "../api/config";

const fileTypes = ["png", "jpeg", "jpg", "webp"];

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector(
    (state) => state.user.updateProfileState
  );
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfir, setVisiblePasswordConfir] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(`${hostName}/images/${user.pic}`);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("file", file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);
  useEffect(() => {
    dispatch(setPath("."));
    dispatch(resetUpdateProfileState());
  }, [dispatch]);
  const handelSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
      passwordConfirmation,
      pic: file,
    };
    dispatch(updateProfile({ user }))
      .unwrap()
      .then((successValue) => {
        notyf.success(successValue.message);
        console.log("update success", successValue);
        dispatch(updateCurrentUser(successValue.newUser));
      })
      .catch((rejectedValue) => {
        if (rejectedValue?.failed) {
          notyf.error(rejectedValue.message);
        }
        console.log("update rejectedValue:", rejectedValue);
      });
  };

  return (
    <Box className="overflow-y-auto">
      <Box
        component="form"
        onSubmit={handelSubmit}
        className="flex flex-col flex-wrap gap-[12px] mt-4"
      >
        <TextField
          label="Nom d'utilisateur"
          id="username-field"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          {...((error?.usernamePassword || error?.username) && {
            error: true,
            helperText: error.usernamePassword || error?.username,
          })}
        />
        <TextField
          id="password-field"
          type={visiblePassword ? "text" : "password"}
          label="Mot de pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <EndAdorment
                visible={visiblePassword}
                setVisible={setVisiblePassword}
              />
            ),
          }}
          {...((error?.usernamePassword || error?.password) && {
            error: true,
          })}
        />
        <TextField
          id="password-confirmation-field"
          type={visiblePasswordConfir ? "text" : "password"}
          label="Confirmation de mot de pass"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <EndAdorment
                visible={visiblePasswordConfir}
                setVisible={setVisiblePasswordConfir}
              />
            ),
          }}
          {...((error?.usernamePassword || error?.password) && {
            error: true,
            helperText: error?.password || null,
          })}
        />
        <Box className="flex w-full gap-[10px] tablet:flex-col phone:flex-col">
          <FileUploader
            handleChange={(f) => setFile(f)}
            name="file"
            types={fileTypes}
            label="Importer"
            fileOrFiles={file}
            dropMessageStyle={{ backgroundColor: "blue" }}
            onTypeError={(error) => {
              console.log("error", error);
              notyf.options.duration = 3500;
              notyf.error(
                "Type de fichier non valide. Veuillez sélectionner un fichier PNG, JPEG ou JPG."
              );
            }}
          />
          {
            <Box className="flex flex-col flex-[0.5] gap-[15px] border-[1.5px] border-dashed border-muted p-4 max-h-[310px] divide-y divide-slate-200">
              <Box className="mb-2">
                <Typography className="mb-2 select-none font-semibold">
                  Image Preview
                </Typography>
                <Divider />
              </Box>
              <img
                src={preview}
                alt="profile-pic-preview"
                className="select-none m-auto max-w-[200px] max-h-[200px] w-[200px] h-[200px] rounded-full"
              />
            </Box>
          }
        </Box>
        <Button
          onClick={handelSubmit}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Veuillez patienter..." : "Modifier"}
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
