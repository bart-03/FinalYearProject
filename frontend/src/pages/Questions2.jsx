import React, { useState, useContext, forwardRef, useImperativeHandle } from "react";
import "../styles/Report.css";
import axios from "axios";
import { MyContext } from "./MyContext";

// const Questions2 = () => {
  const Questions2 = forwardRef((props, ref) => {
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({});
  const { setCDResponse } = useContext(MyContext);

  const handleAnalysis = async (formattedData) => {
    await axios
      .post(
        "http://localhost:8080/OpenAI",
        { formattedData },
      )
      .then((response) => {
        console.log(response.data.diagnosis);
        setResponse(response.data.diagnosis);
        setCDResponse(response.data.diagnosis);
      })
      .catch((err) => {
        console.error("Error prompting", err);
      });
  };

  console.log("response", response);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionsAndAnswers = [
      {
        question: "1. What is the patient’s age?",
        answer: formData.patientAge,
      },
      {
        question: "2. What is the patient’s sex?",
        answer: formData.patientSex,
      },
      {
        question: "3. What is the patient’s weight?",
        answer: formData.patientWeight,
      },
      {
        question: "4. What is the patient’s height?",
        answer: formData.patientHeight,
      },
      { question: "5. Does the patient have a fever?", answer: formData.fever },
      // { question: "6. Is the patient experiencing a cough?", answer: formData.cough },
      // { question: "7. If productive, what is the color of the sputum?", answer: formData.sputumColor },
      // { question: "8. Is the patient experiencing shortness of breath?", answer: formData.shortBreath },
      // { question: "9. Does the patient have chest pain?", answer: formData.chestPain },
      // { question: "10. Does the patient have wheezing?", answer: formData.wheezing },
      // { question: "11. Has the patient experienced loss of smell or taste?", answer: formData.lossSmellTaste },
      // { question: "12. Does the patient have fatigue or weakness?", answer: formData.fatigue },
      // { question: "13. Is the patient experiencing chills or rigors?", answer: formData.chills },
      // { question: "14. Is the patient experiencing a sore throat?", answer: formData.soreThroat },
      // { question: "15. Does the patient have muscle aches?", answer: formData.aches },
      // { question: "16. Is the patient experiencing nausea, vomiting, or diarrhea?", answer: formData.nausea },
      // { question: "17. Is the patient experiencing severe difficulty breathing?", answer: formData.difficultBreathing },
      // { question: "18. Has the patient fainted or felt dizzy?", answer: formData.dizzy },
      // { question: "19. Is there bluish discoloration of the lips or nails (cyanosis)?", answer: formData.cyanosis },
      // { question: "20. Does the patient feel chest tightness or heaviness?", answer: formData.tightChest },
      // { question: "21. Does the patient have a history of lung disease?", answer: formData.history },
      // { question: "22. Does the patient have a history of heart disease?", answer: formData.historyHeart },
      // { question: "23. Does the patient take any medications regularly?", answer: formData.medicationsList },
      // { question: "24. Does the patient have known allergies?", answer: formData.allergiesList },
      // { question: "25. Does the patient have a history of smoking?", answer: formData.smokes },
      // { question: "26. Has the patient been in contact with someone sick or tested positive for COVID-19?", answer: formData.covid },
      // { question: "27. Has the patient traveled recently?", answer: formData.travelled },
      // { question: "28. Is the patient vaccinated for COVID-19, influenza, and pneumonia?", answer: formData.vaccinated },
      // { question: "29. Does the patient have occupational or environmental exposure to irritants or pollutants?", answer: formData.pollutantExposure },
      // { question: "30. Does the patient drink alcohol or use recreational drugs?", answer: formData.recreational },
      // { question: "31. When did the symptoms start?", answer: formData.symptomsStartDate },
      // { question: "32. Are the symptoms improving, worsening, or unchanged over time?", answer: formData.symptomProgression },
      // { question: "33. What type of chest pain does the patient describe (sharp, dull, burning, stabbing)?", answer: formData.chestPainType },
      // { question: "34. Is the chest pain associated with physical activity, eating, or rest?", answer: formData.chestPainAssociation },
      // { question: "35. Does the pain radiate to the arm, back, or jaw?", answer: formData.painRadiation },
      // { question: "36. Is shortness of breath triggered by exertion, lying down, or at rest?", answer: formData.shortBreathTrigger },
      // { question: "37. Does the patient have a history of recurrent lung infections?", answer: formData.lungInfections },
      // { question: "38. Has the patient recently experienced rapid or irregular heartbeats (palpitations)?", answer: formData.palpitations },
      // { question: "39. Does the patient notice changes in appetite or significant weight loss?", answer: formData.weightChange },
      // { question: "40. Has the patient recently had surgery or been immobilized?", answer: formData.surgeryImmobilized },
      // { question: "41. Does the patient experience difficulty breathing while sleeping (orthopnea)?", answer: formData.orthopnea },
      // { question: "42. Are there any symptoms of night sweats?", answer: formData.nightSweats },
      // { question: "43. Has the patient experienced hemoptysis (coughing up blood)?", answer: formData.hemoptysis }
    ];

    const formattedData = questionsAndAnswers
      .map((q) => `${q.question} Answer: ${q.answer}`)
      .join("\n");

    console.log("final", formattedData);

    handleAnalysis(formattedData);
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    // <form onSubmit={handleSubmit}>
    <form  onSubmit={handleSubmit}>
      <div className="cd-report-questions">
        <label>1. What is the patient’s age?</label>
        <input
          type="number"
          name="patientAge"
          required
          onChange={handleChange}
        />

        <label>2. What is the patient’s sex?</label>
        <div>
          <input
            type="radio"
            name="patientSex"
            value="male"
            required
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="patientSex"
            value="female"
            required
            onChange={handleChange}
          />{" "}
          Female
        </div>

        <label>3. What is the patient’s weight? (in kg)</label>
        <input
          type="number"
          name="patientWeight"
          required
          onChange={handleChange}
        />

        <label>4. What is the patient’s height? (in cm)</label>
        <input
          type="number"
          name="patientHeight"
          required
          onChange={handleChange}
        />

        <label>5. Does the patient have a fever?</label>
        <div>
          <input
            type="radio"
            name="fever"
            value="yes"
            required
            onChange={handleChange}
          />{" "}
          Yes
          <input
            type="radio"
            name="fever"
            value="no"
            required
            onChange={handleChange}
          />{" "}
          No
        </div>

        {/* <label>6. Is the patient experiencing a cough?</label>
    <div>
      <input type="radio" name="cough" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="cough" value="no" required onChange={handleChange} /> No
    </div>

    <label>7. If productive, what is the color of the sputum?</label>
    <input type="text" name="sputumColor" required onChange={handleChange} />

    <label>8. Is the patient experiencing shortness of breath?</label>
    <div>
      <input type="radio" name="shortBreath" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="shortBreath" value="no" required onChange={handleChange} /> No
    </div>

    <label>9. Does the patient have chest pain?</label>
    <div>
      <input type="radio" name="chestPain" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="chestPain" value="no" required onChange={handleChange} /> No
    </div>

    <label>10. Does the patient have wheezing?</label>
    <div>
      <input type="radio" name="wheezing" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="wheezing" value="no" required onChange={handleChange} /> No
    </div>

    <label>11. Has the patient experienced loss of smell or taste?</label>
    <div>
      <input type="radio" name="lossSmellTaste" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="lossSmellTaste" value="no" required onChange={handleChange} /> No
    </div>

    <label>12. Does the patient have fatigue or weakness?</label>
    <div>
      <input type="radio" name="fatigue" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="fatigue" value="no" required onChange={handleChange} /> No
    </div>

    <label>13. Is the patient experiencing chills or rigors?</label>
    <div>
      <input type="radio" name="chills" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="chills" value="no" required onChange={handleChange} /> No
    </div>

    <label>14. Is the patient experiencing a sore throat?</label>
    <div>
      <input type="radio" name="soreThroat" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="soreThroat" value="no" required onChange={handleChange} /> No
    </div>

    <label>15. Does the patient have muscle aches?</label>
    <div>
      <input type="radio" name="aches" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="aches" value="no" required onChange={handleChange} /> No
    </div>

    <label>16. Is the patient experiencing nausea, vomiting, or diarrhea?</label>
    <div>
      <input type="radio" name="nausea" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="nausea" value="no" required onChange={handleChange} /> No
    </div>

    <label>17. Is the patient experiencing severe difficulty breathing?</label>
    <div>
      <input type="radio" name="difficultBreathing" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="difficultBreathing" value="no" required onChange={handleChange} /> No
    </div>

    <label>18. Has the patient fainted or felt dizzy?</label>
    <div>
      <input type="radio" name="dizzy" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="dizzy" value="no" required onChange={handleChange} /> No
    </div>

    <label>19. Is there bluish discoloration of the lips or nails (cyanosis)?</label>
    <div>
      <input type="radio" name="cyanosis" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="cyanosis" value="no" required onChange={handleChange} /> No
    </div>

    <label>20. Does the patient feel chest tightness or heaviness?</label>
    <div>
      <input type="radio" name="tightChest" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="tightChest" value="no" required onChange={handleChange} /> No
    </div>

    <label>21. Does the patient have a history of lung disease?</label>
    <input type="text" name="history" onChange={handleChange} />

    <label>22. Does the patient have a history of heart disease?</label>
    <input type="text" name="historyHeart" onChange={handleChange} />

    <label>23. Does the patient take any medications regularly?</label>
    <input type="text" name="medicationsList" onChange={handleChange} />

    <label>24. Does the patient have known allergies?</label>
    <input type="text" name="allergiesList" onChange={handleChange} />

    <label>25. Does the patient have a history of smoking?</label>
    <div>
      <input type="radio" name="smokes" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="smokes" value="no" required onChange={handleChange} /> No
    </div>

    <label>26. Has the patient been in contact with someone sick or tested positive for COVID-19?</label>
    <div>
      <input type="radio" name="covid" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="covid" value="no" required onChange={handleChange} /> No
    </div>

    <label>27. Has the patient traveled recently?</label>
    <div>
      <input type="radio" name="travelled" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="travelled" value="no" required onChange={handleChange} /> No
    </div>

    <label>28. Is the patient vaccinated for COVID-19, influenza, and pneumonia?</label>
    <div>
      <input type="radio" name="vaccinated" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="vaccinated" value="no" required onChange={handleChange} /> No
    </div>

    <label>29. Does the patient have occupational or environmental exposure to irritants or pollutants?</label>
    <div>
      <input type="radio" name="pollutantExposure" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="pollutantExposure" value="no" required onChange={handleChange} /> No
    </div>

    <label>30. Does the patient drink alcohol or use recreational drugs?</label>
    <div>
      <input type="radio" name="recreational" value="yes" required onChange={handleChange} /> Yes
      <input type="radio" name="recreational" value="no" required onChange={handleChange} /> No
    </div>

    <label>31. When did the symptoms start?</label>
    <input type="date" name="symptomsStartDate" required onChange={handleChange} />

    <label>32. Are the symptoms improving, worsening, or unchanged over time?</label>
    <select name="symptomProgression" required onChange={handleChange}>
      <option value="">Select</option>
      <option value="improving">Improving</option>
      <option value="worsening">Worsening</option>
      <option value="unchanged">Unchanged</option>
    </select>

    <label>33. What type of chest pain does the patient describe (sharp, dull, burning, stabbing)?</label>
<select name="chestPainType" required onChange={handleChange}>
  <option value="">Select</option>
  <option value="sharp">Sharp</option>
  <option value="dull">Dull</option>
  <option value="burning">Burning</option>
  <option value="stabbing">Stabbing</option>
</select>

<label>34. Is the chest pain associated with physical activity, eating, or rest?</label>
<select name="chestPainAssociation" required onChange={handleChange}>
  <option value="">Select</option>
  <option value="physicalActivity">Physical Activity</option>
  <option value="eating">Eating</option>
  <option value="rest">Rest</option>
</select>

<label>35. Does the pain radiate to the arm, back, or jaw?</label>
<select name="painRadiation" required onChange={handleChange}>
  <option value="">Select</option>
  <option value="arm">Arm</option>
  <option value="back">Back</option>
  <option value="jaw">Jaw</option>
  <option value="none">None</option>
</select>

<label>36. Is shortness of breath triggered by exertion, lying down, or at rest?</label>
<select name="shortBreathTrigger" required onChange={handleChange}>
  <option value="">Select</option>
  <option value="exertion">Exertion</option>
  <option value="lyingDown">Lying Down</option>
  <option value="rest">Rest</option>
</select>

<label>37. Does the patient have a history of recurrent lung infections?</label>
<div>
  <input type="radio" name="lungInfections" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="lungInfections" value="no" required onChange={handleChange} /> No
</div>

<label>38. Has the patient recently experienced rapid or irregular heartbeats (palpitations)?</label>
<div>
  <input type="radio" name="palpitations" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="palpitations" value="no" required onChange={handleChange} /> No
</div>

<label>39. Does the patient notice changes in appetite or significant weight loss?</label>
<div>
  <input type="radio" name="weightChange" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="weightChange" value="no" required onChange={handleChange} /> No
</div>

<label>40. Has the patient recently had surgery or been immobilized?</label>
<div>
  <input type="radio" name="surgeryImmobilized" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="surgeryImmobilized" value="no" required onChange={handleChange} /> No
</div>

<label>41. Does the patient experience difficulty breathing while sleeping (orthopnea)?</label>
<div>
  <input type="radio" name="orthopnea" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="orthopnea" value="no" required onChange={handleChange} /> No
</div>

<label>42. Are there any symptoms of night sweats?</label>
<div>
  <input type="radio" name="nightSweats" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="nightSweats" value="no" required onChange={handleChange} /> No
</div>

<label>43. Has the patient experienced hemoptysis (coughing up blood)?</label>
<div>
  <input type="radio" name="hemoptysis" value="yes" required onChange={handleChange} /> Yes
  <input type="radio" name="hemoptysis" value="no" required onChange={handleChange} /> No
</div> */}

        {/* <button type="submit">Analyse</button> */}
      </div>
    </form>
  );
});

export default Questions2;


