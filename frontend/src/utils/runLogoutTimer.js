import { logout } from "../redux/slices/AuthSlice";
import { setPath } from "../redux/slices/DashboardSlice";
import { store } from "../redux/store";
import { notyf } from "./notyf";

export default function runLogoutTimer(timer) {
  setTimeout(() => {
    store.dispatch(logout());
    notyf.error(
      `Votre session a expiré. Veuillez vous reconnecter pour continuer.`
    );
    store.dispatch(setPath(""));
  }, timer * 1000);
}
