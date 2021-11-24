import { transporter } from "./email.js";
import dotenv from 'dotenv';

dotenv.config();
export default async function send_email(schedule, ips, a_list) {
    let arrayItems = "";
    let horario = (schedule === "M" ? "mañana":"tarde");
    for (let n in a_list) {
        arrayItems += `<li> ${a_list[n].fecha}</li>`;
    }
    await transporter.sendMail({
        from: '"Calendar Validator"' + process.env.EMAIL_SUPP, // sender address
        to: process.env.EMAIL_DEST, // list of receivers
        subject: "Días disponibles para el tratamiento solicitado", // Subject line
        text: "Date available for treatment", // plain text body
        html: `<h1 style="background-color: #000000; color: #ffffff; text-align: center; padding: 0.3rem;">
                   Se encontró disponibilidad en la sede ${ips} en horas de la ${horario}
                 </h1>
                 <p>Hay citas en los siguientes días:</p>
                 <ul>
                    ${arrayItems}
                 </ul>
                `, // html body
    });
}
