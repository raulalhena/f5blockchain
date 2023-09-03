import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function DenseAppBar() {
    const navItems = ['Home', 'Explorer', 'Smart Contracts', 'dApps']

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          </IconButton>
          <Box sx={{ width: '100%', fontWeight: '900' }}>
            F5SCOIN Explorer
          </Box >
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'right' }}>   
                {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#ffffff'}}>
                        <Link style={{ textDecoration: 'none', color: '#fff' }} to={`/${item.replace(/ /g, '').toLowerCase()}`}>{item}</Link>
                    </Button>
                ))}
            </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}