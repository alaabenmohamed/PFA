import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import * as FaIcons from 'react-icons/bs';
import Image from '../../overview/Login/Image';
import React from 'react';
import Swal from 'sweetalert2';
type Inputtype = {
  setmiseajour: Function;
};
export default function InputClasse({ setmiseajour }: Inputtype) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageclient, setImage] = React.useState('');
  const [mdp, setmdp] = useState('');
  const [mail, setmail] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async function insertenseignant(image: string) {
    if (mdp && mail && name && prenom && imageclient) {
      if (re.test(mail)) {
        fetch('http://localhost:4000/enseignant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom: name,
            mdp: mdp,
            mail: mail,
            prenom: prenom,
            img: image,
            admine_id: 1
          })
        });
        setIsUpdate(true);
        setShow(false);
        Swal.fire({
          title: 'Un nouveau produit a été ajouté',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(function () {
          handleClose();
        });
      } else {
        Swal.fire({
          title: ' Cet email est invalide !',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } else {
      Swal.fire({
        title: 'Il est obligatoire de remplir tous les champs !',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  async function RegisterEnseignant() {
    try {
      if (imageclient) {
        var formData = new FormData();
        let img = imageclient;
        for (const i of Object.keys(img)) {
          formData.append('imgCollection', img[i as unknown as number]);
        }
        await fetch(`http://localhost:4000/uploadImage`, {
          body: formData,
          method: 'POST'
        })
          .then((response) => response.json())
          .then((data: any) => {
             setIsUpdate(true);
            insertenseignant(data);
          });
      } else {
        insertenseignant(imageclient);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setIsUpdate(false);
  }, [isUpdate]);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow} style={{ marginTop:"10px"}}>
          Ajouter un Enseignant<FaIcons.BsFillFileEarmarkPostFill />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ajouter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">Nom </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">Prenom </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setPrenom(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">mail </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">mdp</div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setmdp(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className=" bd-highlight mt-3">
                  <Image setImage={setImage} />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={RegisterEnseignant}>
            Close
          </Button>
          <Button variant="primary" onClick={RegisterEnseignant}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
