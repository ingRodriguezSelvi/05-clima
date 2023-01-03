import * as fs from "fs";

import axios from 'axios';
export class Searches {
    history = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'proximity': '-3.703790,40.416775',
            'types': 'place',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

        searchCity = async (city = '') => {
            try {
                const instance = axios.create({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                    params: this.paramsMapbox
                });
                const resp = await instance.get();
                return resp.data.features.map(site => ({
                    id: site.id,
                    name: site.place_name,
                    lng: site.center[0],
                    lat: site.center[1]
                }));
            } catch (e) {
                return [];

            }
        }
        weatherCity = async (lat, lon) => {
            try {
                const instance = axios.create({
                    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                    params: {...this.paramsWeather, lat, lon}
                });
                const resp = await instance.get();
                const {weather, main} = resp.data;
                return {
                    desc: weather[0].description ,
                    min: main.temp_min ,
                    max: main.temp_max ,
                    temp: main.temp
                }
            } catch (e) {
                return {
                    desc:'No Data' ,
                    min: 'No Data' ,
                    max: 'No Data' ,
                    temp: 'No Data'
                }
            }
        }

        addHistory = (city = '') => {
            if (this.history.includes(city.toLocaleLowerCase())) {
                return;
            }
            this.history.unshift(city.toLocaleLowerCase());
            this.history = this.history.splice(0, 5);
            this.saveDB();
        }
        saveDB = () => {
            const payload = {
                history: this.history
            }
            fs.writeFileSync(this.dbPath, JSON.stringify(payload));
        }
        readDB = () => {
            if (!fs.existsSync( this.dbPath)) {
                return null;
            }
            const info = fs.readFileSync
            (this.dbPath, {encoding: 'utf-8'});
            const data = JSON.parse(info);
            this.history = data.history;
        }
    }
