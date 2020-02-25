const fetch = require('node-fetch');
const admin = require('firebase-admin');
const fs = require('fs');

const rawData = fs.readFileSync('demohood-firebase-sdk-config.json');
const config = JSON.parse(rawData)

// Initialize the firebase Admin SDK 
admin.initializeApp({
    credential: admin.credential.cert(config)
});
const db = admin.firestore(); 

const express = require('express');
const cronJob = require('cron').CronJob

const app = express();
var path = require('path');

//These are like imports

//Tell our Express Server What File Directory to use
app.use(express.static(__dirname + '/dist/angular-density-altitude'));

//Tell Our Express Server What Port to listen on
app.listen(process.env.PORT || 8090); //localhost/8090 if it fails

//Start Angular App via index file
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/angular-density-altitude/index.html'));
})

console.log('Console listening on port 8090');

// var j = schedule.scheduleJob({hour: 09, minute: 00}, function(){
//     Create DB stuff here for all DZs
// });

//You'll need to adjust these for different time zones
// var j = schedule.scheduleJob({hour: 14, minute: 00}, function(){
//     Create DB stuff here for all DZs
// });

// We'll use this instead of the above - The functionality is 
// simplier to use


function getData(){
    API_KEY = 'a641de02f55d14465d55e5fd6edb7506'
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=95616,us&appid=${API_KEY}`)
}

  



let job = new cronJob('* * * * * *', function(){

    getData()
    .then(response => response.json())
    .then(data => {
      weather = data;
            let name = data.name;
            let temp = weather.main.temp;
            let cels = Math.round(temp - 273.15);
            let fahr = Math.round(cels * 1.8 + 32);
            let press = weather.main.pressure;
  
            
            console.log(`The temp is ${cels} in Celcius, and ${fahr} in Far. The press is ${press} `)
            db.collection('testWeather').add({
                temp: temp,
                cels: cels,
                fahr: fahr,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                zipCode: '95616',
                pressure: press
            })
                .then( docRef => {
                    console.log(docRef.id)
                })
    })
    .catch(err => {
      console.log(err)
    })

    console.log('This should keep happening')
})

job.start()