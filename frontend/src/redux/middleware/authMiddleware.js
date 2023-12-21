import { notyf } from "../../utils/notyf";
import resetStates from "../../utils/resetStates";
import { logout, resetHH } from "../slices/AuthSlice";
import { setPath } from "../slices/DashboardSlice";

const authMiddleware = (store) => (next) => (action) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { expiresAt } = user;
    const currentTime = Date.now() / 1000;
    if (expiresAt < currentTime && action.type !== "auth/logout") {
      console.log("Logged u out");
      store.dispatch(logout());
      store.dispatch(setPath(""));
      notyf.error(
        `Votre session a expiré. Veuillez vous reconnecter pour continuer.`
      );
    }
  }

  return next(action);
};

export default authMiddleware;
