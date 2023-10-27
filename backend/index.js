const connectToMongo = require('./db');
const express = require('express');
// Import the cors to fix the cors error
const cors = require('cors');
connectToMongo();
const app = express()
const port = 5000
app.use(cors());
  // We can create a route like this too but it is not effecient

app.use(express.json());
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, () => {
  console.log(`I-Notebook backend listening at http://localhost:${port}`)
})