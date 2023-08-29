import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import IconButton from '@mui/material/IconButton';
import { Container, Input } from 'reactstrap';
import AddchartIcon from '@mui/icons-material/Addchart';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import SelectBoutique from "./SelectBoutique";
// import ModifierFamille from "./ModifierFamille";
// import DeleteFamille from "./DeleteFamille";
// import AddFamille from "./AddFamille";
import Select from 'react-select';
import ModifierClasse from './ModifierClasse';
import AddClasse from './AddClasse';
import DeleteClasse from './DeleteClasse';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
export default function DashboardCrypto() {
  const [listclasses, setlistclasses] = useState([]);

  const [NomEnseignant, setNomEnseignant] = useState<any>();
  const [idenseignant, setidenseignant] = useState<any>();
  const [listeEnseignant, setlisteEnseignant] = useState<any>();
  const [selectedFamille, setselectedFamille] = useState<any>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [search, setSearch] = useState<any>('');
  const [showadd, setShowadd] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedClasse, setselectedClasse] = useState<any>();


  function getEnseignants() {
    fetch(`http://localhost:4000/enseignant`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let data: any = [];
          result.forEach((element: any, index: any) => {
            data.push({
              value: element.enseignant_id,
              label: element.nom
            });
          });

          setlisteEnseignant(data);
        },

        (error) => {
          console.log(error);
        }
      );
  }

  async function listeclasses() {
    try {
      await fetch(`http://localhost:4000/classe`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((data) => {
          setlistclasses(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchterm = (e: any) => {
    // pour la recherche
    setSearch(e.target.value);
  };

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const filteredData = listclasses.filter((e: any) => {
    if (!idenseignant) {
      // Si aucune option n'est sélectionnée, retourner tous les éléments
      return true;
    } else {
      // Filtre basé sur la condition du select

      return e.enseignant_id === idenseignant;
    }
  });

  useEffect(() => {
    listeclasses();
    getEnseignants();
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    listeclasses();
  }, [idenseignant]);

  return (
    <>
      {/* <Helmet>
        <title>Classes</title>
      </Helmet> */}
      <div className="d-flex justify-content-center">
        <div
          className="mt-2 mb-2"
          style={{ width: '270px', marginRight: '10px' }}
        >
          <Select
            onChange={(e: any) => {
              setNomEnseignant(e.label); /*Pour récupérer le nom du clt*/
              setidenseignant(e.value);
            }}
            options={listeEnseignant}
            placeholder="Sélectionner un Enseignant"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end px-4">
        <IconButton aria-label="add to favorites">
          <AddchartIcon
            onClick={() => {
              setShowadd(true);
              // setidenseignant(0);
            }}
            style={{ color: '#5f72ff' }}
          />
        </IconButton>
      </div>
      <Container maxWidth="lg">
        <Fragment>
          <table className="table mt-5 text-center">
            <thead>
              <tr>
                <th>Classe</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((classe: any) => (
                <tr key={classe.classe_id}>
                  <td>
                    <Link
                      // to={'/dashboards/Etudiant'}
                      to={'/Classes/Etudiant'}
                      state={{
                        from: [classe.classe_id.toString(), classe.nom]
                      }}
                    >
                      {classe.nom}
                    </Link>
                  </td>
                  <td>
                    <Button className="btn btn-danger">
                      <AiOutlineDelete
                        onClick={() => {
                          setShowdelete(true);
                          setselectedClasse(classe);
                        }}
                      />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      // className="btn btn-danger"
                    >
                      <AiFillEdit
                        // setmiseajour={setmiseajour}
                        // classeEdit={classe}
                        onClick={() => {
                          setShowupdate(true);
                          setselectedClasse(classe);
                        }}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
        <ModifierClasse
          selectedClasse={selectedClasse}
          show={showupdate}
          setShow={setShowupdate}
          setIsUpdate={setIsUpdate}
        />
        <AddClasse
          idenseignant={idenseignant}
          listeEnseignant={listeEnseignant}
          setidenseignant={setidenseignant}
          setNomEnseignant={setNomEnseignant}
          show={showadd}
          setShow={setShowadd}
          setIsUpdate={setIsUpdate}
        />
        <DeleteClasse
          selectedFamille={selectedClasse}
          show={showdelete}
          setShow={setShowdelete}
          setIsUpdate={setIsUpdate}
        />
      </Container>
    </>
  );
}
