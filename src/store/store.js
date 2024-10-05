import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import patientsSlice from "./patientsSlice";
import allPatientsSlice from "./allPatientsSlice";
import doctorSlice from "./doctorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    patient: patientsSlice,

    allpatientslist: allPatientsSlice,
    doctors: doctorSlice,
  },
});

export default store;
