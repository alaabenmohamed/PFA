import React, { useState } from "react";
// import "../style.css";
import Header from "./Header";
import Body from "./Body";
import InputClasse from "./InputEnseignant";
import { url } from "inspector";
import background from "./ee.jpg";

function Enseignant() {
  const [miseajour, setmiseajour] = useState("");
  return (
    <div
      className="App"
    >
      <Header />
      <InputClasse setmiseajour={setmiseajour} />
      <Body setmiseajour={setmiseajour} miseajour={miseajour} />
    </div>
  );
}

export default Enseignant;
