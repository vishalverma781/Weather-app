import { useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "7951099bc69af547d57d0a277ba1e50d";

    let getWeatherInfo = async () => {
        try {
            let response =
                await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric
        `);
            let jsonResponse = await response.json();
            let result = {
                city: city.toLocaleUpperCase(),
                feelsLike: jsonResponse.main.feels_like,
                humidity: jsonResponse.main.humidity,
                temp: jsonResponse.main.temp,
                tempMax: jsonResponse.main.temp_max,
                tempMin: jsonResponse.main.temp_min,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handlechange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="City"
                    label="City"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handlechange}
                />
                <br></br>
                <br></br>
                <Button
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon />}
                >
                    {" "}
                    Search{" "}
                </Button>
                {error && <p style={{ color: "red" }}>No such place exists</p>}
            </form>
        </div>
    );
}
