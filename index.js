const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get("/getWeather/:latitude/:longitude", async (req, res) => {
    try {
        const weatherInfo = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${req.params.latitude}&longitude=${req.params.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`
        );
        const weatherData = await weatherInfo.json();

        // Reverse geocoding using Open-Meteo (works on Vercel)
        const locationRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${req.params.latitude}&lon=${req.params.longitude}`
        );
        const locationData = await locationRes.json();


        let address = `${locationData.address.city}(${locationData.address.postcode})`;

    

        const filtered = {
            pata: address,
            Temperature: weatherData.current.temperature_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            Humidity: weatherData.current.relative_humidity_2m
        };

        res.json(filtered);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
