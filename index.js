const express = require('express')
const bodyParser = require('body-Parser')
const supabaseClient = require('@supabase/supabase-js')

const dotenv = require('dotenv')

const app = express()
const port = 3000
dotenv.config()

app.use(bodyParser.json())
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/final', async (req, res) => {
    console.log('Attempting to get all customers')

    const {data, error} = await supabase.from('final').select()

    if (error){
        console.log(`Error: ${error}`)
        res.statusCode = 500
        res.send(error)
    } else {
        console.log(`Received Data:`, data)
        res.json(data)
    }

    
})

app.post('/final', async(req, res) => {
    console.log('Adding Customer')
    console.log(`Request: ${JSON.stringify(req.body)}`)

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    
    const {data, error} = await supabase.from('final').insert({
        Customer_First_Name: firstName,
        Customer_Last_Name: lastName,
    })
    .select()

    if(error) {
        console.log(`Error: ${error}`)
        res.statusCode = 500
        res.send(error)
    } else{
        res.json({})
    }

    
})



app.listen(port, () => {
    console.log(`App is available on port: ${port}`)
})