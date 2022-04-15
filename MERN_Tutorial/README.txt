00 Prepare Tool

cd in your project path

npm init 
npm i express dotenv mongoose colors
npm i -D nodemon

edit package.json
    "main":"server.js",
    "scripts": {
        "start": "node backend/server.js",
        "server": "nodemon backend/server.js"
    },

npm run server

create and edit .gitignore
    node_modules
    .env

create and edit .env    
    NODE_ENV = development
    PORT = 8000
    MONGO_URI = mongodb+srv://naveeharn:<password>@nvhcluster0.3nrw4.mongodb.net/MERN_Tutorial
?retryWrites=true&w=majority

create floder : configuration, file : database.js
    const mongoose = require('mongoose')
    const connectDB = async () => {
        console.log('connecting to mongoDB : ',new Date().toLocaleString());
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB connected at ${conn.connection.host} :  ${new Date().toLocaleString()}`.underline);
        } catch (error) {
            console.log(error);
            process.exit(1)
        } 
    }
    module.exports = connectDB

create floder : routes, file : goalRoutes.js
    router.get('/', (req,res)=>{
        res.status(200).json({
            message: 'Get Goals'
        })
    })
    router.post('/', (req,res)=>{
        res.status(200).json({
            message: 'Set Goals'
        })
    })
    router.put('/:id', (req,res)=>{
        res.status(200).json({
            message: 'Update Goals'
        })
    })
    router.delete('/', (req,res)=>{
        res.status(200).json({
            message: 'Delete Goals'
        })
    })

create floder : middleware, file : errorMiddleware.js
    const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({
        message : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })}
    module.exports = {
        errorHandler
    }

create file : server.js
    const express = require('express')
    const colors = require('colors')
    const dotenv = require('dotenv').config()
    const port = process.env.PORT || 5000
    const connectDB = require('./configuration/database')
    const {errorHandler} = require('./middleware/errorMiddleware')
    connectDB()
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use('/api/goals', require('./routes/goalRoutes'))
    app.use(errorHandler) // not place before "app.use('/api/goals', require('./routes/goalRoutes'))"
    app.listen(port, ()=>{ 
        console.log(`Server started on port ${port} : ${new Date().toLocaleString()}`);
    })

npm i bcryptjs
npm i jsonwebtoken

npx create-react-app@latest frontend --template redux 

# set registry value
npm config set registry "https://skimdb.npmjs.com/registry"
# revert change back to default
npm config delete registry

cd frontend
npm i react-router-dom
npm i react-icons

cd MERN_Tutorial
npm i -D concurrently

cd frontend
npm i axios react-toastify
npm install --save react-toastify
yarn add react-toastify
npm i hoist-non-react-statics