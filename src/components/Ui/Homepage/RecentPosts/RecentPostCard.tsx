import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import React from 'react'

const RecentPostCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        
       

        {/* <Chip label="found" size="small"/> */}
      
        </Box>

        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
        
        </Typography>
      </CardContent>
      <CardActions>
     

     
      <Button fullWidth={true}
              variant="contained"
            
            
              sx={{
             
                bgcolor: "#56E39F",
                "&:hover": {
                  bgcolor: "#465775",
                },
              }}
            >
              Check Post
            </Button>
     
      </CardActions>
    </Card>
  )
}

export default RecentPostCard