import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Avatar,
  styled
} from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import emailjs from '@emailjs/browser';

import facebook from '../Images/facebook.png';
import linkedIn from '../Images/linkenIn.png';
import { useRef } from 'react';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function PopularTags() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*** */

  const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       'service_wwbqo9p',
  //       'template_z62qx08',
  //       form.current,
  //       '5SV-EbdmKHHB5ggRa'
  //     )

  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <Card sx={{ height: '80%' }}>
      {/* <CardHeader title="CONTACTEZ-NOUS " /> */}
      <Divider />
      <ListWrapper disablePadding>
        <Divider />
        {/* <div className="px-4 py-4  d-flex justify-content-center">
          {' '}
          Avenue Habib Bourguiba 04234,
          <span style={{ fontSize: '14px', color: '#0077b7' }}>
            {' '}
            EL Golaa
          </span>{' '}
        </div> */}
        {/* <div className="px-4 py-4  d-flex justify-content-center">
          <Button variant="outlined" onClick={handleClickOpen}>
            Open form dialog
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                // type="message"
                // name="user_email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </div> */}

        <Divider />
        {/* <div className="px-4 py-2  d-flex justify-content-center">
          {' '}
          Douz, Kebilie
        </div> */}
        <Divider />
        <></>
        <Divider />
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            SUIVEZ-NOUS
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 38,
                height: 38
              }}
              src={linkedIn}
            ></Avatar>
          </ListItemAvatar>
          <a
            href="https://www.linkedin.com/school/%C3%A9cole-nationale-d-electronique-et-des-t%C3%A9l%C3%A9communications-de-sfax/://www.linkedin.com/company/aures-group/"
            style={{ color: 'black', textDecoration: 'none', fontSize: '15px' }}
          >
            {' '}
            LinkedIn
          </a>
        </ListItem>
        <Divider />

        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar sx={{ width: 38, height: 38 }} src={facebook} />
          </ListItemAvatar>
          <a
            href="https://www.facebook.com/ENETComofficielle"
            style={{ color: 'black', textDecoration: 'none', fontSize: '15px' }}
          >
            {' '}
            Facebook
          </a>
        </ListItem>
        <Divider />
      </ListWrapper>
    </Card>
  );
}

export default PopularTags;
