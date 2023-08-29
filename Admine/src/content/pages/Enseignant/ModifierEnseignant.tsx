import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { FormGroup, Input, Label } from "reactstrap";
import Image from "../../overview/Login/Image";
import Swal from "sweetalert2";
type Edittyle = {
  show: boolean;
  Selectenseignant: any;
  setShow: Function;
  // setmiseajour: Function;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
function EditEnseignant({
  Selectenseignant,
  show,
  setShow,
  //  setmiseajour,
  setIsUpdate,
}: Edittyle) {
  // const [show, setShow] = useState(false);
  const [Enseignant, setEnseignant] = useState(Selectenseignant);
  // const handleClose = () => setShow(false);
  //  const handleShow = () => setShow(true);
  const [imageboutique, setImage] = useState();
  const handleClose = () => setShow(false);
  async function modifier(image: any) {
    Enseignant.img = image;
    // console.log("a");
    // console.log("Selectenseignant" + Selectenseignant.enseignant_id);
    await fetch(
      `http://localhost:4000/enseignant/${Selectenseignant.enseignant_id}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Enseignant),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data" + data);
        setIsUpdate(true);
        setImage(Enseignant.img);
      });

    if (
      Selectenseignant.nom !== Enseignant.nom ||
      Selectenseignant.img !== imageboutique ||
      Selectenseignant.prenom !== Enseignant.prenom ||
      Selectenseignant.mail !== Enseignant.mail ||
      Selectenseignant.mdp !== Enseignant.mdp
    ) {
      Swal.fire({
        title: "Les coordonnées de boutique ont  été modifié !",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
    } else {
      Swal.fire({
        title: "Il est obligatoire de modifier au moins un champs!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  }

  async function ModifierImage() {
    try {
      if (imageboutique !== Enseignant.img) {
        var formData = new FormData();
        let img: any = imageboutique;
        for (const i of Object.keys(img)) {
          formData.append("imgCollection", img[i as unknown as number]);
        }
        await fetch(`http://localhost:4000/uploadImage`, {
          body: formData,
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            modifier(data);
          });
      } else {
        modifier(imageboutique);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setEnseignant(Selectenseignant);
    setImage(Selectenseignant?.img);
  }, [Selectenseignant]);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header 
        // closeButton onClick={handleClose}
        >
          <div className="justify-content-center">
            <Modal.Title>Modifier une famille</Modal.Title>
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
                  value={Enseignant?.nom}
                  onChange={(event: any) => {
                    setEnseignant({
                      ...Enseignant,
                      nom: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>

            <div className="bd-highlight">
              <FormGroup>
                <Label
                  className="box1"
                  for="exampledescription"
                  style={{ color: '#070f1b' }}
                >
                  Prenom{' '}
                </Label>
                <Input
                  className="box"
                  id="exampleDescription"
                  name="Description"
                  placeholder="Description"
                  value={Enseignant?.prenom}
                  onChange={(event: any) => {
                    setEnseignant({
                      ...Enseignant,
                      prenom: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>
            <div className="bd-highlight">
              <FormGroup>
                <Label
                  className="box1"
                  for="exampledescription"
                  style={{ color: '#070f1b' }}
                >
                  Email{' '}
                </Label>
                <Input
                  className="box"
                  id="exampleDescription"
                  name="Description"
                  placeholder="Description"
                  value={Enseignant?.mail}
                  onChange={(event: any) => {
                    setEnseignant({
                      ...Enseignant,
                      mail: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>
            <div className="bd-highlight">
              <FormGroup>
                <Label
                  className="box1"
                  for="exampledescription"
                  style={{ color: '#070f1b' }}
                >
                  mot de passe{' '}
                </Label>
                <Input
                  className="box"
                  id="exampleDescription"
                  name="Description"
                  placeholder="Description"
                  value={Enseignant?.mdp}
                  onChange={(event: any) => {
                    setEnseignant({
                      ...Enseignant,
                      mdp: event.target.value
                    });
                  }}
                />
              </FormGroup>
            </div>
            <div className=" bd-highlight mt-3">
              <Image setImage={setImage} images={Selectenseignant?.img} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
            style={{ marginRight: '20px' }}
          >
            Annuler
          </Button>
          <Button
            // type="button"
            variant="primary"
            onClick={() => {
              ModifierImage();
            }}
          >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditEnseignant;
