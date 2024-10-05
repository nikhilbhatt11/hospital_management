import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorlist: [],
  currentPage: 1,
  doctorPerPage: 50,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    allDoctors: (state, action) => {
      const { doctorlist, currentPage, doctorPerPage } = action.payload;

      state.doctorlist = doctorlist;
      state.currentPage = currentPage;
      state.doctorPerPage = doctorPerPage;
    },
    addDoctor: (state, action) => {
      state.doctorlist.push(action.payload);
    },
  },
});

export const { allDoctors, addDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
