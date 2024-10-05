import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentPage: 1,
  patientPerPage: 50,
};

const allPatientSlice = createSlice({
  name: "allpatientslist",
  initialState,
  reducers: {
    allPatientsByDate: (state, action) => {
      const { patientdata, currentPage, patientPerPage } = action.payload;

      state.list = patientdata;
      state.currentPage = currentPage;
      state.patientPerPage = patientPerPage;
    },
  },
});

export const { allPatientsByDate } = allPatientSlice.actions;
export default allPatientSlice.reducer;
