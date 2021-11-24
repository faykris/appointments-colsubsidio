import dotenv from 'dotenv';
import sleep from "./functions/sleep.js";
import authenticate from "./functions/authenticate.js";
import calendar_validator from "./functions/calendar_validator.js";
import send_email from "./functions/send_email.js";

// Load environment variables
dotenv.config();

let mc_dict = {};
const min = 5;
const max = 10;
const morning = "M";
const afternoon = "T";

// runs program
console.log(`************ Starting process ************`);

// load medical centers codes and descriptions from env
const mc_list = String(process.env.MED_CENTERS).split(":");

// load medical centers from list
for (let i = 0; i < mc_list.length; i += 2) mc_dict[mc_list[i]] = mc_list[i + 1];

// make authentication
const auth = await authenticate();

// Validate each medical center
for (let mc in mc_dict) {
    try {
        // Validate medical center in morning schedule
        console.log(`Validate in ${mc_dict[mc]}, morning schedule...`);
        const m_json = await calendar_validator(auth.refreshToken, morning, mc);
        if (m_json.resultado.length !== 0) console.log(m_json.resultado[0].descripcion);
        else if ((m_json.disponibilidad !== undefined) && (m_json.disponibilidad.length !== 0)) {
            console.log(m_json.disponibilidad);
            await send_email(morning, mc_dict[mc], m_json.disponibilidad);
        }

        // Validate medical center in afternoon schedule
        console.log(`Validate in ${mc_dict[mc]}, afternoon schedule...`);
        const t_json = await calendar_validator(auth.refreshToken, afternoon, mc);
        if (t_json.resultado.length !== 0) console.log(t_json.resultado[0].descripcion);
        else if ((t_json.disponibilidad !== undefined) && (t_json.disponibilidad.length !== 0)) {
            console.log(t_json.disponibilidad);
            await send_email(afternoon, mc_dict[mc], t_json.disponibilidad);
        }

        if ((m_json.disponibilidad !== undefined && m_json.disponibilidad.length !== 0) ||
            (t_json.disponibilidad !== undefined && t_json.disponibilidad.length !== 0)) {
            console.log(":) - schedule for procedure available!");
            process.exit(0);
        }
        else {
            const time = (Math.random() * (max - min) + min).toFixed();
            console.log(`---> Fetch next medical center in ${time} seconds...`);
            await sleep(time * 1000);
        }

    } catch (e) {
        console.log(`:X - Error fetching data:\n ${e.message}`);
    }
}
console.log(`************ End of process ************`);
