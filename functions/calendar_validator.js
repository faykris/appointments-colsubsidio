import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async function calendar_validator(refresh_token, schedule, ips) {
    const result = await fetch("https://www.saludcolsubsidio.com/api/informacion/v1.0/agendamiento/informacion/disponibilidad?" +
        "especialidad=" + process.env.SPECIALTY + "&" +
        "paciente=" + process.env.PATIENT + "&" +
        "medico=&" +
        "ipsadscripcion=&" +
        "jornada="+ schedule +"&" +
        "planificacion=&" +
        "ips=" + ips +"&" + // Plaza de las Americas
        "codigo=" + process.env.CODE, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": refresh_token,
            "refreshtoken": refresh_token,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "cookie": process.env.COOKIE,
            "Referer": "https://www.saludcolsubsidio.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    return await result.json();
}
