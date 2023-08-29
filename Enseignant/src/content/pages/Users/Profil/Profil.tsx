import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';
import Swal from 'sweetalert2';
import Image from '../../../overview/Login/Image';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';

type profiletype = {
  setpdate: Function;
};

function Feed({ setpdate }: profiletype) {
  const navigate = useNavigate();
  const a = localStorage.getItem('userid');
  const [Enseignant, setEnseignant] = useState([]);
  const [imageFamille, setImage] = useState();
  const [imageProfile, setImageProfile] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('image')))
  );
  const [prenom, setPrenom] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('prenom')))
  );
  const [nom, setNom] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('nom')))
  );
  const [nom1, setNom1] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('nom')))
  );
  const [prenom1, setPrenom1] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('nom')))
  );
  const [password, setpassword] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('mdp')))
  );

  const [password1, setpassword1] = useState(
    JSON.parse(JSON.stringify(localStorage.getItem('mdp')))
  );

  async function enseignant() {
    try {
      await fetch(`http://localhost:4000/enseignant/${a}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => {
          setEnseignant(data);
          console.log(Enseignant[0].img);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function ModifierImageuser(image: any) {
    console.log(nom1);
    console.log('imgjedida' + localStorage.getItem('image'));
    console.log('imgkedima' + Enseignant[0].img);

    // imageFamille = image;
    if (
      Enseignant[0].nom != nom ||
      Enseignant[0].prenom != prenom ||
      Enseignant[0].mdp != password ||
      Enseignant[0].img != imageProfile
    ) {
      try {
        await fetch(`http://localhost:4000/enseignant/${a}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            img: image,
            mdp: password,
            admine_id: localStorage.getItem('userid'),
            mail: localStorage.getItem('mail')
          })
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.removeItem('image');
            localStorage.removeItem('nom');
            localStorage.removeItem('prenom');
            localStorage.removeItem('mdp');
            localStorage.setItem('image', image);
            localStorage.setItem('nom', nom);
            localStorage.setItem('prenom', prenom);
            localStorage.setItem('mdp', password);
            setpdate(true);
            Swal.fire({
              title: 'Votre profil est modifié!',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
            });
             navigate('/dashboards/profile/details');
               setTimeout(() => {
                 window.location.reload();
               }, 1000);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: 'Il faut modifier au moins un champ !',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }




  async function Modifier() {
    try {
      if (
        imageProfile !=
        JSON.parse(JSON.stringify(localStorage.getItem('image')))
      ) {
        var formData = new FormData();
        let img = imageProfile;
        for (const i of Object.keys(img)) {
          formData.append('imgCollection', img[i as unknown as number]);
        }
        await fetch(`http://localhost:4000/uploadImage`, {
          body: formData,
          method: 'POST'
        })
          .then((response) => response.json())
          .then((data) => {
            ModifierImageuser(data);
          });
      } else {
        ModifierImageuser(imageProfile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   setNom(Enseignant[0]?.nom);
  //   setPrenom(Enseignant[0]?.prenom);
  //   setpassword(Enseignant[0]?.mdp);
  //   setImageProfile(Enseignant[0]?.img);
  // }, [Enseignant]);
//  useEffect(() => {
//    Modifier();
//  }, [password, imageProfile, prenom, nom]);

  useEffect(() => {
    enseignant();
  }, []);
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Modifier votre profil" />
      <Divider />
      <Box p={2} className="justify-content-center">
        <div className="d-flex flex-column bd-highlight  mb-3">
          <div className=" bd-highlight ">
            <TextField
              style={{ width: '450px' }}
              sx={{ mt: 6, mb: 1 }}
              id="outlined-email-input"
              label="Nom"
              type="text"
              value={nom}
              onChange={(e: any) => {
                setNom(e.target.value);
              }}
            />
          </div>
          <div className=" bd-highlight mt-3 ">
            <TextField
              style={{ width: '450px' }}
              sx={{ my: 1 }}
              id="outlined-password-input"
              label="Prenom"
              type="text"
              value={prenom}
              onChange={(e: any) => {
                setPrenom(e.target.value);
              }}
            />
          </div>

          <div className=" bd-highlight mt-3 ">
            <TextField
              style={{ width: '450px' }}
              sx={{ my: 1 }}
              id="outlined-password-input"
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: any) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className=" bd-highlight mt-3  d-flex  justify-content-center align-items-center">
            <Image setImage={setImageProfile} images={imageProfile} />
          </div>
          <div className=" bd-highlight  d-flex align-items-center justify-content-center mt-5">
            <Button
              className=" align-items-center"
              variant="contained"
              onClick={Modifier}
            >
              Modifier
            </Button>
          </div>
        </div>
      </Box>
    </Card>
  );
}

export default Feed;
