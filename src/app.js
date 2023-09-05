const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/project', require('./routes/mainProjectRoutes'));
app.use('/api/taigaTasks', require('./routes/taigaTasksRoutes'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});