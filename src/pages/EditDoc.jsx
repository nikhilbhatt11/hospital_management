import React, { useEffect, useState } from "react";
import { Container, DocForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditDoc() {
  const [doc, setDoc] = useState(null);

  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      service.getDoctorDetail(url).then((doc) => {
        if (doc) {
          setDoc(doc);
        }
      });
    } else {
      navigate("/");
    }
  }, [url, navigate]);

  return doc ? (
    <div className="py-8">
      <Container>
        <DocForm doc={doc} />
      </Container>
    </div>
  ) : null;
}

export default EditDoc;
