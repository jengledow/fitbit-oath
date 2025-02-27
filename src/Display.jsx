import { useEffect, useState } from "react";
import fitbit from "./fitbit";

function Display({}){
    useEffect(() => {
        let res = fitbit.getHeartRate();
    }, []);

    return (
        <h1>Display</h1>

    )
}

export default Display;