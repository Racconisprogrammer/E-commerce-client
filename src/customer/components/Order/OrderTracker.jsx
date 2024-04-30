import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const steps = [
    "Placed", 
    "Order confirmed", 
    "Shipped", 
    "Delivered",
]

const stepStatus = [
    "PLACED",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
]

const OrderTracker = ({activeStep}) => {
    const numStep = stepStatus.indexOf(activeStep)
  return (
    <div className='w-full'>
        <Stepper activeStep={numStep} alternativeLabel>
            {steps.map((label)=><Step>
                <StepLabel sx={{color:"#9155fd", fontSize:"44px"}}>{label}</StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}

export default OrderTracker