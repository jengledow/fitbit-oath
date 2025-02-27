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

const fitbit = {
    getHeartRate: () => {
        const params = {
            'start-date': getYesterdayString(),
            'end-date': 'today',
            'user-id': JSON.parse(localStorage.getItem('fitbit-token')).user_id
        }
        let url = replaceParams('https://api.fitbit.com/1/user/[user-id]/activities/heart/date/[start-date]/[end-date].json', params);
        return makeRequest(url);
    },
    getSleepLog: (uid) => {
        return makeRequest(`/1/user/${uid}/activities/heart/date/[start-date]/[end-date].json`);
    }
}

export default fitbit; 