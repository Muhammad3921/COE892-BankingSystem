import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./prescriptionsubmit.css";

function PrescriptionSubmit() {
  const userId = sessionStorage.getItem('userId');

  const initialFormData = {
    receiptNumber: "",
    dateIssued: "",
    title: "",
    drugStrength: "",
    dosage: "",
    durationWeeks: "",
    doctorName: "",
    hospitalName: "",
    hospitalAddress: "",
  };

  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch("/api/medications");
        if (response.ok) {
          const meds = await response.json();
          console.log("Fetched Medications: ", meds);
          setMedications(meds);
        } else {
          throw new Error("Failed to fetch medications");
        }
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  const navigate = useNavigate();

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    const startDate = new Date();
    const weeks = parseInt(event.target.durationWeeks.value, 10);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + weeks * 7);

    const startRecur = startDate.toISOString().split("T")[0];
    const endRecur = endDate.toISOString().split("T")[0];

    const newEvent = {
      patientId: userId,
      title: event.target.title.value,
      drugStrength: event.target.drugStrength.value,
      dosage: event.target.dosage.value,
      startRecur: startRecur,
      endRecur: endRecur,
      receiptNumber: event.target.receiptNumber.value,
      dateIssued: event.target.dateIssued.value,
      doctorName: event.target.doctorName.value,
      hospitalName: event.target.hospitalName.value,
      hospitalAddress: event.target.hospitalAddress.value,
    };

    try {
      const response = await fetch("/api/scheduler/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      navigate("/scheduler");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
  };

  const isFieldEmpty = (field) => {
    return field === "" || field === null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="grid-container2">
      <div className="prescription__tile"></div>

      <h2>
        <b>Prescriptions</b>
      </h2>
      <p
        style={{
          marginLeft: "20%",
          color: "#f1860b",
          fontSize: "35px",
          marginTop: "23px",
          fontWeight: "bold",
        }}
      >
        Submit Prescription Details
      </p>

      <form onSubmit={handleAddFormSubmit}>
        <h6>General Information</h6>
        <br></br>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <div className="form-group">
            <label htmlFor="receiptNumber" style={{ color: "#f1860b" }}>
              Rept. No
              {isFieldEmpty(formData.receiptNumber) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="number"
              id="receiptNumber"
              name="receiptNumber"
              placeholder="12345"
              value={formData.receiptNumber}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateIssued" style={{ color: "#f1860b" }}>
              Date issued
              {isFieldEmpty(formData.dateIssued) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="date"
              id="dateIssued"
              name="dateIssued"
              placeholder="11/26/2023"
              value={formData.dateIssued}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorName" style={{ color: "#f1860b" }}>
              Name of Doctor
              {isFieldEmpty(formData.doctorName) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              placeholder="John Doe"
              value={formData.doctorName}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
        </div>
        <br></br>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <div className="form-group">
            <label htmlFor="hospitalName" style={{ color: "#f1860b" }}>
              Name of hospital/clinic
              {isFieldEmpty(formData.hospitalName) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              placeholder="William Osler Health System - Etobicoke General Hospital"
              value={formData.hospitalName}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospitalAddress" style={{ color: "#f1860b" }}>
              Address of hospital/clinic
              {isFieldEmpty(formData.hospitalAddress) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="text"
              id="hospitalAddress"
              name="hospitalAddress"
              placeholder="150 Eastern Road, Toronto, Ontario, Canada, M3C 1C2"
              value={formData.hospitalAddress}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
        </div>
        <br></br>
        <br></br>
        <h6>Drug Information</h6>
        <br></br>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <div className="form-group">
            <label htmlFor="title" style={{ color: "#f1860b" }}>
              Name
              {isFieldEmpty(formData.title) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ borderBottom: "2px solid #f1860b", display: "block" }}
              required
            >
              <option value="">Select a medication</option>
              {medications.map((medication, index) => (
                <option key={index} value={medication}>
                  {medication}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="drugStrength" style={{ color: "#f1860b" }}>
              Strength
              {isFieldEmpty(formData.drugStrength) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="text"
              id="drugStrength"
              name="drugStrength"
              placeholder="500mg"
              value={formData.drugStrength}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dosage" style={{ color: "#f1860b" }}>
              Dosage
              {isFieldEmpty(formData.dosage) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="number"
              id="dosage"
              name="dosage"
              placeholder="2"
              value={formData.dosage}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="durationWeeks" style={{ color: "#f1860b" }}>
              Duration (weeks)
              {isFieldEmpty(formData.durationWeeks) ? (
                <span style={{ color: "red" }}>*</span>
              ) : null}
            </label>
            <input
              type="number"
              id="durationWeeks"
              name="durationWeeks"
              placeholder="4"
              value={formData.durationWeeks}
              onChange={handleChange}
              style={{
                borderBottom: "2px solid #f1860b",
              }}
              required
            />
          </div>
        </div>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            className="submit"
            type="submit"
            style={{
              width: "20%",
              color: "white",
              backgroundColor: "#f1860b",
              borderRadius: "15px",
              display: "block",
              marginTop: "30px",
            }}
          >
            Submit
          </button>
          <button
            className="clear"
            type="button"
            style={{
              width: "20%",
              backgroundColor: "white",
              color: "#f1860b",
              borderColor: "#f1860b",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "15px",
              display: "block",
              marginTop: "30px",
            }}
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrescriptionSubmit;
