import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import Image from '../../overview/Login/Image';
import SelectEnseignant from './SelectEnseignant';

type deleteproduit = {
  show: boolean;
  listeEnseignant: any;
  setShow: Function;
  setNomEnseignant: any;
  setidenseignant: any;
  idenseignant: any;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddClasse({
  show,
  setNomEnseignant,
  setidenseignant,
  listeEnseignant,
  idenseignant,
  setShow,
  setIsUpdate
}: deleteproduit) {
  const handleShow = () => setShow(true);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [imagefamille, setImage] = useState('');
  const [NomBoutique, setNomBoutique] = useState<any>();

  const [listeBoutiques, setlisteBoutiques] = useState<any>();
  let imageProfile = 'http://localhost:8000/product.png';

  const handleClose = () => {
    setNom('');
    setImage('');
    setDescription('');
    setShow(false);
  };

  function getClients() {
    fetch(`http://localhost:4000/classe/`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let data: any = [];
          result.forEach((element: any, index: any) => {
            data.push({
              value: element.boutique_id,
              label: element.nom
            });
          });

          setlisteBoutiques(data);
        },

        (error) => {
          console.log(error);
        }
      );
  }

  function addclasse() {
    if (idenseignant) {
      fetch(`http://localhost:4000/classe`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: nom,
          enseignant_id: idenseignant
        })
      })
        .then((response) => response.json())
        .then((data) => {
          setIsUpdate(true);
          setidenseignant(0);
          Swal.fire({
            title: 'Un nouveau classe a été ajouté',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(function () {
            handleClose();
          });
        });
    } else {
      Swal.fire({
        title: 'Il est obligatoire de choisir un Enseignant!',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }


  useEffect(() => {
    getClients();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un Classe</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <div className="d-flex flex-column bd-highlight ">
          <div className=" bd-highlight ">
            <SelectEnseignant
              setidBoutique={setidenseignant}
              setNomBoutique={setNomEnseignant}
              listeBoutiques={listeEnseignant}
            />
            <TextField
              style={{ width: '370px' }}
              sx={{ mt: 6, mb: 1 }}
              id="outlined-nom-input"
              label="Nom Classe"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setNom(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="outlined"
          onClick={handleClose}
          style={{ marginRight: '20px' }}
        >
          Annuler
        </Button>
        <Button type="button" variant="contained" onClick={addclasse}>
          Ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddClasse;
