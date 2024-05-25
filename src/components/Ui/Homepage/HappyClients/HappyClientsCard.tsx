import { Box, Card, Rating, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import client1 from '@/assets/client1.jpg';

const HappyClientsCard = () => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <Box sx={{ position: 'relative' }}>
        <Image src={client1} alt="client" layout="responsive" width={345} height={200} objectFit="cover" />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%', // Increased height for more gradient coverage
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: 2,
            color: 'white',
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            John Doe
          </Typography>
          <Typography variant="body2">
            "This service is amazing. I found my lost wallet within a day!"
          </Typography>
         
          <Rating name="read-only" value={5} readOnly size="small"/>

         
        </Box>
      </Box>
    </Card>
  );
}

export default HappyClientsCard;
