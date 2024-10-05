import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientList: [],
  currentPage: 1,
  patientPerPage: 50,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    todayPatient: (state, action) => {
      const { patientdata, currentPage, patientPerPage } = action.payload;
      state.patientList = patientdata;
      state.currentPage = currentPage;
      state.patientPerPage = patientPerPage;
    },
    addPatient: (state, action) => {
      state.patientList.push(action.payload);
    },
  },
});

export const { todayPatient, addPatient } = patientSlice.actions;
export default patientSlice.reducer;
