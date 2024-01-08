const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demo", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then((resonse)=>{
    console.log("connect successfully");
}).catch((err)=>{
    console.log("Error While connecting",err);
})