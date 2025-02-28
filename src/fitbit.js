/*Scopes we ask for:
    1. respiratory_rate
    2. heartrate
    3. activity
    4. temperature
    5. cardio_fitness
    6. sleep
    7. oxygen_saturation
*/

import { format } from "date-format-parse";

async function makeRequest(url){
    console.log(url);
    let res = await fetch(url, {
        headers: new Headers({
            'authorization': `Bearer ${JSON.parse(localStorage.getItem('fitbit-token')).access_token}`,
            'accept': 'application/json' 
        })
    })

    res = await res.json();
    console.log(res);
    return res;
}

function replaceParams(url, params){
    if(url.indexOf('[') < 0){
        return url;
    }

    let newUrl = '';
    let openBracket = url.indexOf('[');
    let closedBracket = url.indexOf(']');
    let paramName = url.substring(openBracket + 1, closedBracket);
    newUrl = url.substring(0, openBracket) + params[paramName] + url.substring(closedBracket + 1); 

    return replaceParams(newUrl, params);
}

function getYesterdayString(){
    let today = new Date();
    let yesterday = today.setDate(today.getDate() - 1);
    let yesterdayString = format(yesterday, "YYYY-MM-DD"); 
    return yesterdayString;
}

function getLastWeekString(){
    const today = new Date();
    let lastWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    return format(lastWeek, 'YYYY-MM-DD');
}

const fitbit = {
    getActivityLog: async () => {
        //could be paginated if we want to
        let queryParams = new URLSearchParams({
            afterDate: getLastWeekString(),
            sort: 'asc',
            limit: 10,
            offset: 0
        })
        return await makeRequest('https://api.fitbit.com/1/user/-/activities/list.json?' + queryParams.toString());
    },
    getCalories: async () => {
        return await makeRequest('https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json')
    },
    getHeartRate: async () => {
        return await makeRequest('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json');
    },
    getSleepLog: async () => {
        return await makeRequest(`https://api.fitbit.com/1.2/user/-/sleep/date/today.json`);
    },
    
}

export default fitbit; 