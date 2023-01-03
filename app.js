import {inquirerMenu, listCities, pause, readInput} from "./helpers/inquirer.js";
import {Searches} from "./models/searches.js";
import dotenv from 'dotenv';
import * as colors from "colors";

dotenv.config();
const main = async () => {
    let opt = '';
    const searches = new Searches();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // search city
                const city = await readInput('City: ');
                const cities = await searches.searchCity(city).then();
                // select city
                const idCity = await listCities(cities).then();
                if (idCity === '0') continue;
                const citySelected = cities.find(city => city.id === idCity);
                searches.addHistory(citySelected.name);

                // climate
                const weather =  await searches.weatherCity(citySelected.lat, citySelected.lng);
                console.log(weather)
                // show results
                console.log('\n Information of city:\n'.green);
                console.log('City: ',citySelected.name.green);
                console.log('Lat: ', citySelected.lat);
                console.log('Lng: ', citySelected.lng);
                console.log('Temperature: ',)
                console.log('Min: ', weather.min  + '°C' );
                console.log('Max: ', weather.max + '°C' );
                console.log('Clima: ', weather.desc.green );
            break;
            case 2:
                searches.history.forEach((city, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${city}`);
                })
        }
        await pause();
        console.log({opt});
    } while (opt !== 0);
}

main().then();
