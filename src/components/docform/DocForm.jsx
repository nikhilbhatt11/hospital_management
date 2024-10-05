import React, { useCallback, useEffect } from "react";
import { Button, Input, Select } from "../index";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDoctor } from "../../store/doctorSlice";

function DocForm({ doc }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      docname: doc?.docname || "",
      speciality: doc?.speciality || "",
      joiningdate: doc?.joiningdate || "",
      available: doc?.available || "active",

      featuredimage: doc?.featuredimage || "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    let userId;
    if (userData && userData.$id) {
      userId = userData?.$id;
    } else if (userData && userData.userData && userData.userData.$id) {
      userId = userData?.userData?.$id;
    } else {
      userId = null;
    }
    if (!userId) {
      navigate("/login");
      return;
    }
    if (data) {
      try {
        const fileId = await service
          .uploadFile(data.featuredimage[0])
          .then((res) => res.$id);

        if (fileId) {
          const doc = await service.addDoctor({
            ...data,
            featuredimage: fileId,
            userId: userId,
          });
          dispatch(
            addDoctor({
              ...data,
              featuredimage: fileId,
              $id: doc.$id,
              userId: userId,
            })
          );
        }
        reset({
          docname: "",
          speciality: "",
          joiningdate: "",
          available: "active",

          featuredimage: "",
        });
      } catch (error) {
        console.error("Error submitting doctor data:", error);
      }
    }
  };

  return (
    <form className="flex justify-center mt-10" onSubmit={handleSubmit(submit)}>
      <div className="w-80 flex flex-col gap-3">
        <h1 className="font-bold text-xl text-center">Doctor Detail Form</h1>

        <Input
          label="Doc Name"
          placeholder="Doc Name"
          className="mb-4"
          {...register("docname", { required: true })}
        />
        <Input
          label="Sepciality"
          placeholder="Speciality"
          className="mb-4"
          {...register("speciality", { required: true })}
        />
        <Input
          label="Joining Date"
          placeholder="Joining Date"
          type="date"
          className="mb-4"
          {...register("joiningdate", { required: true })}
        />

        <Input
          label="Featured Image :"
          type="file"
          className=""
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredimage", { required: !doc })}
        />
        {doc && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(doc.featuredimage)}
              alt={doc.docname}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="available"
          className="border rounded-md"
          {...register("available", { required: true })}
        />
        <Button
          type="submit"
          bgColor={doc ? "bg-green-500" : undefined}
          className="px-4 md:w-full bg-blue-500 text-white py-2 border rounded-md"
        >
          {doc ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default DocForm;
