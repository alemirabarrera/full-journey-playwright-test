
export const getLoginToken = async (username, password) =>{
  const result = await fetch("http://localhost:2221/api/login", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en,es-ES;q=0.9,es;q=0.8",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Opera GX\";v=\"106\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:2221/login?redirect=/my-account",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({"username":username,"password":password}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

if(result.status != 200 || !result.ok){
    throw new Error("Error happened");
} 
 const data = await result.json();
 return data.token;  
}