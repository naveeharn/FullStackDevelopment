const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./configuration/database')
const path = require('path')
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname, '../','frontend','build','index.html')))
} else {
    app.get('/', (req, res)=> res.send('Please set to production in .env'))
}

app.use(errorHandler) // not place before "app.use('/api/goals', require('./routes/goalRoutes'))"

app.listen(port, ()=>{ 
    console.log(`Server started on port ${port} : ${new Date().toLocaleString()}`);
})
