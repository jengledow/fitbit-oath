import { getToken } from "./auth";
import { use, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

function Authed(){
    const[params, setParams] = useSearchParams();
    const nav = useNavigate();

    useEffect(() => {
        async function toke() {
            await getToken(params.get('code'));
        }

        toke();
        nav('/display');
    }, [])

    return (
        <h1>Authed</h1>
    )
}

export default Authed;