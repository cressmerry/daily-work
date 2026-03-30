const express = require('express');
const app = express();
const notesRoutes  = require('./routes/notesRoutes');
console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrr##', notesRoutes);

app.use('/notes', notesRoutes); //middleware
app.use(express.json());
app.listen(3001, ()=>{
    console.log('server started');
})