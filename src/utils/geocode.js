const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianhpYTg2IiwiYSI6ImNrcnd6ODB0NzA3ZXMybm5vdmlyeTFsMGoifQ.UPPxpb3m0kNr8nHPyK5t5Q&limit=1'

    request({url, json:true}, (error, {body})=>{
        if (error)
          {
             callback(error)
          }
        else if(body.features.length === 0)
        {
            callback('unable to find location, try another search')
        }  
        else
        {
            callback(undefined, {
                longtitude:body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode