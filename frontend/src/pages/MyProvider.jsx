import React, { useState, useEffect } from "react";
import { MyContext } from "./MyContext";

export const MyProvider = ({ children }) => {
  const [navbarValue, setNavbarValue] = useState("Default Value");
  const [cdResponse, setCDResponse] = useState(null);
  const [undefinedData, setUndefined] = useState(null);
  const [setreportQandAs, setReportQandAsYuh] = useState(null);
 


  useEffect(() => {
    setNavbarValue(false);
  }, []);

  
  return (
    <MyContext.Provider
      value={{ navbarValue, setNavbarValue, cdResponse, setCDResponse,  undefinedData, setUndefined , setreportQandAs, setReportQandAsYuh}}
    >
      {children}
    </MyContext.Provider>
  );
};
