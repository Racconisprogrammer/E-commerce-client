import React from "react";
import {Grid} from "@mui/material";
import Achivement from "./Achivement";


const AdminDashboard = () => {

    return (
        <div className=''>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Achivement/>
                </Grid>
            </Grid>
        </div>
    )

}

export default AdminDashboard