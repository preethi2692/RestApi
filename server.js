const express = require('express');
const assert = require('assert');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/index');
const PORT = Number(process.env.PORT || 3000);
const contactRoute = require('./route/contact.route');
const courseRoute = require('./route/course.route');
const studentRoute = require('./route/student.route');
const trainerRoute = require('./route/trainer.route');

const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//dbconnection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true })
.then((res) => {
    console.log('database connected');
})
.catch((err) => assert.equal(err, null));

//setup cors
app.use(cors());

//config route

app.use('/api/v1', [contactRoute]);
app.use('/api/v1', [courseRoute]);
app.use('/api/v1', [studentRoute]);
app.use('/api/v1', [trainerRoute]);

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}/api/v1`);
});
