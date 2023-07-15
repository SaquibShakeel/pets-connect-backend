require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const db = require('./config/db');

app.use(express.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(corsOptions));

const authRouter = require('./routers/auth.routes');
const petRouter = require('./routers/pet.routes');
const imageRouter = require('./routers/image.routes');

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);


app.use('/api/auth', authRouter);
app.use('/api/pets', petRouter);
app.use('/api/imageUrl', imageRouter);

app.listen(port, () => {
    console.log(`Pets Connect app listening at http://localhost:${port}`);
    }
);
