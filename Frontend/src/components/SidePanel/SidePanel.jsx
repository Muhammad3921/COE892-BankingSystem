import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as Logo } from '../logo.svg';
import { ReactComponent as PanelToggleBtn } from '../panel-toggle.svg';
import { ReactComponent as Dashboard } from '../dashboard-icon.svg';
import { ReactComponent as Calendar } from '../calendar.svg';
import { ReactComponent as PrescriptionBottle } from '../prescription-bottle.svg';
import { ReactComponent as RxFile } from '../rx-file.svg';
import { ReactComponent as Analytics } from '../analytics.svg';
import { ReactComponent as Profile } from '../profile2.svg';
import { ReactComponent as Person } from '../person.svg';
import { ReactComponent as SignoutBtn } from '../signout-button.svg';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './SidePanel.css';

//const drawerWidth = 240;
const menuItemsTop = [
  {name: 'Dashboard', icon: <Dashboard />, path: '/home'}
];

const menuItemsMiddle = [
  {name: 'Scheduler', icon: <Calendar />, path: '/scheduler'},
  {name: 'Drug supply tracker', icon: <PrescriptionBottle />, path: '/drug-supply-tracker'},
  {name: 'Prescription', icon: <RxFile />, path: '/prescriptionsubmit'},
  {name: 'Drug interaction checker', icon: <Analytics />, path: '/drug-interaction-checker'},
  {name: 'Side effect report', icon: <Analytics />, path: '/side-effect-report'},
];

const menuItemsBottom = [
  {name: 'Profile', icon: <Person />, path: '/profile'},
  {name: 'Sign out', icon: <SignoutBtn />, path: '/logout'}
]

const openedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  padding: '2.8em 1em 1em 1em',
  backgroundColor: '#f1860b',
  color: '#FFF',
  borderRadius: '0 0 50px 0',
  border: 'none',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  padding: '2.8em 1em 1em 1em',
  backgroundColor: '#f1860b',
  color: '#FFF',
  borderRadius: '0 0 50px 0',
  border: 'none',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center'
}));

const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  position: 'absolute',
  bottom: '0',
  paddingBottom: '2em'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    //width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SidePanel() {
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open} className='side-panel'>
      <DrawerHeader style={{ display: open ? 'none': ''}}>
        <Logo id='sidepanel-logo'/>
      </DrawerHeader>
      <DrawerHeader style={{ display: open ? '': 'none'}}>
        <Logo id='sidepanel-logo'
        style={{ marginRight: open ? '0.6em' : '0' }}/>
        <span
          style={{
            opacity: open ? 1 : 0,
            fontFamily: 'Playfair Display',
            fontSize: '1.4em'
          }}>
          Pharmaceutical Portal
        </span>
      </DrawerHeader>
      <List style={{ marginTop: '6em' }}>
          {menuItemsTop.map((item) => (
          <ListItem key={item.name} component={Link} to={item.path} disablePadding
            className={location.pathname === item.path ? 'selected' : ''}
            sx={{ display: 'block'}}
            style={{
              color: location.pathname === item.path ? '#f1860b' : '#FFF',
              backgroundColor: location.pathname === item.path ? '#FFF' : '#f1860b',
              borderRadius: '20px',
            }}>
              <ListItemButton
              sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
              }}
              >
              <ListItemIcon
                  sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
          </ListItem>
          ))}
      </List>
      <Divider />
      <List>
      {menuItemsMiddle.map((item) => (
          <ListItem key={item.name} component={Link} to={item.path} disablePadding 
            className={location.pathname === item.path ? 'selected' : ''}
            sx={{ display: 'block', }}
            style={{
              color: location.pathname === item.path ? '#f1860b' : '#FFF',
              backgroundColor: location.pathname === item.path ? '#FFF' : '#f1860b',
              borderRadius: '20px',
            }}>
              <ListItemButton 
              sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
              }}
              >
              <ListItemIcon
                  sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          </ListItem>
          ))}
      </List>
      <Divider />
      <div 
      style={{
        textAlign: 'center',
        marginTop: '2em'
      }}>
        <Profile
          style={{
            display: 'block',
            margin: 'auto',
            width: open ? '60px' : '40px'
          }}/>
        <span style={{
          display: open ? 'block' : 'none',
          marginTop: '0.6em',
          fontSize: '1.2em'
        }}>{sessionStorage.getItem('Name')}</span>
      </div>
      <List>
          {menuItemsBottom.map((item) => (
          <ListItem key={item.name} component={Link} to={item.path} disablePadding
            className={location.pathname === item.path ? 'selected' : ''}
            sx={{ display: 'block'}}
            style={{
              color: location.pathname === item.path ? '#f1860b' : '#FFF',
              backgroundColor: location.pathname === item.path ? '#FFF' : '#f1860b',
              borderRadius: '20px',
            }}>
              <ListItemButton
              sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
              }}
              >
              <ListItemIcon
                  sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
          </ListItem>
          ))}
      </List>
      <DrawerFooter>
          <IconButton onClick={toggleDrawer} sx={{ transform: open ? 'none' : 'scaleX(-1)' }}>
          <PanelToggleBtn />
          </IconButton>
      </DrawerFooter>
  </Drawer>
  );
}
