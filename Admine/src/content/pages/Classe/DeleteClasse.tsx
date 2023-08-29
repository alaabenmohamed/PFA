import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type Deleteclasse = {
  selectedFamille: any;
  show: boolean;
  setShow: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteClasse({
  show,
  selectedFamille,
  setShow,
  setIsUpdate
}: Deleteclasse) {
  const handleClose = () => setShow(false);

  async function deleteUser() {
    try {
      await fetch(`http://localhost:4000/classe/${selectedFamille.classe_id}`, {
        method: 'delete'
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: 'Le  classe a été supprimé !',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(function () {
            setIsUpdate(true);
            handleClose();
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Supprimer un Classe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous supprimer cette classe avec cet nom : "
        {selectedFamille?.nom}"
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outlined"
          type="button"
          onClick={handleClose}
          style={{ marginRight: '20px' }}
        >
          Annuler
        </Button>
        <Button variant="contained" type="button" onClick={deleteUser}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteClasse;
