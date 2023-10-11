const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/token', require('./routes/tokenRoutes'));
app.use('/api/project', require('./routes/mainProjectRoutes'));
app.use('/api/github', require('./routes/githubRoutes'));
app.use('/api/taiga', require('./routes/taigaRoutes'));
app.use('/api/indicators', require('./routes/indicatorsRoutes'));
app.use('/api/factors', require('./routes/factorsRoutes'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});