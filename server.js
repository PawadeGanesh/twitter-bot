const express = require('express');
const app = express();
const mongoose = require('mongoose');
const twitter = require('./routes/twitter');

app.use(express.json());

mongoose
	.connect('mongodb://localhost/twitter', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('connected to mongoDB...'))
	.catch((err) => console.log(err));

app.use('/twitter', twitter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`connected to port${port}...`));
