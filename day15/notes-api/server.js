const express = require('express');
const app = express();
const notesRoutes  = require('./routes/notesRoutes');

app.use(express.json());
app.use('/notes', notesRoutes); //middleware
app.listen(3001, ()=>{
    console.log('server started at port 3001');
})

module.exports = app;