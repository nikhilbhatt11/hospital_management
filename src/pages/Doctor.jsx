import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

import { Button } from "../components/index";

import { IoArrowBackOutline } from "react-icons/io5";
function Doctor() {
  const [doctor, setDoctor] = useState(null);
  const { url } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

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
    if (url) {
      service.getDoctorDetail(url).then((doctor) => {
        if (doctor) setDoctor(doctor);
        else navigate("/");
      });
    } else navigate("/");
  }, [url, navigate, userId]);

  return doctor ? (
    <div className="flex justify-center">
      <div className="bg-white mt-24 w-96 h-96 pb-12 rounded-md text-xl font-serif flex flex-col items-center">
        <h1 className="text-center mt-4 mb-2">Doctor Details</h1>
        <div className="w-52">
          <img
            src={service.getFilePreview(doctor.featuredimage)}
            alt={doctor.docname}
            className=""
          />
        </div>
        <h2 className="bg-white">Name: {doctor.docname}</h2>

        <h2>Doc Name: {doctor.speciality}</h2>
        <h2>Joining Date: {doctor.joiningdate}</h2>
        <Link to={"/all-docs"}>
          <Button className="bg-blue-400 text-white px-4 py-1 rounded-md flex items-center">
            <IoArrowBackOutline />
            Back
          </Button>
        </Link>
        {/* <div>
          <Link to={`/edit-doc/${doctor.$id}`}>
            <Button className="mr-3 bg-green-500 px-6 py-2 rounded-md text-white">
              Edit
            </Button>
          </Link>
          <Button
            className="bg-red-500 px-6 py-2 rounded-md text-white"
            onClick={deleteDoctor}
          >
            Delete
          </Button>
        </div> */}
      </div>
    </div>
  ) : null;
}

export default Doctor;
