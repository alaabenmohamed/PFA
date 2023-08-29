import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import EditEtudiant from './EditEtudiant';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai';

export default function BodyEtudiant() {
  const [etudiant, setetudiant] = useState([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const location = useLocation();
  const classe_id: any = location.state;
  // console.log('  claase id hahy ', classe_id.from[0]);
  // console.log('  claase id hahy ', classe_id.from[1]);
  localStorage.setItem('idclaaseactuelle', classe_id.from[0]);
  localStorage.setItem('nomclaasseacutelle', classe_id.from[1]);
  const a = parseInt(classe_id.from);
  const [show, setShow] = useState(false);

  const getetudiant = async () => {
    try {
      const response = await fetch('http://localhost:4000/etudiant');
      setetudiant(await response.json());
      setIsUpdate(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  async function deleteetudiant(rr: any) {
    try {
      await fetch(`http://localhost:4000/etudiant/${rr}`, {
        method: 'DELETE'
      });
      setIsUpdate(true);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getetudiant();
    setIsUpdate(false);
  }, [isUpdate]);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Nom Etudiant</th>
            <th>Prenom Etudiant</th>
            <th>Email Etudiant</th>
            {/* <th>Note Controle Continue</th>
            <th>Nombre d'absence</th> */}
          </tr>
        </thead>
        <tbody>
          {etudiant
            .filter((e: any) => e.classe_id === a)
            .map((etudiant: any) => (
              <tr key={etudiant.etudiant_id}>
                <td>{etudiant.nom}</td>
                <td>{etudiant.prenom}</td>
                <td>{etudiant.mail}</td>
                {/* <td>{etudiant.note}</td>
                <td>{etudiant.absence}</td> */}
                <td>
                  <img
                    alt={etudiant.img}
                    src={etudiant.img}
                    className="rounded-O"
                    style={{ width: '40px' }}
                  />
                </td>
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => deleteetudiant(etudiant.etudiant_id)}
                  >
                    <AiOutlineDelete />
                  </Button>
                </td>
                <td>
                  <EditEtudiant
                    // setmiseajour={setmiseajour}
                    etudiantEdit={etudiant}
                    // setIsUpdate={setIsUpdate}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}
