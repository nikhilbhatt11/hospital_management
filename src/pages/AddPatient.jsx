import React from "react";
import { Container, PatientForm } from "../components";

function AddPatient() {
  return (
    <div>
      <div className="py-8">
        <Container>
          <PatientForm />
        </Container>
      </div>
    </div>
  );
}

export default AddPatient;
