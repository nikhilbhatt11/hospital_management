import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Button, Select } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todayPatient } from "../store/patientsSlice";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
function Home() {
  const [patients, setPatients] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const storePatient = useSelector((state) => state.patient.patientList);
  const currentPage = useSelector((state) => state.patient.currentPage);
  const patientPerPage = useSelector((state) => state.patient.patientPerPage);
  const indexLastItem = currentPage * patientPerPage;

  const indexFirstItem = indexLastItem - patientPerPage;

  let currentPageList;
  const totalPages = Math.ceil(storePatient.length / patientPerPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId;

  if (userData && userData.$id) {
    userId = userData?.$id;
  } else if (userData && userData.userData && userData.userData.$id) {
    userId = userData?.userData?.$id;
  } else {
    userId = null;
  }

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (
      storePatient.length == 0 ||
      appointmentStatus == "completed" ||
      appointmentStatus == "cancled"
    ) {
      console.log(appointmentStatus);
      service.getTodayPatients([], userId).then((res) => {
        const patientdata = res?.documents || [];

        dispatch(todayPatient({ patientdata, currentPage, patientPerPage }));
        setAppointmentStatus("");
        setLoading(false);
      });
    } else {
      currentPageList = storePatient.slice(indexFirstItem, indexLastItem);

      setPatients(currentPageList);
      setLoading(false);
    }
  }, [storePatient, currentPageList, currentPage, appointmentStatus, userId]);

  useEffect(() => {
    if (appointmentStatus === "cancled" || appointmentStatus === "completed") {
      const selectedPatient = patients.find((p) => p.$id === patientId);
      console.log(selectedPatient);
      if (selectedPatient) {
        service.updatePatientStatus(patientId, appointmentStatus);
      }
    }
  }, [appointmentStatus, patientId]);

  const appointmentstatus = (value, id) => {
    setPatientId("");
    setAppointmentStatus("");

    setPatientId(id);
    setAppointmentStatus(value);
  };

  const handlePrevious = () => {
    dispatch(
      todayPatient({
        patientdata: storePatient,
        currentPage: Math.max(currentPage - 1, 1),
        patientPerPage,
      })
    );
  };

  const handleNext = () => {
    dispatch(
      todayPatient({
        patientdata: storePatient,
        currentPage: Math.min(currentPage + 1, totalPages),
        patientPerPage,
      })
    );
  };

  const handlePageClick = (pageno) => {
    dispatch(
      todayPatient({
        patientdata: storePatient,
        currentPage: pageno,
        patientPerPage,
      })
    );
  };

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="pt-12 bg-blue-200 w-full">
        <div className="h-screen">
          <div className="bg-blue-400 h-16 mx-1 flex justify-between items-center font-semibold text-md px-1">
            <h2 className="w-20 sm:w-28">Name</h2>
            <h2 className="w-24 sm:w-28">Doc Name</h2>
            <h2 className="w-24 sm:w-28">Date</h2>
            <h2 className="w-20 sm:w-28">Status</h2>
          </div>
          {patients.length === 0 ? (
            <div className="mt-16 text-center text-4xl bg-red-400 text-white mx-4 rounded-md">
              Add Patient
            </div>
          ) : (
            <div>
              {patients.map((patient) => (
                <div
                  className="bg-blue-300 h-12 mx-1 mt-2 flex justify-between items-center sm:h-12"
                  key={patient.$id}
                >
                  <div>
                    <Link to={`/patient-detail/${patient.$id}`}>
                      <div className=" h-10  flex justify-between items-center">
                        <p className=" w-20 h-12  sm:w-40  md:w-48  lg:w-64  xl:w-96">
                          {patient.name}
                        </p>
                        <p className="w-24 h-12 mr-1    sm:w-40  md:w-48  lg:w-64  xl:w-96">
                          {patient.docname}
                        </p>
                        <p className="w-20  h-12  sm:w-40   md:w-48  lg:w-64  xl:w-96">
                          {patient.appointmentdate}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="w-20 mr-3 sm:w-28">
                    <Select
                      options={[
                        patient.appointmentstatus,
                        "completed",
                        "cancled",
                      ]}
                      classname="h-12 w-20 text-xs sm:h-9 sm:w-full sm:text-sm sm:rounded-none"
                      onChange={(event) => {
                        const value = event.target.value;
                        const id = patient.$id;
                        appointmentstatus(value, id);
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="bg-white mt-5 flex  justify-center gap-3 rounded-md">
                <Button
                  className="text-white px-5 rounded-md py-2 disabled:hidden"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <FcPrevious />
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    className={`bg-blue-500 text-white px-5 rounded-md py-2 ${
                      currentPage === index + 1 ? "opacity-50" : ""
                    }`}
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  className="text-white px-5 rounded-md py-2 disabled:hidden"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  <FcNext />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
