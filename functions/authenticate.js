import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async function authenticate() {
    const result = await fetch("https://www.saludcolsubsidio.com/api/ingreso/v1.0/auth", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "cookie": process.env.COOKIE,
            "Referer": "https://www.saludcolsubsidio.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"username\":\"portalsalud.api\",\"password\":\"C0lsubs1d1o.\"}",
        "method": "POST"
    });
    return await result.json();
}
