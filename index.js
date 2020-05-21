
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    generatePDF = require('./functions/generatePDF'),
    cors = require('cors')

app.use( bodyParser.json( { limit: "10mb" } ) )
app.use( bodyParser.urlencoded( { limit: "10mb", extended: true } ) )
app.use(cors())
app.post('/generatePDF', async (req, res) => {

    let pdf = await generatePDF(req.body.html, req.body.css)
    res.send(pdf)

})

// Start up the application on the given port
app.listen( 9938, () => console.log('App Listening on 9938'))
