import React, { useState, useRef, useEffect } from "react";
import "../styles/Analysis.css";
import Select from "react-select";

const Analysis = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const options = [
    { value: "disease1", label: "Disease 1" },
    { value: "disease2", label: "Disease 2" },
    { value: "disease3", label: "Disease 3" },
    { value: "disease4", label: "Disease 4" },
  ];

  const checkHandler1 = () => setChecked1(!checked1);
  const checkHandler2 = () => setChecked2(!checked2);

  // Close dropdown when clicking outside
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

  const questions = [
    { id: 1, text: "What is the patient’s age?", type: "input" },
    { id: 2, text: "What is the patient’s sex?", type: "input" },
    {
      id: 3,
      text: "What is the patient’s weight? (in kg)",
      type: "input",
    },
    {
      id: 4,
      text: "What is the patient’s height? (in cm)",
      type: "input",
    },
    { id: 5, text: "Does the patient have a fever?", type: "checkbox" },
    { id: 6, text: "Is the patient experiencing a cough?", type: "checkbox" },
    {
      id: 7,
      text: "If productive, what is the color of the sputum?",
      type: "input",
    },
    {
      id: 8,
      text: "Is the patient experiencing shortness of breath?",
      type: "checkbox",
    },
    { id: 9, text: "Does the patient have chest pain?", type: "checkbox" },
    { id: 10, text: "Does the patient have wheezing?", type: "checkbox" },
    {
      id: 11,
      text: "Has the patient experienced loss of smell or taste?",
      type: "checkbox",
    },
    {
      id: 12,
      text: "Does the patient have fatigue or weakness?",
      type: "checkbox",
    },
    {
      id: 13,
      text: "Is the patient experiencing chills or rigors?",
      type: "checkbox",
    },
    {
      id: 14,
      text: "Is the patient experiencing a sore throat?",
      type: "checkbox",
    },
    { id: 15, text: "Does the patient have muscle aches?", type: "checkbox" },
    {
      id: 16,
      text: "Is the patient experiencing nausea, vomiting, or diarrhea?",
      type: "checkbox",
    },
    {
      id: 17,
      text: "Is the patient experiencing severe difficulty breathing?",
      type: "checkbox",
    },
    {
      id: 18,
      text: "Has the patient fainted or felt dizzy?",
      type: "checkbox",
    },
    {
      id: 19,
      text: "Is there bluish discoloration of the lips or nails (cyanosis)?",
      type: "checkbox",
    },
    {
      id: 20,
      text: "Does the patient feel chest tightness or heaviness?",
      type: "checkbox",
    },
    {
      id: 21,
      text: "Does the patient have a history of lung disease?",
      type: "input",
    },
    {
      id: 22,
      text: "Does the patient have a history of heart disease?",
      type: "input",
    },
    {
      id: 23,
      text: "Does the patient take any medications regularly? (Please list)",
      type: "input",
    },
    {
      id: 24,
      text: "Does the patient have known allergies? (Please List)",
      type: "input",
    },
    {
      id: 25,
      text: "Does the patient have a history of smoking?",
      type: "checkbox",
    },
    {
      id: 26,
      text: "Has the patient been in contact with someone sick or tested positive for COVID-19?",
      type: "checkbox",
    },
    { id: 27, text: "Has the patient traveled recently?", type: "input" },
    {
      id: 28,
      text: "Is the patient vaccinated for COVID-19, influenza, and pneumonia?",
      type: "input",
    },
    {
      id: 29,
      text: "Does the patient have occupational or environmental exposure to irritants or pollutants?",
      type: "checkbox",
    },
    {
      id: 30,
      text: "Does the patient drink alcohol or use recreational drugs?",
      type: "input",
    },
    {
      id: 31,
      text: "When did the symptoms start? (dd/mm/yyyy)",
      type: "input",
    },
    {
      id: 32,
      text: "Are the symptoms improving, worsening, or unchanged over time? (type 'improving' or 'worseneing'",
      type: "input",
    },
  ];

  const [answers, setAnswers] = useState(false);

  const handleChange = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  console.log(answers);
  return (
    <div className="analysis">
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
      {checked1 && !checked2 && (
        <div className="image-analysis-container">
          <div className="image-analysis-toolbar">
            <h1 className="image-analysis-title">Image Analysis</h1>

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
          <div className="content">
            <button className="image-analysis-button1">Upload</button>
          </div>
          <button className="image-analysis-button2">Analyse</button>
        </div>
      )}
      {checked2 && !checked1 && (
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
            onClick={console.log("final", answers)}
          >
            Analyse
          </button>
        </div>
      )}
      {checked1 && checked2 && (
        <div className="iaAndcd">
          <div className="image-analysis-container">
            <div className="image-analysis-toolbar">
              <h1 className="image-analysis-title">Image Analysis</h1>

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
            <div className="content">
              <button className="image-analysis-button1">Upload</button>
            </div>
            <button className="image-analysis-button2">Analyse</button>
          </div>
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
              onClick={console.log("final", answers)}
            >
              Analyse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
