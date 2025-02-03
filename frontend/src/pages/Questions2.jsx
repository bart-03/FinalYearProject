import React, { useState, useEffect } from "react";
import "../styles/Report.css";


const questions = [
    { id: 1, text: "What is the patient’s age?", type: "input" },
    { id: 2, text: "What is the patient’s sex?", type: "input" },
    { id: 3, text: "What is the patient’s weight? (in kg)", type: "input" },
    { id: 4, text: "What is the patient’s height? (in cm)", type: "input" },
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
    { id: 18, text: "Has the patient fainted or felt dizzy?", type: "checkbox" },
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
    { id: 31, text: "When did the symptoms start? (dd/mm/yyyy)", type: "input" },
    {
      id: 32,
      text: "Are the symptoms improving, worsening, or unchanged over time? (type 'improving' or 'worsening')",
      type: "input",
    },
  ];

const Questions2 = () => { 

return(

    <form>
    <div className="cd-report-qeustions">
    <label>{questions[0].text}</label>
    <label>{questions[1].text}</label>
    <label>{questions[2].text}</label>
    <label>{questions[3].text}</label>
    <label>{questions[4].text}</label>
    <label>{questions[5].text}</label>
    <label>{questions[6].text}</label>
    <label>{questions[7].text}</label>
    <label>{questions[8].text}</label>
    <label>{questions[9].text}</label>
    <label>{questions[10].text}</label>
    <label>{questions[11].text}</label>
    <label>{questions[12].text}</label>
    <label>{questions[13].text}</label>
    <label>{questions[14].text}</label>
    <label>{questions[15].text}</label>
    <label>{questions[16].text}</label>
    <label>{questions[17].text}</label>
    <label>{questions[18].text}</label>
    <label>{questions[19].text}</label>
    <label>{questions[20].text}</label>
    <label>{questions[21].text}</label>
    <label>{questions[22].text}</label>
    <label>{questions[23].text}</label>
    <label>{questions[24].text}</label>
    <label>{questions[25].text}</label>
    <label>{questions[26].text}</label>
    <label>{questions[27].text}</label>
    <label>{questions[28].text}</label>
    <label>{questions[29].text}</label>
    <label>{questions[30].text}</label>
    <label>{questions[31].text}</label>
    </div>

    <div className="cd-report-inputs">
    <input type="number"></input>
    
    <input type="radio"></input>
    <input type="radio"></input>
    
    <input type="number"></input>
    <input type="number"></input>
    <input type='number'></input>
   
    <input type="radio"></input>
    <input type="radio"></input>
    
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <input></input>

    </div>
  
   
    </form>
 
);

};

export default Questions2;