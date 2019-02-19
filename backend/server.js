const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const champsArr = require('./champs/champions.json');
const champs_map = new Map();
for(c of champsArr){
    champs_map.set(c.key,c.name);
}

const app = express();
const port = process.env.PORT||3000;

const path = require('path');
const publicPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(publicPath));

app.use(bodyParser.json());

app.listen(port,()=>{
    console.log('Table Service port 3000');
});

const key = `?api_key=RGAPI-3f494a1d-a621-4dda-ad96-715a0fb579af`;
const riot_url = `https://la1.api.riotgames.com`;
const account_url = `/lol/summoner/v4/summoners/by-name/`; 
const mastery_url = `/lol/champion-mastery/v4/champion-masteries/by-summoner/`;


app.post('/getData', function(req, res) {
    let name = req.body.name;
    fetch(riot_url+account_url+name+key)
    .then(res => res.json())
    .then(json => {
        summonerName = json.name;
        return fetch(riot_url+mastery_url+`${json.id}`+key);
    }).then((data)=>{
       return data.json();
    }).then((json)=>{
            res.send([champs_map.get(`${json[0].championId}`),
            champs_map.get(`${json[1].championId}`),
            champs_map.get(`${json[2].championId}`)]);
     });
});