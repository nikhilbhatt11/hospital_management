import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

function PatientDetail() {
  const [detail, setDetail] = useState(null);
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      service.getPatientDetails(url).then((detail) => {
        console.log(detail);
        if (detail) setDetail(detail);
        else navigate("/");
      });
    } else navigate("/");
  }, [url, navigate]);

  return detail ? (
    <div className="flex justify-center">
      <div className="bg-white mt-24 w-80 h-80 rounded-md text-xl font-serif pl-4">
        <h1 className="text-center mt-4 mb-2">Patient Details</h1>
        <h2 className="bg-white">Name: {detail.name}</h2>

        <h2>Doc Name: {detail.docname}</h2>
        <h2>Age: {detail.age}</h2>
        <h2>Appointment Date: {detail.appointmentdate}</h2>
        <h2>Appointment Status: {detail.appointmentstatus}</h2>
        <h3>Address: {detail.address}</h3>
        <h3>Mobile No.: {detail.mobileno}</h3>
      </div>
    </div>
  ) : null;
}

export default PatientDetail;
