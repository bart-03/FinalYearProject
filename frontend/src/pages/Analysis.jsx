import React, { useState, useEffect } from "react";
import "../styles/Analysis.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

const Analysis = () => {
  const [message, setMessage] = useState("");

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const checkHandler1 = () => {
    setChecked1(!checked1);
  };

  const checkHandler2 = () => {
    setChecked2(!checked2);
  };

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
            <></>
            <button className="image-analysis-button">Analyse</button>
            <div></div>
          </div>
          <div className="content"></div>
          <button className="image-analysis-button">Upload</button>
          <select
            className="form-multi-select"
            id="ms1"
            multiple
            data-coreui-search="global"
          >
            <option value="0">Angular</option>
            <option value="1">Bootstrap</option>
            <option value="2">React.js</option>
            <option value="3">Vue.js</option>
            <optgroup label="backend">
              <option value="4">Django</option>
              <option value="5">Laravel</option>
              <option value="6">Node.js</option>
            </optgroup>
          </select>
        </div>
      )}
      {checked2 && !checked1 && <div className="clinical-data">SIGMA BOI</div>}
      {checked1 && checked2 && <div className="iaAndcd">george droid</div>}
    </div>
  );
};

export default Analysis;
