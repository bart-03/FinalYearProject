import React, { useState, useEffect } from "react";
import "../styles/Report.css";


// const questions = [
//     { id: 1, text: "What is the patient’s age?", },
//     { id: 2, text: "What is the patient’s sex?", },
//     { id: 3, text: "What is the patient’s weight? (in kg)",  },
//     { id: 4, text: "What is the patient’s height? (in cm)", },
//     { id: 5, text: "Does the patient have a fever?",  },
//     { id: 6, text: "Is the patient experiencing a cough?", },
//     {
//       id: 7,
//       text: "If productive, what is the color of the sputum?",
      
//     },
//     {
//       id: 8,
//       text: "Is the patient experiencing shortness of breath?",
      
//     },
//     { id: 9, text: "Does the patient have chest pain?", },
//     { id: 10, text: "Does the patient have wheezing?",  },
//     {
//       id: 11,
//       text: "Has the patient experienced loss of smell or taste?",
      
//     },
//     {
//       id: 12,
//       text: "Does the patient have fatigue or weakness?",
      
//     },
//     {
//       id: 13,
//       text: "Is the patient experiencing chills or rigors?",
      
//     },
//     {
//       id: 14,
//       text: "Is the patient experiencing a sore throat?",
      
//     },
//     { id: 15, text: "Does the patient have muscle aches?", },
//     {
//       id: 16,
//       text: "Is the patient experiencing nausea, vomiting, or diarrhea?",
      
//     },
//     {
//       id: 17,
//       text: "Is the patient experiencing severe difficulty breathing?",
      
//     },
//     { id: 18, text: "Has the patient fainted or felt dizzy?",  },
//     {
//       id: 19,
//       text: "Is there bluish discoloration of the lips or nails (cyanosis)?",
      
//     },
//     {
//       id: 20,
//       text: "Does the patient feel chest tightness or heaviness?",
      
//     },
//     {
//       id: 21,
//       text: "Does the patient have a history of lung disease?",
      
//     },
//     {
//       id: 22,
//       text: "Does the patient have a history of heart disease?",
      
//     },
//     {
//       id: 23,
//       text: "Does the patient take any medications regularly? (Please list)",
      
//     },
//     {
//       id: 24,
//       text: "Does the patient have known allergies? (Please List)",
      
//     },
//     {
//       id: 25,
//       text: "Does the patient have a history of smoking?",
      
//     },
//     {
//       id: 26,
//       text: "Has the patient been in contact with someone sick or tested positive for COVID-19?",
      
//     },
//     { id: 27, text: "Has the patient traveled recently?",  },
//     {
//       id: 28,
//       text: "Is the patient vaccinated for COVID-19, influenza, and pneumonia?",
      
//     },
//     {
//       id: 29,
//       text: "Does the patient have occupational or environmental exposure to irritants or pollutants?",
//       type: "checkbox",
//     },
//     {
//       id: 30,
//       text: "Does the patient drink alcohol or use recreational drugs?",
      
//     },
//     { id: 31, text: "When did the symptoms start? (dd/mm/yyyy)" },
//     {
//       id: 32,
//       text: "Are the symptoms improving, worsening, or unchanged over time? (type 'improving' or 'worsening')",
      
//     },
//   ];

const Questions2 = () => { 

return(

    // <form>
    // <div className="cd-report-qeustions">
    // <label className="cd-label-report">{questions[0].text}</label>    
    // <label >{questions[1].text}</label> 
    // <label>{questions[2].text}</label>
    // <label>{questions[3].text}</label>
    // <label>{questions[4].text}</label>
    // <label>{questions[5].text}</label>
    // <label>{questions[6].text}</label>
    // <label>{questions[7].text}</label>
    // <label>{questions[8].text}</label>
    // <label>{questions[9].text}</label>
    // <label>{questions[10].text}</label>
    // <label>{questions[11].text}</label>
    // <label>{questions[12].text}</label>
    // <label>{questions[13].text}</label>
    // <label>{questions[14].text}</label>
    // <label>{questions[15].text}</label>
    // <label>{questions[16].text}</label>
    // <label>{questions[17].text}</label>
    // <label>{questions[18].text}</label>
    // <label>{questions[19].text}</label>
    // <label>{questions[20].text}</label>
    // <label>{questions[21].text}</label>
    // <label>{questions[22].text}</label>
    // <label>{questions[23].text}</label>
    // <label>{questions[24].text}</label>
    // <label>{questions[25].text}</label>
    // <label>{questions[26].text}</label>
    // <label>{questions[27].text}</label>
    // <label>{questions[28].text}</label>
    // <label>{questions[29].text}</label>
    // <label>{questions[30].text}</label>
    // <label>{questions[31].text}</label>
    // </div>
    // </form>

    <form>
  <div className="cd-report-questions" >
    <label className="cd-label-report">What is the patient’s age?</label>
    <input type="number" name="patientAge" />

    <label>What is the patient’s sex?</label>
    <input type="text" name="patientSex" />

    <label>What is the patient’s weight? (in kg)</label>
    <input type="number" name="patientWeight" />

    <label>What is the patient’s height? (in cm)</label>
    <input type="number" name="patientHeight" />

    <label>Does the patient have a fever?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient experiencing a cough?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>If productive, what is the color of the sputum?</label>
    <input type="text" name="sputumColor" />

    <label>Is the patient experiencing shortness of breath?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have chest pain?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have wheezing?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Has the patient experienced loss of smell or taste?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have fatigue or weakness?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient experiencing chills or rigors?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient experiencing a sore throat?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have muscle aches?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient experiencing nausea, vomiting, or diarrhea?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient experiencing severe difficulty breathing?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Has the patient fainted or felt dizzy?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is there bluish discoloration of the lips or nails (cyanosis)?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient feel chest tightness or heaviness?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have a history of lung disease?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have a history of heart disease?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient take any medications regularly? (Please list)</label>
    <input type="text" name="medicationsList" />

    <label>Does the patient have known allergies? (Please list)</label>
    <input type="text" name="allergiesList" />

    <label>Does the patient have a history of smoking?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Has the patient been in contact with someone sick or tested positive for COVID-19?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Has the patient traveled recently?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Is the patient vaccinated for COVID-19, influenza, and pneumonia?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>Does the patient have occupational or environmental exposure to irritants or pollutants?</label>
    <input type="checkbox" name="pollutantExposure" />

    <label>Does the patient drink alcohol or use recreational drugs?</label>
    <div>
    <input type="radio" name="patientFever" value="yes" /> Yes
    <input type="radio" name="patientFever" value="no" /> No
    </div>

    <label>When did the symptoms start? (dd/mm/yyyy)</label>
    <input type="text" name="symptomsStartDate" />

    <label>Are the symptoms improving, worsening, or unchanged over time? (type 'improving' or 'worsening')</label>
    <input type="text" name="symptomProgression" />
  </div>
</form>

 
);

};

export default Questions2;