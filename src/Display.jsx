import fitbit from "./fitbit";
import JsonCard from "./JsonCard";
import { useState } from 'react';

function Display({}){
    const [hr, setHR] = useState({});
    const [sleep, setSleep] = useState({});
    const [cal, setCal] = useState({});
    const [act, setAct] = useState({});
    const titles = ['Heart Rate', 'Sleep', 'Calories', 'Activity Log'];

    async function getData(e){
        e.preventDefault();
        let hr = await fitbit.getHeartRate();
        setHR(hr);
        let s = await fitbit.getSleepLog();
        setSleep(s); 
        let c = await fitbit.getCalories();
        setCal(c); 
        let a = await fitbit.getActivityLog();
        setAct(a); 
    }

    return (
        <>
            <h1>Display</h1>
            <button onClick={(e) => {getData(e)}}>Get Data</button>
            <div className="dataReturns">
                {
                    titles.map((t, idx) => {
                        let data = hr;
                        if(t === 'Sleep'){
                            data = sleep;
                        } else if(t === 'Activity Log'){
                            data = act;
                        } else if(t === 'Calories'){
                            data = cal;
                        }
                        return <JsonCard key={idx} data={data} title={t} />
                    })
                }
            </div>
        </>
    )
}

export default Display;