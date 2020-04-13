const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    url = 'https://api.darksky.net/forecast/d3fe03edc0e0f2f329899f5f4b5ca00a/'+latitude+','+longitude +'?units=si'
    request({url, json: true}, (error, {body} )=>{
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 'It is currently '+ body.currently.temperature+ ' degrees out. There is a '+ body.currently.precipProbability+ '% chance of rain.')
        }
    })
}
module.exports = forecast 




// url = 'https://api.darksky.net/forecast/d3fe03edc0e0f2f329899f5f4b5ca00a/37.8267,-122.4233?units=si'

// request({url: url, json: true}, (error, response)=>{
//     if (error){
//         console.log('Unable to connect to weather service!')
//     }
//     else if (response.body.error){
//         console.log('Unable to find location!')
//     }
//     else {
//         console.log('It is currently '+response.body.currently.temperature
//         +' degrees out. There is a '+ response.body.currently.precipProbability+
//         '% chance of rain.')

//     }
// })