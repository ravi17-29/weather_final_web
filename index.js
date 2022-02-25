const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homefile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempval,orgval) => {
let temperature = tempval.replace('{%tempval%}',orgval.main.temp);
temperature = temperature.replace('{%tempmin%}',orgval.main.temp_min);
temperature = temperature.replace('{%tempmax%}',orgval.main.temp_max);
temperature = temperature.replace('{%location%}',orgval.name);
temperature = temperature.replace('{%country%}',orgval.sys.country);
temperature = temperature.replace('{%temperaturestatus%}',orgval.weather[0].main);

return temperature;

}

const server = http.createServer((req,res) => {
    if(req.url=="/"){
        requests(
          "https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=cff892892d3e285d2038403d74c22898", )
        .on('data',  (chunk)=> {
            const objdata = JSON.parse(chunk);
            const arrData =[objdata];
         
          const realTimeData = arrData.map((val) => replaceVal(homefile,val)).join("");
         res.write(realTimeData);
        })
        .on('end',  (err) => {
          if (err) return console.log('connection closed due to errors', err);
         
          console.log('end');
        });
    }
});
server.listen(8000,"https://git.heroku.com/weather-statu.git");