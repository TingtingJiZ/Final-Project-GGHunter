import React from "react";
import { useNavigate } from "react-router-dom";

export const Premium = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/pay-premium')
    }

    return (
        <div className="card-body p-5 mt-5 mx-5 mb-5">
        <button onClick={handleNavigate}> 
            Pagar premium
        </button>
        </div>
    )
}