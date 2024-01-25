const mongoose = require("mongoose");
const app = require('./app');
const e = require("express");

const DB_HOST = "mongodb+srv://Natalia:QkXr0l3nIbvmxZQN@cluster0.izstgc4.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
.then(()=> {
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

})
.catch(error => {
  console.log(error.message);
  process.exit(1)
})
