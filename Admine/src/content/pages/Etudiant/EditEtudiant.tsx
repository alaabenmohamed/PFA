import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';

type Edittyle = {
  etudiantEdit: any;
};
function EditEtudiant({ etudiantEdit }: Edittyle) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nome, setnome] = useState(etudiantEdit.nom);
  const [prenome, setprenome] = useState(etudiantEdit.prenom);
  const [emaile, setemaile] = useState(etudiantEdit.mail);
  async function updateetudiant() {
    // let etudiant = {
    //   nom: nome,
    //   prenom: prenome,
    //   mail: emaile
    // };
    if (
      etudiantEdit.nom != nome ||
      etudiantEdit.prenom != prenome ||
      etudiantEdit.mail != emaile
    ) {
      console.log('etudiantEdit' + etudiantEdit.nom);
      console.log('nome' + nome);

      try {
        await fetch(
          `http://localhost:4000/etudiantadmine/${etudiantEdit.etudiant_id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nom: nome,
              prenom: prenome,
              mail: emaile
            })
          }
        );
              Swal.fire({
                // title: 'Votre profil est modifié!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
              });
        //setmiseajour(etudiantEdit.etudiant_id);
        setShow(false);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      Swal.fire({
        title: 'Il faut modifier au moins un champ !',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <AiFillEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>modifie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            value={nome}
            className="form-control mt-2"
            onChange={(e: any) => {
              setnome(e.target.value);
            }}
          />
          <Input
            type="text"
            value={prenome}
            className="form-control mt-2"
            onChange={(e: any) => {
              setprenome(e.target.value);
            }}
          />
          <Input
            type="text"
            value={emaile}
            className="form-control mt-2"
            onChange={(e: any) => {
              setemaile(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateetudiant();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEtudiant;
