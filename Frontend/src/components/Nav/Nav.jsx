import React from 'react';
import { Button, Menu, MenuItem, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
import { ReactComponent as MenuBtn } from '../menu-button.svg';
import { ReactComponent as CloseBtn } from '../close-button.svg';
import './Nav.css';

function Navbar() {
  const location = useLocation();
  const menu = [
    { name: 'Services', path: '/services'},
    { name: 'About', path: '/about'}
  ];
  const menuButtons = menu.map(item =>
    <Button component={Link} to={item.path}
      style={{
        fontWeight: location.pathname === item.path ? '600' : '500'
      }}>
      {item.name}
    </Button>
  );
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const menuButtonsSmall = menu.map(item =>
    <MenuItem onClick={handleClose} component={Link} to={item.path}
    style={{
        fontWeight: location.pathname === item.path ? '600' : '500',
        color: '#f1860b'
        }}>
        {item.name}
    </MenuItem>
    );
    const menuButton = open ? <CloseBtn /> : <MenuBtn />;

  return (
    <div className="navbar">
      <div className="left-nav">
        <Logo id='logo'/>
        <Button component={Link} to="/" id='logoButton'>
          Banking Portal
        </Button>
      </div>
      <div className="right-nav" style={{ display: 'flex', alignItems: 'center' }}>
        <div className='small-view-nav'>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                {menuButton}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                style = {{
                    textAlign: 'center'
                }}>
                {menuButtonsSmall}
                <Divider />
                <MenuItem onClick={handleClose} component={Link} to="/login" className='logInButton'
                style={{
                    color: '#f1860b',
                    display: 'block',
                    outline: '1px solid #f1860b',
                    borderRadius: '20px',
                    padding: '.15em 1.4em',
                    margin: '1em'
                }}>
                Log in
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/signup" className='registerButton'
                style={{
                    color: '#FFF',
                    display: 'block',
                    backgroundColor: '#f1860b',
                    borderRadius: '20px',
                    padding: '.15em 1.4em',
                    margin: '1em'
                }}>
                Register
                </MenuItem>
            </Menu>
        </div>
        <div className='large-view-nav'>
            {menuButtons}
            <Button component={Link} to="/login" className='logInButton'
            style={{
                fontWeight: location.pathname === '/login' ? '600' : '500'
            }}>
            Log In
            </Button>
            <Button component={Link} to="/signup" className='registerButton'
            style={{
                fontWeight: location.pathname === '/signup' ? '600' : '500'
            }}>
            Register
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;