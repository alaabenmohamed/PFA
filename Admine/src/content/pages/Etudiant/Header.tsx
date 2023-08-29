import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const classe_id: any = location.state;
  console.log('  claase id hahy ', classe_id);
  const a = parseInt(classe_id.from);
  return (
    <div>
      <h1 style={{ marginTop :"15px"}}>classe:{' '}{classe_id.from[1]}</h1>
    </div>
  );
}

export default Header;
