require("dotenv").config();
var express = require("express");
const helmet = require("helmet");

// Routes Import
var testRouter = require("./routes/test.routes");

// Initialize Express
var app = express();
var port = process.env.PORT || 4000;

// App Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API Routes
app.use(testRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "404 No such route exists",
  });
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: "Internal Server Error",
  });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Application Running on http://localhost:${port}`);
});
