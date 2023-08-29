import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router';

type souscommandtype = {
  remplirCard: any;
  setShow: Function; //permetre de ferme le modale et d'envayer a remplir commande
  show: boolean;
  CardLigneEtudiant: any;
  setmiseajour: Function;

  miseajour: any;
  setIsUpdate: Function;
    note :any,
    absence : any,
    setabsence :Function,
    setnote :Function,
};

function Modifier({
  remplirCard,
  setShow,
  show,
  CardLigneEtudiant,
  setmiseajour,
  miseajour,
  setIsUpdate,
    note,
   absence,
  setabsence,
   setnote,
}: //   note,
//   absence,
//   setabsence,
//   setnote,
//remplirCard

souscommandtype) {
  const location = useLocation();

  // const [note, setnote] = useState(CardLigneEtudiant?.note);
  // const [absence, setabsence] = useState(CardLigneEtudiant?.absence);
  const handleClose = () => {
    // setnote(0);
    // setabsence(0);
    setShow(false); //permetre de ferme le modale et d'envayer a remplir commande
  };

  let decNum = () => {
    if (absence > 0) {
      setabsence(absence - 1);
    }
  };
  let incNum = () => {
    setabsence(Number(absence) + 1);
  };
  let decNum1 = () => {
    if (note > 0) {
      setnote(note - 1);
    }
  };
  let incNum1 = () => {
    setnote(Number(note) + 1);
  };

  async function modifier() {
    let etudiant = {
      note: note,
      absence: absence
    };
    try {
      await fetch(
        `http://localhost:4000/etudiantprof/${CardLigneEtudiant.etudiant_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({
          //   note: note,
          //   absence: absence
          // })
            body: JSON.stringify(etudiant)
        }
      );
      //setmiseajour(CardLigneEtudiant.etudiant_id);
      setIsUpdate(true);
      console.log('idcomparaison', CardLigneEtudiant.etudiant_id);
      setShow(false);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>PLUS DES INFORMATIONS</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Modal.Body className="d-flex justify-content-center align-self-center">
          {/* <div className="modal-body"> */}
          <form>
            <div className="mb-3">
              <label className="col-form-label">Note_CC : </label>
              <div className="d-flex justify-content-center">
                <Button
                  onClick={decNum1}
                  style={{ width: '45px', backgroundColor: 'red' }}
                  className=" mx-2"
                >
                  -
                </Button>
                <Input
                  type="text"
                   style={{ width: '45px', textAlign: 'center' }}
                  value={note}
                  onChange={(e: any) => {
                    setnote(e.target.value);
                  }}
                />
                <Button
                  onClick={incNum1}
                  style={{ width: '45px' }}
                  className=" mx-2"
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <label className="col-form-label ">Nombre d'absence : </label>
              <div className="d-flex justify-content-center">
                <Button
                  onClick={decNum}
                  style={{ width: '45px', backgroundColor: 'red' }}
                  className=" mx-2"
                >
                  -
                </Button>
                <Input
                  style={{ width: '45px', textAlign: 'center' }}
                  value={absence}
                  onChange={(e: any) => {
                    setabsence(e.target.value);
                  }}
                />
                <Button
                  onClick={incNum}
                  style={{ width: '45px' }}
                  className=" mx-2"
                >
                  +
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal.Footer>
      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            modifier();
            handleClose();
          }}
        >
          Save changes
        </Button>
      </div>
    </Modal>
  );
}
export default Modifier;
