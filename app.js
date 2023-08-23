require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const authRouter = require('./routes/userRoute');


const errorHandlerMiddleware = require('./middleware/error-handler');
const notfoundMiddleware = require('./middleware/not-found');

app.use(morgan('tiny'));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('<h1>Hello world</h1><br><h1> welcome to my User Management API!</h1><a href="localhost:6000/api/ums/login/dashboard">View Documentation</a>');
});

app.use('/api/ums', authRouter);

app.use(notfoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;
const start = async () => {
    try {
        await connectDB(process.env.CONNECTION_URI)
        app.listen(port, () => {
            console.log(`server listening on Port: ${port}`);
        })
    } catch (error) {
        console.error(error);
    }
}

start();
