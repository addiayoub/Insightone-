import { setUsers } from "../redux/slices/UserSlice";
import { setPath } from "../redux/slices/DashboardSlice";
import {
  hideChart,
  resetCustomization,
  resetData,
} from "../redux/slices/DataSlice";
import { store } from "../redux/store";
import { resetSectorialData } from "../redux/slices/SectorialSlice";

const resetStates = () => {
  store.dispatch(setUsers([]));
  store.dispatch(setPath(""));
  store.dispatch(resetCustomization());
  store.dispatch(hideChart());
  store.dispatch(resetData());
  store.dispatch(resetSectorialData());
};
export default resetStates;
