import React from 'react';
import Image from './Image';
import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/bs';
import Swal from 'sweetalert2';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function InputEtudiant() {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [imageEtudiant, setImage] = React.useState('');
  const [nom, setnome] = React.useState('');
  const [prenom, setprenome] = React.useState('');
  const [mail, setemaile] = React.useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const classe_id: any = location.state;
  console.log('  claase id hahy ', classe_id);
  const a = parseInt(classe_id.from);

  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  async function insertetudiant(image: String) {
    if (nom && prenom && mail && imageEtudiant) {
      if (re.test(mail)) {
        await fetch('http://localhost:4000/etudiant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            mail: mail,
            img: image,
             note : 0,
             absence :0 ,
            classe_id: a
          })
        }).then(() => {
          setIsUpdate(true);
          setShow(false);
        });
        Swal.fire({
          title: 'Un nouveau etudiant a été ajouté',
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
        title: 'Il faut remplir tous les champs',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async function RegisterClient() {
    try {
      if (imageEtudiant) {
        var formData = new FormData();
        let img = imageEtudiant;
        for (const i of Object.keys(img)) {
          formData.append('imgCollection', img[i as unknown as number]);
        }
        await fetch(`http://localhost:4000/uploadImage`, {
          body: formData,
          method: 'POST'
        })
          .then((response) => response.json())
          .then((data: any) => {
            insertetudiant(data);
          });
      } else {
        insertetudiant(imageEtudiant);
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
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginTop: '10px' }}
      >
        Ajouter Etudiant <AiOutlineUserAdd />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ajouter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">
                    Nom Etudiant :{' '}
                  </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setnome(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 bd-highlight">
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">Prenom: </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setprenome(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 bd-highlight">
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">Email: </div>

                  <div className="p-2 bd-highlight">
                    <Input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => {
                        setemaile(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-2 bd-highlight">
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">Image: </div>

                  <div className="p-2 bd-highlight">
                    <Image setImage={setImage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              RegisterClient();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
