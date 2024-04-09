import { setUsers } from "../redux/slices/UserSlice";
import { setPath } from "../redux/slices/DashboardSlice";
import { hideChart, resetData } from "../redux/slices/DataSlice";
import { store } from "../redux/store";
import { resetSectorialData } from "../redux/slices/AnalyseSectorialSlice";
import { resetNews } from "../redux/slices/ProfileFinSlice";

const resetStates = () => {
  store.dispatch(setUsers([]));
  store.dispatch(setPath(""));
  store.dispatch(hideChart());
  store.dispatch(resetData());
  store.dispatch(resetNews());
  store.dispatch(resetSectorialData());
  localStorage.clear();
};
export default resetStates;
