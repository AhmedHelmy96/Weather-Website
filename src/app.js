const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Defining paths for express configuration.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setting up handelbars engine, and views path.
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up static directory.
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ahmed Helmy'
    })
})
app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Me',
        name:'Ahmed Helmy'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        helpText:'Please contact us if you require something.',
        title:'Help',
        name:'Ahmed Helmy'
    })
})
app.get('/weather', (req, res) => {
    
    const address = req.query.address
    if (!address){
        return res.send({
            error:'Please provide an address.'
        })
    }

    geocode(address, (error, {latitude,longitude, location } = {})=>{
        if (error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData ,
                location,
                address: req.query.address

            })
            
          })
    
    })

})
app.get('/products', (req, res)=>{
      console.log(req.search)
    if (!req.query.search){
       return res.send({
            error:'You must provide a search term.'
        })
    }

    res.send({
        products:[]
    })

})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
       name:'Ahmed Helmy',
       errorMessage:'Help article not found.'
    })
})
app.get('/*',(req, res)=>{
    res.render('404',{
       title:'404',
       name:'Ahmed Helmy',
       errorMessage:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})