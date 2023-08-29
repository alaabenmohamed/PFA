import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import EditEnseignant from "./ModifierEnseignant";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
type bodytype = {
  setmiseajour: Function;
  miseajour: any;
};

export default function Body({ setmiseajour, miseajour }: bodytype) {
  const [Enseignants, setenseignants] = useState([]);
  const [SelctedEnseignant, setSelctedEnseignant] = useState([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
 const [showupdate, setShowupdate] = useState(false);


   const handleShow = () => {
     setShowupdate(true);
   };
  const getenseignant = async () => {
    try {
      const response = await fetch(`http://localhost:4000/enseignant`);
      setenseignants(await response.json());
        setIsUpdate(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  async function deletenseignant(id: any) {
    try {
      await fetch(`http://localhost:4000/enseignant/${id}`, {
        method: "DELETE",
      });
      setmiseajour(id);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  // useEffect(() => {
  //   getenseignant();
  // }, [miseajour]);

  useEffect(() => {
    getenseignant();
    setIsUpdate(false);
  }, [isUpdate]);
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {Enseignants.map((enseignant: any) => (
            <tr key={enseignant.enseignant_id}>
              <td>{enseignant.nom}</td>
              <td>{enseignant.prenom}</td>
              <td>
                <img
                  alt={enseignant.img}
                  src={enseignant.img}
                  className="rounded-O"
                  style={{ width: "40px" }}
                />
              </td>
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => deletenseignant(enseignant.enseignant_id)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={()=>
                  {
                     setShowupdate(true);
                  }}
                >
                  <AiFillEdit
                    onClick={() => {
                      // setShowupdate(true);
                      setSelctedEnseignant(enseignant);
                    }}
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditEnseignant
        setIsUpdate={setIsUpdate}
        // setmiseajour={setmiseajour}
        show={showupdate}
        setShow={setShowupdate}
        Selectenseignant={SelctedEnseignant}
      />
    </Fragment>
  );
}
