import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div>
        <Grid className='bg-black text-white text-center mt-10'
        container
        sx={{bgcolor:"black", color:"white", py:3}}
        >
            <Grid item xs={27} sm={6} md={3}>
                <Typography className='pb-5' variant='h6'> Company </Typography>
                <div>
                    <Button className='pb-5' variant='h6' gutterBottom > About </Button>
                </div>
                <div>
                    <Button className='pb-5' variant='h6' gutterBottom > Blog </Button>
                </div>
                <div>
                    <Button className='pb-5' variant='h6' gutterBottom > Press </Button>
                </div>
                <div>
                    <Button className='pb-5' variant='h6' gutterBottom > Jobs </Button>
                </div>
            </Grid>

        </Grid>
    </div>
  )
}

export default Footer