import React from "react";
import {Grid} from "@mui/material";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import ProductsTable from "./ProductsTable";
import OrderTableView from "../view/OrderTableView";


const AdminDashboard = () => {

    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Achivement/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <OrderTableView/>
                </Grid>

            </Grid>
        </div>
    )

}

export default AdminDashboard