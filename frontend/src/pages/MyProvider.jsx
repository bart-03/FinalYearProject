// import React, { useState, useEffect } from "react";
// import { MyContext } from "./MyContext";

// export const MyProvider = ({ children }) => {
//   const [navbarValue, setNavbarValue] = useState("Default Value");

//   useEffect(() => {
//     setNavbarValue(false); // Default state
//   }, []);

//   return (
//     <MyContext.Provider value={{ navbarValue, setNavbarValue }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

import React, { useState, useEffect } from "react";
import { MyContext } from "./MyContext";


export const MyProvider = ({ children }) => {
  const [navbarValue, setNavbarValue] = useState("Default Value");
  const [cdResponse, setCDResponse] = useState(null);

  useEffect(() => {
    setNavbarValue(false); // Default state
  }, []);

  return (
    <MyContext.Provider value={{ navbarValue, setNavbarValue, cdResponse, setCDResponse }}>
      {children}
    </MyContext.Provider>
  );
};
