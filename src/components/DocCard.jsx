import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import Button from "./Button";

function DocCard({ $id, docname, speciality, featuredimage, handleDocDelete }) {
  return (
    <div className="w-40 bg-slate-100 rounded-xl p-2 m-2 items-center">
      <div className="w-38 h-36">
        <img
          src={service.getFilePreview(featuredimage)}
          alt={docname}
          className="rounded-xl h-full w-full"
        />
      </div>
      <h2 className="text-xl font-bold text-center">{docname}</h2>
      <h3 className="text-lg text-center">{speciality}</h3>
      <Link to={`/doc/${$id}`}>
        <Button className="bg-green-400 text-white rounded-md w-full py-1">
          Details
        </Button>
      </Link>
      <Button
        className="bg-red-400 text-white rounded-md w-full"
        onClick={() =>
          handleDocDelete({ $id, docname, speciality, featuredimage })
        }
      >
        Delete
      </Button>
    </div>
  );
}

export default DocCard;
