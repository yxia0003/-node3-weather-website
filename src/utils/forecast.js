const request = require('request')

const forecast = (latitude, longtitude,  callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=199ddb9ddaac431c228f717adc1cfde7&query=' + latitude + ',' + longtitude + '&units=f'

    request({url, json:true}, (error, {body} = {}) =>{
        if(error)
        {
            callback('connection error')
        }
        else if(body.error)
        {
            callback('unable to find location')
        }
        else
        {
            callback(undefined, "It is currently " + body.current.temperature + "degrees out. There is " + body.current.feelslike + " degree.")
        }
    })
}
module.exports = forecast