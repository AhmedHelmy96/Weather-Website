const request = require('request') 

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWhtZWRoZWxteSIsImEiOiJjanU5eTUzNHowd2dkNDluenV0eXk2MDYxIn0.SEJOtPTI57cFJqlwm9BTug'
    
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to location server!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Please try another!', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode





 // geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWhtZWRoZWxteSIsImEiOiJjanU5eTUzNHowd2dkNDluenV0eXk2MDYxIn0.SEJOtPTI57cFJqlwm9BTug'
// request({url: geocodeUrl, json: true}, (error, response)=>{
//     if (error){
//         console.log('Unable to connect to location server!')
//     } else if (response.body.features.length === 0){
//         console.log('Unable to find location. Please try another!')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
    
//         console.log(latitude, longitude)
//     }
// })
