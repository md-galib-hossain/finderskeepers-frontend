import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const HeroImage = ({wave} : {wave : any}) => {
  return (
    <> <Box sx={{ width: "100%" }}>
    <Image
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      src={wave}
      alt="wave"
    />
      <Box

      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100px",
        background: "linear-gradient(to bottom, transparent, white)",
      }}
    />
  </Box></>
  )
}

export default HeroImage