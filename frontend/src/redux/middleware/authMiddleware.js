import { notyf } from "../../utils/notyf";
import resetStates from "../../utils/resetStates";
import { logout } from "../slices/AuthSlice";
import { setPath } from "../slices/DashboardSlice";

const authMiddleware = (store) => (next) => (action) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { expiresAt } = user;
    const currentTime = Date.now() / 1000;
    console.log("Midd action", action);
    if (expiresAt < currentTime && action.type !== "auth/logout") {
      store.dispatch(logout());
      store.dispatch(setPath(""));
      console.log("Logged u out");
      notyf.error(
        `Votre session a expiré. Veuillez vous reconnecter pour continuer.`
      );
      console.log("return false");
      return false;
    }
  }
  console.log("next(action)");

  return next(action);
};

export default authMiddleware;
