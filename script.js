const inputButton = document.querySelector('.btn-input');
inputButton.addEventListener('click', function() {

    const inputKeyword = document.querySelector('.input-keyword');
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + inputKeyword.value + '&limit=1&appid=a8378aeae8d35a4ed3de968e4fd725c3')
        .then(response => response.json())
        .then(data => {
            const cityName = data[0].name;
            const countryName = data[0].country;
            const locationLat = data[0].lat;
            const locationLon = data[0].lon;

            const cityOutput = document.querySelector('.city-output');
            cityOutput.innerHTML = `${cityName}, ${countryName}`;

            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + locationLat + '&lon=' + locationLon + '&appid=a8378aeae8d35a4ed3de968e4fd725c3')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const weatherOutput = document.querySelector('.weather-output');
                const weatherNow = data.weather[0].main;
                weatherOutput.innerHTML = `${weatherNow}`;

                const weatherDesc = document.querySelector('.weather-desc');
                const deskripsi = data.weather[0].description;
                weatherDesc.innerHTML = `${deskripsi}`;

                const temperature = document.querySelector('.temp');
                const tempNow = convertion(data.main.temp);
                temperature.innerHTML = `${tempNow}`;

                const humidity = document.querySelector('.humidity');
                const humidityNow = data.main.humidity;
                humidity.innerHTML = `${humidityNow}%`;

                const windSpeed = document.querySelector('.wind-speed');
                const windSpeedNow = data.wind.speed;
                windSpeed.innerHTML = `${windSpeedNow}`;

                const pictCuaca = document.querySelector('.img-weather');

                function changeImage() {
                    if(tempNow >= 32) {
                        pictCuaca.src ='assets/rain.svg';
                    }
                    else if(tempNow >= 25) {
                        pictCuaca.src = 'assets/cloud-sun.svg';
                    }
                    else if(tempNow >= 23) {
                        pictCuaca.src = 'assets/cloud.svg';
                    }
                    else {
                        pictCuaca.src = 'assets/sun.svg'
                    }
                }
                changeImage();
            });
        });
})

const convertion = (val) => {
    return Math.round(val - 273);
}
