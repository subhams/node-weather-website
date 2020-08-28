const request = require('request')

const forecast = (lattitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=49723dbe9a62ff48021ab976f6b2eb50&query='+lattitude+','+longitude+'&units=m'
    request({ url, json: true},(error, {body}= {}) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. But it feels like ' + body.current.feelslike + 
            "\nIt is currently " +  body.current.weather_descriptions)
        }
    })
}



module.exports = forecast