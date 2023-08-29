import React, { useEffect, useState } from 'react';
import '../style.css';
import Header from './Header';
import { useLocation } from 'react-router';
import BodyEtudiant from './BodyEtudiant';
import InputEtudiant from './InputEtudiant';
function Etudiant() {
  // const [miseajour, setmiseajour] = useState('');

  const location = useLocation();
  const classe_id: any = location.state;
  const a = parseInt(classe_id.from);

  console.log(a);


  return (
    <div className="App">
      <Header />
      <InputEtudiant />
      <BodyEtudiant 
      // setmiseajour={setmiseajour} 
      />
    </div>
  );
}

export default Etudiant;
