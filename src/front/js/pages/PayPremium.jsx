import React from "react";
import { useNavigate } from "react-router-dom";

export const PayPremium = () => { 
    const navigate = useNavigate()

    const handlePay = () => {
        navigate('/pay-ready')
    }
    return (
        <div className="card-body p-5 mt-5 mx-5 mb-5">
        <button onClick={handlePay}> 
            Pagar
        </button>
        </div>
    )
}

