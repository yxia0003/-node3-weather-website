const express = require('express')
const path = require('path')
const hbs  = require('hbs')

const app = express()
const directoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "/templates/views")
const partialPath = path.join(__dirname, "/templates/partials")

console.log("test")

app.set('views', viewPath)
app.set('view engine', 'hbs')
app.use(express.static(directoryPath))
hbs.registerPartials(partialPath)

const request = require('request')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('', (req, res) =>{
    res.render("index", {
        title: 'Weather App',
        name: 'James Xia'
    })
})

app.get('/about', (req, res) =>{
    res.render("about", { name: 'James Xia'})
})

app.get('/help', (req, res) =>{
    res.render("Help", { name: 'James Xia'})
})


app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
       return res.send({
           error: "You must provide an address"}
       )
    }

    address = req.query.address;
    if(address)
    {
        geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if(error)
          {
            return res.send({
                error: "You must provide an address"})
          }
       
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error)
             {
                return res.send({
                    error: "You must provide an address"})
             }
    
             res.send({
                "Forcast": forecastData,
                "Location": location,
                "Address":address,
            })
          })
      })
    }
   
   

  //  res.send("Weaather Page", { name: 'James Xia'})
})

app.get('/products', (req, res) =>{
    if(!req.query.search)
    {
       return res.send({
           error: "You must provide a search term"}
       )
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render("error", {
        content: 'Help Article Not Found',
        title: 'Weather App',
        name: 'James Xia'
    })
})


app.get('*', (req, res) =>{
    res.render("error", {
        content: 'My 404 Page',
        title: 'Weather App',
        name: 'James Xia'
    })
})


app.listen(3000, () =>{
    console.log("server is up at port 3000")
})