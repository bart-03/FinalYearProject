import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/Analysis.css";
import Select from "react-select";
import ReusableSection from "./Report";
import axios from "axios";
import { MyContext } from "./MyContext";
import questions from "./PromptQuestions";
import dayjs from "dayjs";

const Analysis = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [iaButtonPressed, setIaButtonPressed] = useState(false);
  const [cdButtonPressed, setCdButtonPressed] = useState(false);
  const [bothButtonPressed, setBothButtonPressed] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [answers, setAnswers] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);
  const [dateTime, setDateTime] = useState("");

  const dropdownRef = useRef(null);
  const checkHandler1 = () => setChecked1(!checked1);
  const checkHandler2 = () => setChecked2(!checked2);

  const { navbarValue } = useContext(MyContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(navbarValue);

  let render;
  if (selectedOptions.length === 0) {
    render = (
      <div className="nothing-selected-content">Please select a disease.</div>
    );
  }

  useEffect(() => {
    setIsNavbarOpen(navbarValue);
  }, [navbarValue]);

  const options = [
    { value: "disease1", label: "Pnuemonia" },
    { value: "disease2", label: "Pulmonary Edema" },
    { value: "disease3", label: "Disease 3" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIaButtonPressed(false);
    setCdButtonPressed(false);
    setBothButtonPressed(false);
  }, [checked1, checked2]);

  const handleChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
    setImageLocal(URL.createObjectURL(e.target.files[0]));
  };

  if (selectedOptions.length > 0) {
    console.log(selectedOptions.value);
  }

  const handleAnalysis = async () => {
    if (selectedOptions.value === "disease1") {
      const formData = new FormData();
      formData.append("image", image);

      await axios
        .post("http://localhost:8080/PnuemoniaPredict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setResponse(response.data);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
        });
    }else if(selectedOptions.value === "disease2"){
      const formData = new FormData();
      formData.append("image", image);

      await axios
        .post("http://localhost:8080/EdemaPredict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setResponse(response.data);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
        });
    }
  };

  const handleSaveDateTime = () => {
    setDateTime(dayjs().format("YYYY-MM-DD HH:mm"));
  };

  const test = () => {
    setIaButtonPressed(true);
    handleAnalysis();
    handleSaveDateTime();
  };

  return (
    // MAIN CONTAINER OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    <div className={isNavbarOpen ? "analysis-blur" : "analysis"}>
      <h1 className="title-analysis">Analysis</h1>
      <div className="analysis-checbox">
        <div className="checkbox1-Container">
          <input
            className="checkbox1"
            type="checkbox"
            checked={checked1}
            onChange={checkHandler1}
          />
          <label className="checkbox-label1">Image Analysis</label>
        </div>
        <div className="checkbox2-Container">
          <input
            className="checkbox2"
            type="checkbox"
            checked={checked2}
            onChange={checkHandler2}
          />
          <label className="checkbox-label2">Clinical Data</label>
        </div>
      </div>
      {!checked1 && !checked2 && (
        <div className="nothing-selected">
          Nothing selected, plaese select a view.
        </div>
      )}
      {/* ANALYSIS VIEW ONLY OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
      {checked1 && !checked2 && (
        <div className="main-container">
          <div className="image-analysis-container">
            <div className="image-analysis-toolbar">
              <h1 className="image-analysis-title">Image Analysis</h1>

              <div
                className="dropdown"
                ref={dropdownRef}
                style={{ marginTop: "20px" }}
              >
                <Select
                  // isMulti
                  options={options}
                  value={selectedOptions}
                  onChange={setSelectedOptions}
                  placeholder="Select Disease"
                  menuIsOpen={isDropdownOpen}
                  onMenuOpen={() => setIsDropdownOpen(true)}
                />
              </div>
            </div>

            <div className="content">
              {render}
              {imageLocal && (
                <>
                  <div className="image-preview-container">
                    <img
                      className="image-preview"
                      src={imageLocal}
                      alt="Uploaded Preview"
                    />
                    <label style={{ fontSize: "15px" }}>Selected Image </label>
                  </div>
                </>
              )}

              <input
                type="file"
                className="image-analysis-button1"
                onChange={handleUpload}
              />

              <button
                className="remove-img-button"
                onClick={() => setImageLocal(null) && setImage(null)}
              >
                X
              </button>
            </div>

            <button
              className={`${
                selectedOptions.value && image !== null
                  ? "image-analysis-button2"
                  : "image-analysis-button-disabled"
              }`}
              onClick={test}
              disabled={!selectedOptions.value || image === null}
            >
              Analyse
            </button>
          </div>
          <ReusableSection
            checked1={checked1}
            checked2={checked2}
            iaButtonPressed={iaButtonPressed}
            cdButtonPressed={cdButtonPressed}
            bothButtonPressed={bothButtonPressed}
            response={response}
            imageLocal={imageLocal}
            dateTime={dateTime}
            selectedOptions={selectedOptions}
          />
        </div>
      )}
      {/* CLINICAL DATA VIEW ONLY OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO*/}
      {checked2 && !checked1 && (
        <div className="main-container">
          <div className="clinical-data">
            <div className="clinical-data-toolbar">
              <h1 className="clinical-data-title">Clinical Data - Input</h1>

              <div
                className="dropdown"
                ref={dropdownRef}
                style={{ marginTop: "20px" }}
              >
                <Select
                  isMulti
                  options={options}
                  value={selectedOptions}
                  onChange={setSelectedOptions}
                  placeholder="Select options..."
                  menuIsOpen={isDropdownOpen}
                  onMenuOpen={() => setIsDropdownOpen(true)}
                />
              </div>
            </div>
            <div className="cd-content">
              <form>
                {questions.map((question) => (
                  <div key={question.id} style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "12px" }}>
                      {question.id + ". "}
                      {question.text}
                      {question.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          style={{
                            marginLeft: "10px",
                            fontSize: "12px",
                            padding: "2px",
                          }}
                          checked={answers[question.id] || false}
                          onChange={(e) =>
                            handleChange(question.id, e.target.checked)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          style={{
                            marginLeft: "10px",
                            fontSize: "12px",
                            padding: "2px",
                          }}
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleChange(question.id, e.target.value)
                          }
                        />
                      )}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <button
              className="image-analysis-button2"
              onClick={() => setCdButtonPressed(true)}
            >
              Analyse
            </button>
          </div>
          <ReusableSection
            checked1={checked1}
            checked2={checked2}
            iaButtonPressed={iaButtonPressed}
            cdButtonPressed={cdButtonPressed}
            bothButtonPressed={bothButtonPressed}
          />
        </div>
      )}
      {/* DOUBLE VIEW OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
      {checked1 && checked2 && (
        <div className="main-container">
          <div className="iaAndcd">
            <div className="combined-image-analysis-container">
              <div className="combined-image-analysis-toolbar">
                <h1 className="combined-image-analysis-title">
                  Image Analysis
                </h1>

                <div
                  className="dropdown"
                  ref={dropdownRef}
                  style={{ marginTop: "20px" }}
                >
                  <Select
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={setSelectedOptions}
                    placeholder="Select options..."
                    menuIsOpen={isDropdownOpen}
                    onMenuOpen={() => setIsDropdownOpen(true)}
                  />
                </div>
                <div></div>
              </div>
              <div className="combined-content">
                <button className="image-analysis-button1">Upload</button>
              </div>
            </div>
            <div className="combined-clinical-data">
              <div className="combined-clinical-data-toolbar">
                <h1 className="clinical-data-title">Clinical Data - Input</h1>

                <div
                  className="dropdown"
                  ref={dropdownRef}
                  style={{ marginTop: "20px" }}
                >
                  <Select
                    isMulti
                    options={options}
                    value={selectedOptions}
                    onChange={setSelectedOptions}
                    placeholder="Select options..."
                    menuIsOpen={isDropdownOpen}
                    onMenuOpen={() => setIsDropdownOpen(true)}
                  />
                </div>
              </div>
              <div className="combined-cd-content">
                <form>
                  {questions.map((question) => (
                    <div key={question.id} style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "12px" }}>
                        {question.id + ". "}
                        {question.text}
                        {question.type === "checkbox" ? (
                          <input
                            type="checkbox"
                            style={{
                              marginLeft: "10px",
                              fontSize: "12px",
                              padding: "2px",
                            }}
                            checked={answers[question.id] || false}
                            onChange={(e) =>
                              handleChange(question.id, e.target.checked)
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            style={{
                              marginLeft: "10px",
                              fontSize: "12px",
                              padding: "2px",
                            }}
                            value={answers[question.id] || ""}
                            onChange={(e) =>
                              handleChange(question.id, e.target.value)
                            }
                          />
                        )}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              <button
                className="combined-button"
                onClick={() => setBothButtonPressed(true)}
              >
                Analyse
              </button>
            </div>
          </div>
          <ReusableSection
            checked1={checked1}
            checked2={checked2}
            iaButtonPressed={iaButtonPressed}
            cdButtonPressed={cdButtonPressed}
            bothButtonPressed={bothButtonPressed}
          />
        </div>
      )}
    </div>
  );
};

export default Analysis;
