import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormGroup, Input, Label } from 'reactstrap';
import Image from '../../overview/Login/Image';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type Modifierclasse = {
  selectedClasse: any;
  show: boolean;
  setShow: Function;
 
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModifierClasse({
  selectedClasse,
  show,
  setShow,
  setIsUpdate
}: Modifierclasse) {
  const [Classe, setClasse] = useState(selectedClasse);
  const [imageboutique, setImage] = useState();
  const handleClose = () => setShow(false);

  async function modifierBoutique() {
   
    await fetch(
      `http://localhost:4000/classe/${selectedClasse.classe_id}`,
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Classe)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data ' + data);
        setIsUpdate(true);
        setImage(Classe.img);
      });

    if (
      selectedClasse.nom !== Classe.nom
    ) {
   
      Swal.fire({
        title: 'Les coordonnées de boutique ont  été modifié !',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      handleClose();
    } else {
      Swal.fire({
        title: 'Il est obligatoire de modifier le nom!',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }


  useEffect(() => {
    setClasse(selectedClasse); 
  }, [selectedClasse]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <div className="justify-content-center">
          <Modal.Title>Modifier Nom de Classe</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="bd-highlight">
            <FormGroup>
              <Label
                className="box1"
                for="exampleNom"
                style={{ color: '#070f1b' }}
              >
                Nom
              </Label>
              <Input
                className="box"
                id="exampleNom"
                name="Nom"
                placeholder="Nom"
                value={Classe?.nom}
                onChange={(event: any) => {
                  setClasse({
                    ...Classe,
                    nom: event.target.value
                  });
                }}
              />
            </FormGroup>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outlined"
          type="button"
          onClick={() => {
            handleClose();
          }}
          style={{ marginRight: '10px' }}
        >
          Annuler
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            modifierBoutique();
          }}
        >
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
