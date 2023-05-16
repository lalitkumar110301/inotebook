const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

// cors is used to allow browser to make api calls from localhost
app.use(cors())

// connection to mongodb
connectToMongo().then(()=>{
    console.log("connected to mongodb successfully")
}).catch((e) => console.log(e));


// middleware to pass the req.body param
app.use(express.json())

// available routes
app.use('/api/auth/', require('./routes/auth.js'))
app.use('/api/notes/', require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})