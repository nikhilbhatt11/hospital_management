import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { DocCard, Container } from "../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allDoctors } from "../store/doctorSlice";
import { Button } from "../components/index";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
function AllDoc() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDoc, setDeleteDoc] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const doctorlist = useSelector((state) => state.doctors.doctorlist);
  const currentPage = useSelector((state) => state.doctors.currentPage);
  const doctorPerPage = useSelector((state) => state.doctors.doctorPerPage);
  const indexLastItem = currentPage * doctorPerPage;
  const indexFirstItem = indexLastItem - doctorPerPage;
  var currentPageList;
  const totalPages = Math.ceil(doctorlist.length / doctorPerPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId;

  if (userData && userData.$id) {
    userId = userData?.$id;
    console.log(userId);
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

    if (doctorlist.length === 0) {
      service
        .getAllDoctors([], userId)
        .then((docs) => {
          if (docs) {
            const docdata = docs.documents || [];

            dispatch(
              allDoctors({ doctorlist: docdata, currentPage, doctorPerPage })
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching doctors: ", error);
        });
      setLoading(false);
    } else if (deleteDoc === true) {
      service
        .getAllDoctors([], userId)
        .then((docs) => {
          if (docs) {
            const docdata = docs.documents;

            dispatch(
              allDoctors({ doctorlist: docdata, currentPage, doctorPerPage })
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching doctors: ", error);
        });
      setDeleteDoc(false);
    } else {
      currentPageList = doctorlist.slice(indexFirstItem, indexLastItem);

      if (currentPageList == 0 && currentPage > 1) {
        dispatch(
          allDoctors({
            doctorlist: doctorlist,
            currentPage: currentPage - 1,
            doctorPerPage,
          })
        );
      }
      setDocs(currentPageList);

      setLoading(false);
      setDeleteDoc(false);
    }
  }, [doctorlist, currentPage, currentPageList, deleteDoc, userId]);

  const handlePrevious = () => {
    dispatch(
      allDoctors({
        doctorlist: doctorlist,
        currentPage: Math.max(currentPage - 1, 1),
        doctorPerPage,
      })
    );
  };

  const handleNext = () => {
    dispatch(
      allDoctors({
        doctorlist: doctorlist,
        currentPage: Math.min(currentPage + 1, totalPages),
        doctorPerPage,
      })
    );
  };

  const handlePageClick = (pageno) => {
    dispatch(
      allDoctors({
        doctorlist: doctorlist,
        currentPage: pageno,
        doctorPerPage,
      })
    );
  };
  const handleDocDelete = (doc) => {
    console.log(doc);
    service.deleteDoctordata(doc.$id).then((doctor) => {
      if (doctor) {
        service.deleteFile(doc.featuredimage);

        setDeleteDoc(true);
      }
    });
  };
  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {docs == 0 ? (
        <div className="mt-28 text-4xl text-center mx-4 rounded-md text-white bg-red-400">
          {" "}
          Add Doctors
        </div>
      ) : (
        <div className="w-full py-6 ">
          <Container>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5">
              {docs.map((doc) => (
                <div key={doc.$id}>
                  <DocCard {...doc} handleDocDelete={handleDocDelete} />
                </div>
              ))}
            </div>

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
          </Container>
        </div>
      )}
    </div>
  );
}

export default AllDoc;
