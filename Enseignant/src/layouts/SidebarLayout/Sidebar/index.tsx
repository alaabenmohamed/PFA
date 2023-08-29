import { useContext, useEffect, useState } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import logo from '../../../images/BK STOCKS(10).png';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
const drawerWidth = 300;


import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/LogoSign';
import { Button, ListSubheader, alpha, styled } from '@mui/material';

import * as FaIcons from 'react-icons/fa';
import { NavLink as RouterLink } from 'react-router-dom';
import { blue, red } from '@mui/material/colors';
            // background: ${theme.colors.primary.main};
   // color: ${theme.palette.primary.contrastText};








function Sidebar() {
  
 const [name, setName] = useState('');
 const [prenom, setPrenom] = useState('');
 const [picture, setPicture] = useState('');

 useEffect(() => {
   let nameUser: any = localStorage.getItem('nom');
   let prenomUser: any = localStorage.getItem('prenom');
   let pictureUser: any = localStorage.getItem('image');
   setName(nameUser);
   setPrenom(prenomUser);
   setPicture(pictureUser);
   //setpdate(false);
 }, [name, prenom, picture]);
 const user = {
   name: name,
   avatar: picture,
   prenom: prenom
 };

    return (
      // <Box 
      // sx={{ display: 'flex', bgcolor: blue }}
     
      // >

       <div style={{  color : "red"}}>
         {/* <CssBaseline /> */}
        
         <Drawer
           sx={{
             bgcolor: blue,
             width: drawerWidth,
             flexShrink: 0,
             '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box'
             }
           }}
           variant="permanent"
           anchor="left"
         >
           {/* <Toolbar /> */}
           {/* <Divider /> */}
           <Box mt={3} className="d-flex justify-content-center">
             <Box
               mx={2}
               sx={{
                 width: 52
               }}
               className="d-flex justify-content-center"
             >
               <div className="d-flex justify-content-center">
                 <img
                   src={user.avatar}
                   alt="Typescript"
                   style={{ width: drawerWidth, height: '15rem' }}
                 />
               </div>
             </Box>
           </Box>
           <List
             component="div"
             subheader={
               <ListSubheader component="div" disableSticky>
                 Etudiant
               </ListSubheader>
             }
           >
        
             <List component="div">
               <ListItem component="div">
                 <Button
                   disableRipple
                   component={RouterLink}
                   to="/dashboards/clients"
                   startIcon={<FaIcons.FaUsers />}
                 >
                   Gestion des Etudiants
                 </Button>
               </ListItem>
             </List>
           </List>
           <Divider />
           <List
             component="div"
             subheader={
               <ListSubheader component="div" disableSticky>
                 Profils
               </ListSubheader>
             }
           >
             <List component="div">
               <ListItem component="div">
                 <Button
                   disableRipple
                   component={RouterLink}
                   to="/dashboards/profile/details"
                   startIcon={<AccountCircleTwoToneIcon />}
                 >
                   Profil
                 </Button>
               </ListItem>
             </List>
           </List>
           <Divider />
         
         </Drawer>
       </div>
    );
}

export default Sidebar;
