import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [open, setOpen] = useState(false);
  const pages = ['About', 'Pricing', 'Surveys']
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserExists(false);
  };

  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
}
const handleLogout = (event) => 
{
  sessionStorage.removeItem("logged_in_user")
  document.location.href = "/"
}
const Search = () => {
  //configure endpoint info
  let config = {method: 'get', url: '/userexist/' + searchTerm}
  let reply
  //call api amd save result to variable
  axios(config)
  .then(function (response) {
      if(response.data.response==="Approved"){
          setUserExists(true); 
      }
      else{
          setUserExists(false); 
      }

  })
  .catch(function (error) {
      console.log("error", error);
  });
}

  useEffect(()=>{
    if(userExists){
        handleClickOpen();
    }
  },[userExists]
  )

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleProfileClick = () => {
    document.location.href = `/profiles/${user}`
  }
  const handleDashboard = () => {
    document.location.href = `/Home`
  }
  
  let user = sessionStorage.getItem("logged_in_user")


  let settingsblock = settings.map((setting) => {
    switch(setting){
      case 'Profile':
        if(user!=null){
          console.log("Pressed")
          return(
            <MenuItem href={{pathname:`/profiles/${user}`}}  key={setting} onClick={handleProfileClick}>
              <Typography textAlign="center">{setting}</Typography> 
            </MenuItem>
        )
        }
      case 'Logout':
        return(  
          <MenuItem key={setting} onClick={handleLogout}>
            <Typography textAlign="center">{setting}</Typography> 
          </MenuItem>
        )
      case 'Dashboard':
        return(  
          <MenuItem key={setting} onClick={handleDashboard}>
            <Typography textAlign="center">{setting}</Typography> 
          </MenuItem>
        )
      }
    }
)

  return (
    <>
    <AppBar style={{color: 'white', backgroundColor: 'white'}} position="fixed"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl"  style={{backgroundColor: "white"}}> {/**#1a237e */}
        <Toolbar disableGutters style={{color: 'black'}}>
          <Link underline="none" href="/home">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        
          >
            Mini Survey Monkey
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              style={{color: 'black'}}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                  <MenuItem  style={{color: 'black'}} onClick={()=>{document.location.href = "/pricing"}}>
                    <Typography style={{fontColor: 'black'}} textAlign="center">Pricing</Typography>
                  </MenuItem>
                  <MenuItem  style={{color: 'black'}}  onClick={()=>{document.location.href = "/about"}}>
                    <Typography style={{fontColor: 'black'}} textAlign="center">About</Typography>
                  </MenuItem>
                  <MenuItem  style={{color: 'black'}} onClick={()=>{document.location.href = "/surveyViewer"}}>
                    <Typography style={{fontColor: 'black'}} textAlign="center">Surveys</Typography>
                  </MenuItem>
              ))
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Mini Survey Monkey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {sessionStorage.getItem("logged_in_user") ? (
            pages.map((page) => (
              page != 'Surveys' ? (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{  color: 'black' , display: 'block' }}
                href={`/${page}`}
              >
                {page}
              </Button>): (
                 <Button
                 key={page}
                 onClick={handleCloseNavMenu}
                 sx={{  color: 'black' , display: 'block' }}
                 href={`/surveyViewer`}
               >
                 {page}
               </Button>
              )
            ))):(<></>)}
           
          </Box>
          {sessionStorage.getItem("logged_in_user") ? 
          <Box sx={{ flexGrow: 0 }}>
            <TextField  onChange={handleSearchChange} label="search a profile"/>
            <Button  onClick={Search} variant="contained" style={{marginTop: 10, marginLeft: 5, marginRight: 25}}>Search</Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                
               {settingsblock}
            </Menu>
          </Box> : <></>}
        </Toolbar>
      </Container>
    </AppBar>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
        {"Found a matching user!"}
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Visit their profile?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
   <Button href={`/profiles/${searchTerm}`} onClick={handleClose} autoFocus>
        Visit
        </Button>
   
    <Button onClick={handleClose} autoFocus>
        Exit
    </Button>
    </DialogActions>
    </Dialog>
    </>
  );
};
export default ResponsiveAppBar;