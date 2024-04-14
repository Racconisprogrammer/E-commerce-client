import React from "react";
import {Button, Card, CardContent, styled, Typography} from "@mui/material";
import trophy from "../misc/img/trophy.png"


const TringleImg = styled("img") ({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})

const TrophyImg = styled("img") ({
    right:36,
    bottom:20,
    height:98,
    position:"absolute"
})


const Achivement = () => {

    return (
        <Card className='space-y-5' sx={{position:"relative", bgcolor:"#242B2E", color:"white"}}>
            <CardContent>
                <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                    Shop Farkhod
                </Typography>
                <Typography variant='body2'>
                    Congratulations 🥳
                </Typography>
                <Typography variant='h5' sx={{my:3.1}}> 420.8k </Typography>
                <Button size='small' variant='contained'>View Sales</Button>
                <TringleImg src=''></TringleImg>
                <TrophyImg src={trophy}/>
            </CardContent>
        </Card>
    )

}

export default Achivement