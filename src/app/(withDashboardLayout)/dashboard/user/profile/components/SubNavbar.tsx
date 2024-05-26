"use client"
import { Button, Box } from '@mui/material';

const SubNavbar = ({ activeButton, setView } : any) => {
  const handleButtonClick = (buttonName : any) => {
    setView(buttonName);
  };

  const buttonStyles = {
    borderRadius: "0",
    borderBottom: "none", // Initially no bottom border
    '&:hover': {
      bgcolor: "white",
    },
  };

  const activeStyles = {
    borderBottom: "1px solid blue", // Add bottom border when active
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        sx={{ ...buttonStyles, ...(activeButton === 'lostItems' && activeStyles) }}
        variant="text"
        color="inherit"
        onClick={() => handleButtonClick('lostItems')}
      >
        My Lost Items
      </Button>
      <Button
        sx={{ ...buttonStyles, ...(activeButton === 'foundItems' && activeStyles) }}
        variant="text"
        color="inherit"
        onClick={() => handleButtonClick('foundItems')}
      >
        My Found Items
      </Button>
      <Button
        sx={{ ...buttonStyles, ...(activeButton === 'claims' && activeStyles) }}
        variant="text"
        color="inherit"
        onClick={() => handleButtonClick('claims')}
      >
        My Claims
      </Button>
    </Box>
  );
};

export default SubNavbar;
