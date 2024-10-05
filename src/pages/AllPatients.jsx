import React, { useState, useEffect } from "react";
import { Input, Button } from "../components";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allPatientsByDate } from "../store/allPatientsSlice";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
function AllPatients() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const list = useSelector((state) => state.allpatientslist.list);
  const currentPage = useSelector((state) => state.allpatientslist.currentPage);
  const patientPerPage = useSelector(
    (state) => state.allpatientslist.patientPerPage
  );
  const indexLastItem = currentPage * patientPerPage;
  const indexFirstItem = indexLastItem - patientPerPage;
  let currentPageList;
  const totalPages = Math.ceil(list.length / patientPerPage);
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
    if (userId && inputValue !== "") {
      service.getAllPatientsOfDate([], userId, inputValue).then((res) => {
        const patientdata = res.documents;

        dispatch(
          allPatientsByDate({ patientdata, currentPage, patientPerPage })
        );
        setInputValue("");
      });
    }
    {
      currentPageList = list.slice(indexFirstItem, indexLastItem);

      setData(currentPageList);
      setLoading(false);
    }
  }, [inputValue, currentPageList, currentPage, userId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };
  const handlePrevious = () => {
    dispatch(
      allPatientsByDate({
        patientdata: list,
        currentPage: Math.max(currentPage - 1, 1),
        patientPerPage,
      })
    );
  };

  const handleNext = () => {
    dispatch(
      allPatientsByDate({
        patientdata: list,
        currentPage: Math.min(currentPage + 1, totalPages),
        patientPerPage,
      })
    );
  };

  const handlePageClick = (pageno) => {
    dispatch(
      allPatientsByDate({
        patientdata: list,
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
      <div className="mt-16 flex flex-col justify-center items-center overflow-hidden">
        <div className="w-96 flex flex-col items-center">
          <h1 className="text-center font-medium font-serif h-10 text-sm sm:text-xl">
            Enter Which date list you wanted to see
          </h1>
          <div className="flex flex-col items-center w-60 gap-2 sm:flex sm:flex-row sm:w-96 ">
            <Input
              type="date"
              label=""
              className=""
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-blue-400  mt-4 h-16 mx-1 flex justify-between items-center font-semibold text-md px-1">
            <h2 className="w-20 sm:w-32 md:w-48 md:ml-28 lg:w-60 ">Name</h2>
            <h2 className="w-24 sm:w-32 md:w-48 md:ml-16 lg:w-60 ">Doc Name</h2>
            <h2 className="w-24 sm:w-32 md:w-48 lg:w-60 ">Date</h2>
            <h2 className="w-20 sm:w-28 md:w-40 lg:w-52 ">Status</h2>
          </div>
        </div>
        <div>
          {data.length == 0 ? (
            <div className="bg-red-400 w-full text-white px-10 py-1 text-2xl rounded-md mt-2">
              Empty list
            </div>
          ) : (
            <div>
              {data.map((d) => (
                <div
                  className="bg-blue-300 h-12 mx-1 mt-2 flex justify-between items-center sm:h-12"
                  key={d.$id}
                >
                  <div>
                    <Link to={`/patient-detail/${d.$id}`}>
                      <div className=" h-10  flex justify-between items-center">
                        <p className=" w-20 h-12  sm:w-32  md:w-52 md:ml-10  lg:w-64 ">
                          {d.name}
                        </p>
                        <p className="w-24 h-12 mr-1    sm:w-32  md:w-52  lg:w-64  ">
                          {d.docname}
                        </p>
                        <p className="w-20  h-12  sm:w-32   md:w-52  lg:w-64 ">
                          {d.appointmentdate}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="w-20 mr-3 sm:w-24">
                    <div className="h-12 w-20 text-xs sm:h-9 sm:w-full sm:text-sm sm:rounded-none">
                      {d.appointmentstatus}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="bg-white mt-5 flex  justify-center gap-3 rounded-md
              "
              >
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
                    // active={currentPage === index + 1}
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

export default AllPatients;
