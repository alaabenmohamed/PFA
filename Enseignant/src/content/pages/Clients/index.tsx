import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';

import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Input } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';

import './style.css';
import Select from 'react-select';
import Modifier from './ModifierEtudiant';

import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

import { Table } from 'react-bootstrap';

import React from 'react';
import Swal from 'sweetalert2';

export default function DashboardCrypto() {
  const [ListClasses, setListClasses] = useState([]);
  const [remplirCard, setremplirCard] = useState([]);
  const [CardLigneEtudiant, setCardLigneEtudiant] = useState<any>();
  const [miseajour, setmiseajour] = useState('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  // const [Show, setShow] = useState<boolean>(false);
  const [Show, setShow] = useState(false);

  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const [NomClasse, setNomClasse] = useState<any>();
  const [idClasse, setidClasse] = useState<any>();

  const handleClose = () => setShow(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const [note, setnote] = useState<any>();
  const [absence, setabsence] = useState<any>();
  const handleShow = () => {
    setShow(true);
  };

  console.log('id' + localStorage.getItem('userid'));

  const [condition, setCondition] = useState(false);

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <div className="d-flex justify-content-center">
            <h1>Liste de classe {NomClasse} </h1>
          </div>
          <div> L'ENET'COM en {formattedDate}</div>
          <Table bordered className="mt-4">
            <thead>
              <tr>
                <th>Nom </th>
                <th>Prenom</th>
                <th>Note Controle Continue</th>
                <th>Nombre d'absence</th>
              </tr>
            </thead>
            <tbody style={{ color: 'blue' }}>
              {remplirCard
                .filter((e: any) => e.classe_id == idClasse)
                .map((remplirCard: any) => (
                  <tr key={remplirCard.etudiant_id}>
                    <td>{remplirCard.nom}</td>
                    <td>{remplirCard.prenom}</td>
                    <td>{remplirCard.note}</td>
                    <td>{remplirCard.absence}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            PFA : Alaa Ben Mohamed
          </div>
        </div>
      );
    }
  }

  function getlisteclasses() {
    fetch(`http://localhost:4000/classe2/${localStorage.getItem('userid')}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let data: any = [];
          result.forEach((element: any, index: any) => {
            data.push({
              value: element.classe_id,
              label: element.nom
            });
          });

          setListClasses(data);
        },

        (error) => {
          console.log(error);
        }
      );
  }

  async function getetudiant() {
    try {
      await fetch('http://localhost:4000/etudiant')
        .then((response) => response.json())
        .then((data: any) => {
          setremplirCard(data); // permettre à avoir les card
        });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getlisteclasses();
  }, []);
  useEffect(() => {
    getetudiant();
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      getetudiant();
    }, 3000); // 3000 ms = 3 secondes

    return () => {
      // Nettoyage de l'intervalle lorsque le composant est démonté
      clearInterval(interval);
    };
  }, [getetudiant.length]);
  useEffect(() => {
    setabsence(CardLigneEtudiant?.absence);
    setnote(CardLigneEtudiant?.note);
  }, [CardLigneEtudiant?.etudiant_id]);

  const handleButtonClick = () => {
    if (idClasse) {
      setCondition(true);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Il faut choisir un classe ',
        showConfirmButton: false,
        timer: 2300
      });
    }
  };

  let componentRef: any = useRef();

  return (
    <div>
      <div className=" d-flex flex-wrap  Search justify-content-between ">
        <div className="mt-2 mb-2" style={{ width: '270px' }}>
          <Select
            onChange={(e: any) => {
              setNomClasse(e.label); /*Pour récupérer le nom du clt*/
              setidClasse(e.value);
            }}
            options={ListClasses}
            placeholder="Sélectionnez un Classe"
          />
        </div>
      </div>
      <div className="row col-12" style={{ marginLeft: '20px' }}>
        {remplirCard
          .filter((e: any) => e.classe_id == idClasse)
          .map((element: any, index: number) => {
            return (
              <div className=" col-lg-4 col-xl-3 col-md-6 ml-0 col-sm-12 col-xs-12 my-2">
                <div className="card">
                  <div className="card-body">
                    <img
                      src={element.img}
                      style={{ width: '200px', height: '200px' }}
                      className="card-img-top"
                      alt="Card image cap"
                    />
                    <h5 className="card-title">nom : {element.nom}</h5>
                    <p className="card-title"> Prenom : {element.prenom}</p>
                    <p className="card-text"> Email : {element.mail}</p>

                    <p className="card-text"> Note_CC: {element.note} </p>
                    <p className="card-text">
                      {' '}
                      Nombre d'absence : {element.absence}
                    </p>

                    <div className="d-flex justify-content-center">
                      <Button
                        style={{ width: '50%' }}
                        onClick={() => {
                          setCardLigneEtudiant(element);
                          /// permetre d'avoir chaque ligne de tablaux etudiant
                          handleShow(); // permetre d'avoir modale[+1-]
                        }}
                      >
                        modifier
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <Modifier
          setIsUpdate={setIsUpdate}
          remplirCard={remplirCard}
          setShow={setShow}
          show={Show}
          CardLigneEtudiant={CardLigneEtudiant}
          setmiseajour={setmiseajour}
          miseajour={miseajour}
          note={note}
          absence={absence}
          setabsence={setabsence}
          setnote={setnote}
        />
        <Modal.Footer>
          <ReactToPrint
            trigger={
              () => (
                <Button
                  style={{ marginRight: '15px' }}
                  type="button"
                  className="btn btn-success mb-2"
                  //onclick ne marche pas  dpnc on utilise par exemple  "onMouseDown" pour resoudre probleme
                  onMouseDown={handleButtonClick}
                >
                  Imprimer
                </Button>
              )
              //<Button>Imprimer</Button>
            }
            content={() => componentRef}
          />
          {condition && (
            <div style={{ display: 'none' }}>
              <ComponentToPrint ref={(el) => (componentRef = el)} />
            </div>
          )}
        </Modal.Footer>
      </div>
    </div>
  );
}
