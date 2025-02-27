function sha256(plain){
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a){
    let str = "";
    let bytes = new Uint8Array(a);

    for(let b of bytes) {
        str += String.fromCharCode(b);
    }
    
    let chall = btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    return chall;
}

async function genCodeChallenge(v) {
  let hashed = await sha256(v);
  let challenge = base64urlencode(hashed);
  return challenge;
}

function dec2hex(dec) {
    return ('0' + dec.toString(16)).substring(-2);
}

function genVerifier() {
    var array = new Uint8Array(56 / 2);
    window.crypto.getRandomValues(array);
    let verifier = Array.from(array, dec2hex).join('');
    sessionStorage.setItem('verifier', verifier);
    return verifier; 
}

async function getAuthUrl(){
    let chall = await genCodeChallenge(genVerifier());
    let url = import.meta.env.VITE_FITBIT_AUTH_URL + new URLSearchParams({
        client_id: import.meta.env.VITE_FITBIT_ID,
        scope: 'activity cardio_fitness heartrate oxygen_saturation respiratory_rate sleep temperature',
        code_challenge: chall,
        code_challenge_method: 'S256',
        response_type: 'code' 
    });

    return url;
}

async function getToken(code){
    let res = await fetch(import.meta.env.VITE_FITBIT_TOKEN_URL, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:5173/home',
            'code': code,
            'client_id': import.meta.env.VITE_FITBIT_ID,
            'code_verifier': sessionStorage.getItem('verifier')
        }).toString()
    })

    res = await res.json();

    if('errors' in res && res.errors.length > 0){
        return {
            success: false,
            errors: res.errors
        }
    } else {
        localStorage.setItem('fitbit-token', JSON.stringify(res));
        return {
            success: true
        }
    }
}

export {
    getAuthUrl,
    getToken
}