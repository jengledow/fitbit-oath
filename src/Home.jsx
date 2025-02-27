import { getAuthUrl } from './auth';
import { useEffect, useState } from 'react';

function Home(){
    const [url, setUrl] = useState('');
    
    useEffect(() => {
        async function getUrl(){
            setUrl(await getAuthUrl());
        }

        getUrl();
    }, []);

    async function linkFitBit(){
        window.location.href = url;
        return;
    }

    return (
        <>
            <h1>Home</h1>
            <button onClick={linkFitBit}>Link FitBit Account</button>
        </>
    )
}

export default Home;