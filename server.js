const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require("./config/db");

// routes
const routes = require("./routes/routes");

dbConnect();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration (adjust as needed)
const corsOptions = {
    origin: 'http://localhost:5173', // Change to your front-end domain, or '*' for all domains
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // If you need to allow cookies or authentication headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

//routing path
app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

// route
app.use("/api", routes);


// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});