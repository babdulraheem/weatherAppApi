const input = document.querySelector('.input_text');
const main = document.querySelector('#name');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const button = document.querySelector('.submit');
const icon = document.querySelector(".icon");

const main2 = document.querySelector('#name2');
const temp2 = document.querySelector('.temp2');
const desc2 = document.querySelector('.desc2');
const icon2 = document.querySelector(".icon2");




button.addEventListener('click', function(name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=be2cfc723b432769c604e3e20d52e07d')
        .then(response => response.json())
        .then(data => {
            const tempValue = data['main']['temp'];
            const nameValue = data['name'];
            const descValue = data['weather'][0]['description'];
            const iconValue = data['weather'][0]['icon'];


            // data saved in local storage
            localStorage.setItem('City Name', nameValue);
            let myData = localStorage.getItem('City Name');
            main.innerHTML = myData;

            localStorage.setItem('wDescription', descValue);
            let myDescData = localStorage.getItem('wDescription');
            desc.innerHTML = "Description - " + myDescData;


            temp.innerHTML = "Temperature - " + Math.floor((tempValue - 273) * (9 / 5) + 32) + " F";
            input.value = "";
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}@2x.png"/>`;

        })


    .catch(err => alert("Wrong city name!"));
})


// geolocation stuff

var apiGeolocationSuccess = function(position) {
    alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);

};

var tryAPIGeolocation = function() {
    jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function(success) {
            apiGeolocationSuccess({ coords: { latitude: success.location.lat, longitude: success.location.lng } });
        })
        .fail(function(err) {
            alert("API Geolocation error! \n\n" + err);
        });
};

var browserGeolocationSuccess = function(position) {
    alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);

    getWeather(position.coords.latitude, position.coords.longitude);

};

var browserGeolocationFail = function(error) {
    switch (error.code) {
        case error.TIMEOUT:
            alert("Browser geolocation error !\n\nTimeout.");
            break;
        case error.PERMISSION_DENIED:
            if (error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
            }
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Browser geolocation error !\n\nPosition unavailable.");
            break;
    }
};

var tryGeolocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            browserGeolocationSuccess,
            browserGeolocationFail, { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true });
    }
};

tryGeolocation();



function getWeather(lat, lon) {

    const key = "be2cfc723b432769c604e3e20d52e07d";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            const tempValue2 = data['main']['temp'];
            const nameValue2 = data['name'];
            const descValue2 = data['weather'][0]['description'];
            const iconValue2 = data['weather'][0]['icon'];

            main2.innerHTML = nameValue2;
            desc2.innerHTML = "Description - " + descValue2;
            temp2.innerHTML = "Temperature - " + Math.floor((tempValue2 - 273) * (9 / 5) + 32) + " F";
            icon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue2}@2x.png"/>`;

            //localStorage.setItem("Tempreature2", temp2);
            // temp2.innerHTML = localStorage.getItem(temp2);

            //window.localStorage.setItem("Tempreature2", temp2.innerText);



        })

}