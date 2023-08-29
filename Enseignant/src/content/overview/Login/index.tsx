import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import './style.css';
const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(13)};
    height: ${theme.spacing(8)};
    background-color: #dff5f6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 86%;
      height: 86%;
      display: block;
    }
`
);
type admintype = {
  setuser: Function;
};

function Login() {
  const [admin, setadmin] = useState({
    mail: '',
    mdp: ''
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // async function Contact() {
  //   try {
  //     await fetch(
  //       `${process.env.REACT_APP_API_URL}/getsctedetails/${localStorage.getItem(
  //         'user_id'
  //       )}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.nom) {
  //           localStorage.setItem('nomscte', result.nom);
  //           localStorage.setItem('addscte', result.add);
  //           localStorage.setItem('siret', result.siret);
  //           localStorage.setItem('logoscte', result.logo);
  //           localStorage.setItem('tel', result.tel);
  //         } else {
  //           localStorage.setItem('nomscte', '');
  //           localStorage.setItem('addscte', '');
  //           localStorage.setItem('siret', '');
  //           localStorage.setItem('logoscte', '');
  //           localStorage.setItem('tel', '');
  //         }

  //         navigate('dashboards/Clients');
  //         window.location.reload();
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getuser() {
    try {
      fetch('http://localhost:4000/enseignantLogin', {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: { 'Content-type': 'application/json;charset=utf-8' }
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length >= 1) {
              console.log(result);
              console.log(result[0].enseignant_id);
              localStorage.setItem('userid', result[0].enseignant_id);
              localStorage.setItem('mdp', result[0].mdp);
              localStorage.setItem('mail', result[0].mail);
              localStorage.setItem('prenom', result[0].prenom);
              localStorage.setItem('nom', result[0].nom);
              localStorage.setItem('image', result[0].img);
              localStorage.setItem('user', result[0].mdp); //responsable de controle
              // navigate('/');
              // window.location.reload();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ATTENTION',
                text: 'Veuillez vérifier vos identifiants!'
              });
            }
          },
          (error) => {
            console.error(error.message);
          }
        );
    } catch (err: any) {
      console.error(err.message);
    }
  }
  return (
    <div className="main">
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Grid
          spacing={{ xs: 6, md: 10, col: 12 }}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item md={10} lg={8} xl={12} mx="auto">
            <TypographyH1 className="title-cl" sx={{ mb: 2 }} variant="h1">
              Connectez-Vous
            </TypographyH1>
            <div className="d-flex flex-column bd-highlight mb-3">
              <div className=" bd-highlight ">
                <TextField
                  style={{ width: '560px' }}
                  sx={{ mt: 6, mb: 1 }}
                  id="outlined-email-input"
                  label="Email"
                  type="text"
                  onChange={(e) => {
                    admin.mail = e.target.value;
                    setadmin(admin);
                  }}
                />
              </div>
              <div className=" bd-highlight ">
                <TextField
                  style={{ width: '560px' }}
                  sx={{ mt: 6, mb: 1 }}
                  id="outlined-password-input"
                  label="Mot de passe"
                  type="password"
                  onChange={(e: any) => {
                    admin.mdp = e.target.value;
                    setadmin(admin);
                  }}
                />
              </div>
              <div className=" bd-highlight ">
                <Button
                  sx={{ my: 1, mt: 6 }}
                  size="large"
                  variant="contained"
                  onClick={getuser}
                  style={{ marginTop: '25px' }}
                >
                  Se Connecter
                </Button>
              </div>
            </div>
            <Box sx={{ pb: 2, pt: 2 }}>
              Vous n'avez pas de Compte ?
              <span>
                <a
                  style={{
                    color: '#5569ff',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px'
                  }}
                  href="/"
                  onClick={() => {
                    localStorage.setItem('register', 'true');
                  }}
                >
                  {' '}
                  Inscrivez-vous
                </a>
              </span>
            </Box>

            <Grid container spacing={3} mt={5}>
              <Grid item md={12} sm={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ pb: 2 }}>&copy; 2023- PFA By Alaa Ben Mohamed</Box>
      </Container>
    </div>
  );
}

export default Login;
