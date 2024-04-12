import React from "react";
import {Button, Card, CardContent, styled, Typography} from "@mui/material";
import trophy from "./trophy.png"


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
        <Card sx={{position:"relative"}}>
            <CardContent>
                <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                    Shop Farkhod
                </Typography>
                <Typography>
                    Congratulations 🥳
                </Typography>
                <Typography> 420.8k </Typography>
                <Button size='small' variant='contained'>View Sales</Button>
                <TringleImg src=''></TringleImg>
                <TrophyImg src={trophy}/>
            </CardContent>
        </Card>
    )

}

export default Achivement