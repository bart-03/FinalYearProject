import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/Analysis.css";
import Select from "react-select";
import ReusableSection from "./Report";
import axios from "axios";
import { MyContext } from "./MyContext";
import dayjs from "dayjs";
import Questions2 from "./Questions2";

const Analysis = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [iaButtonPressed, setIaButtonPressed] = useState(false);
  const [cdButtonPressed, setCdButtonPressed] = useState(false);
  const [bothButtonPressed, setBothButtonPressed] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionReport, setSelectedOptionReport] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [answers, setAnswers] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);
  const [imageReport, setImageReport] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const questions2Ref = useRef();
  const targetRef = useRef(null);
  const targetRefTop = useRef(null);
  
  const handleScrollToComponent = () => {
    setTimeout(() => {
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000); // 1-second delay
  };

  const handleScrollToComponenttop = () => {
    setTimeout(() => {
      targetRefTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }); // 1-second delay
  };
 


  const handleAnalyseClick = () => {
    if (questions2Ref.current) {
      questions2Ref.current.handleSubmit(new Event("submit"));
    }
  };
  const dropdownRef = useRef(null);
  const checkHandler1 = () => setChecked1(!checked1);
  const checkHandler2 = () => setChecked2(!checked2);

  const { navbarValue } = useContext(MyContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(navbarValue);

  const {undefinedData} = useContext(MyContext);

  const [showModal, setShowModal] = useState(false); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
    { value: "disease3", label: "Tuberculosis" },
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
    setImageLocal(null);
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
    setImageReport(imageLocal);
    setSelectedOptionReport(selectedOptions);
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
    } else if (selectedOptions.value === "disease2") {
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
    else if (selectedOptions.value === "disease3") {
      const formData = new FormData();
      formData.append("image", image);

      await axios
        .post("http://localhost:8080/TBpredict", formData, {
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

  const handleAnalyseClickBoth = () => {
    handleAnalysis();
    handleSaveDateTime();
    handleAnalyseClick();
    setBothButtonPressed(true);
    handleScrollToComponent();
  };

  const handleAnalyseClickCD = () => {
    setCdButtonPressed(true);
    handleSaveDateTime();
    handleAnalysis();
    handleAnalyseClick();
    handleScrollToComponent();
    
  }

  const handleAnalyseClickIA = () => {
    setIaButtonPressed(true);
    handleSaveDateTime();
    handleAnalysis();
    handleScrollToComponent();
  }


  useEffect(() => {
    setAnswers({});
  }, [checked1, checked2]);

  return (
    // MAIN CONTAINER OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    <div className={isNavbarOpen ? "analysis-blur" : "analysis"}>
       <div ref={targetRefTop}></div>
    
      <button className="tooltip-button" onClick={toggleModal}>
        ? 
      </button>

      {showModal && (
  <div className="modal-overlay" onClick={toggleModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title">Instructions</h2>
      <div className="modal-body">
        <h3>1. Image Analysis View</h3>
        <ul>
          <li>Select a disease from the dropdown.</li>
          <li>Upload an X-ray image.</li>
          <li>Press *Analyse* to generate a report.</li>
          <li>Add clinical data to the report.</li>
          <li>Save the report to the database to access it later in the *History* page.</li>
        </ul>
        <br />
        <h3>2. Clinical Data View</h3>
        <ul>
          <li>Answer all the questions presented.</li>
          <li>Press *Analyse* to generate a report based on your responses.</li>
          <li>Save the report to the database to access it later in the *History* page.</li>
        </ul>
        <br />
        <h3>3. Both View</h3>
        <ul>
          <li>Select a disease and upload an image (like in *Image Analysis*).</li>
          <li>Answer the clinical data questions (like in *Clinical Data*).</li>
          <li>Press *Analyse* to generate a combined report.</li>
          <li>Save the report to the database to access it later in the *History* page.</li>
        </ul>
      </div>
      <button className="button-about" onClick={toggleModal}>
        Close
      </button>
    </div>
  </div>
)}


      <h1 className="title-analysis">Analysis</h1>
      <div className="analysis-checbox">
        <div className="checkbox1-Container">
          <input className="checkbox1" type="checkbox" checked={checked1} onChange={checkHandler1} />
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
      <div className="help-instructions" onClick={handleScrollToComponenttop}>Top</div>
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
                    <label
                      style={{
                        fontSize: "15px",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      Selected Image
                    </label>
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
              onClick={handleAnalyseClickIA}
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
            imageReport={imageReport}
            dateTime={dateTime}
            selectedOptionReport={selectedOptionReport}
           
          />
          <div ref={targetRef}></div>
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
              ></div>
            </div>
            <div className="cd-content">
              <Questions2 ref={questions2Ref} />
            </div>
            <button
              className={`${
                undefinedData === false
                  ? "image-analysis-button2-combined"
                  : "image-analysis-button-disabled"
              }`}
              onClick={handleAnalyseClickCD}
              disabled={undefinedData === true }
            >
              Analyse
            </button>
          </div>
          <div ref={targetRef}></div>
          <ReusableSection
            checked1={checked1}
            checked2={checked2}
            iaButtonPressed={iaButtonPressed}
            cdButtonPressed={cdButtonPressed}
            bothButtonPressed={bothButtonPressed}
            dateTime={dateTime}
          />
          
        </div>
      )}
      {/* DOUBLE VIEW OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
      {checked1 && checked2 && (
        <div className="main-container-combined">
          <div className="toolbar-combined">
            <h1 className="title-combined">
              Clinical Data & Image Analysis
            </h1>
            <div
              className="dropdown-combined"
              ref={dropdownRef}
              style={{ marginTop: "20px" }}
            >
              <Select
                options={options}
                value={selectedOptions}
                onChange={setSelectedOptions}
                placeholder="Select Disease"
                menuIsOpen={isDropdownOpen}
                onMenuOpen={() => setIsDropdownOpen(true)}
                
              />
            </div>
            <button
              className={`${
                selectedOptions.value && image !== null  && undefinedData === false
                  ? "image-analysis-button2-combined"
                  : "image-analysis-button-disabled"
              }`}
              onClick={handleAnalyseClickBoth}
              disabled={!selectedOptions.value || image === null || undefinedData === true}
            >
              Analyse
            </button>
          </div>
          <div className="combined-containers">
            <div className="image-analysis-container-combined">
              <div className="content-ia-combined">
                {render}
                {imageLocal && (
                  <>
                    <div className="image-preview-container-combined">
                      <img
                        className="image-preview-combined"
                        src={imageLocal}
                        alt="Uploaded Preview"
                      />
                      <label
                        style={{
                          fontSize: "15px",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        Selected Image
                      </label>
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
            </div>

            <div className="clinical-data-combined">
              <div className="cd-content-combined">
                <Questions2 ref={questions2Ref} />
              </div>
            </div>
          </div>
          <div ref={targetRef}></div>
          <ReusableSection
            checked1={checked1}
            checked2={checked2}
            iaButtonPressed={iaButtonPressed}
            cdButtonPressed={cdButtonPressed}
            bothButtonPressed={bothButtonPressed}
            response={response}
            imageReport={imageReport}
            dateTime={dateTime}
            selectedOptionReport={selectedOptionReport}

          />
        </div>
      )}
    </div>
  );
};

export default Analysis;
