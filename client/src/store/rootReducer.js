import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reservationsReducer from "./reservationsSlice";
import vehiclesReducer from "./vehiclesSlice";
import reportsReducer from "./reportsSlice";
import { resetState } from "./actions";

const appReducer = combineReducers({
  auth: authReducer,
  reservations: reservationsReducer,
  vehicles: vehiclesReducer,
  reports: reportsReducer
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;