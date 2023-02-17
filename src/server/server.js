require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { REACT_APP_SERVER_PORT } = process.env;

const sequelize = require('./util/database');

const Entry = require('./models/entry');
const User = require('./models/user');
const Wellness_score = require('./models/wellness');

const app = express();

app.use(cors())
app.use(express.json());

app.post('/register');
app.post('/login');

Entry.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
Wellness_score.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Entry);
User.hasMany(Wellness_score);


sequelize.sync()
    .then(res => {
        app.listen(REACT_APP_SERVER_PORT, () => {
            console.log(`server running on port ${REACT_APP_SERVER_PORT}`)
        });
    })
    .catch(err => {
        console.log(err)
    });

