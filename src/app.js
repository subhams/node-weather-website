const path = require('path')
const express = require('express')
const { response } = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars Engine and views Llocation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Index',
        name : 'Subham'
    })
})
app.get('/index', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }
 



        geoCode(req.query.address, (error, {latitude , longitude , location} = {}) => {
            if (error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    res.send({error})
                }

                res.send({
                    forecast : forecastData,
                    location,
                    address: req.query.address
                })
              })
        })
        
       
    })

    
    // res.send({
    //     address: req.query.address
    // })
// })
app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search object'
        })
    }
    console.log(req.query.search)
    res.send({
      products: []
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name : 'Subham'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Subham'
    })
})

app.get('/help/*', (req, res) =>{
    res.render('page404', {
        title: 'Help',
        name: 'Subham',
        errorMsg : 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('page404', {
        title: '404',
        name: 'Subham',
        errorMsg : 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})