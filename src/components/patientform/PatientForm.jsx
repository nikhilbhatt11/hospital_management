import React, { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPatient } from "../../store/patientsSlice";
import { useNavigate } from "react-router-dom";
function PatientForm({ patient }) {
  const [doctors, setDoctors] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: patient?.name || "",
      docname: patient?.docname || "",
      appointmentdate: patient?.appointmentdate || "",
      age: patient?.age || "",
      address: patient?.address || "",
      mobileno: patient?.mobileno || "",
      appointmentstatus: patient?.appointmentstatus || "booked",
    },
  });
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
    service.getAllDoctors([], userId).then((res) => {
      const filteredDoc = res.documents
        .filter((doc) => {
          return doc.userId == userId;
        })
        .map((doc) => {
          return `${doc.docname} |||  ${doc.speciality}`;
        });
      setDoctors(filteredDoc);
    });
  }, []);

  const submit = async (data) => {
    const response = await service.addPatient({
      ...data,
      userId: userId,
    });
    dispatch(
      addPatient({
        ...data,
        $id: response.$id,
        userId: userId,
      })
    );
    console.log(data);
    reset({
      name: "",
      docname: doctors.length > 0 ? doctors[0] : "",
      appoinmentdate: "",
      age: "",
      address: "",
      mobileno: "",
      appointmentstatus: "booked",
    });
  };

  return (
    <form className="flex justify-center mt-10" onSubmit={handleSubmit(submit)}>
      <div className="w-80 flex flex-col gap-3">
        <h1 className="font-bold text-xl text-center">Patient Detail Form</h1>
        <Input
          placeholder="Patient Name"
          label="Patient Name"
          className=""
          {...register("name", { required: true })}
        />
        <Select
          options={doctors}
          label="Doctor Name"
          {...register("docname", { required: true })}
        />
        <Input
          type="date"
          placeholder="Appointment Date"
          label="Appointment Date"
          className=""
          {...register("appointmentdate", { required: true })}
        />
        <Input
          type="text"
          placeholder="Age"
          label="Age"
          className=""
          {...register("age", { required: true })}
        />
        <Input
          type="text"
          placeholder="Address"
          label="Address"
          className=""
          {...register("address", { required: true })}
        />
        <Input
          type="mobile no"
          placeholder="Mobile No."
          label="Mobile no"
          className=""
          {...register("mobileno", { required: true })}
        />
        <Select
          options={["booked", "completed", "cancle"]}
          label="Appointment Status"
          className=""
          {...register("appointmentstatus")}
        />

        <Button
          type="submit"
          className="px-4 md:w-full bg-blue-500 text-white py-2 border rounded-md"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default PatientForm;
