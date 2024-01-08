const express = require('express')
var bodyParser = require('body-parser')
const user = require('./userModel')

var cors = require('cors')
const app = express();

app.use(cors())
const port = 3032

require('./db')
//add user
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/addUser', async (req, res) => {
  try {
    const { name, dob, salary, joiningDate, relievingDate, contact, status } = req.body;
    const newUser = new user(
      {
        name: name,
        dob: dob,
        salary: salary,
        joiningDate: joiningDate,
        relievingDate: relievingDate,
        contact: contact,
        status: status


      }
    );

    await newUser.save();
    res.status(201).json({ success: true, message: "User Create Successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/getUser', async (req, res) => {
  try {
    const data = await user.find()
    if (!data ) {
      res.status(200).json("data  Not found");
      
    }
    res.status(200).json({ message: "data found successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

})

app.put('/updateUser', async (req, res) => {
  try {
    const {_id}=req.query;
    const { name, dob, salary, relievingDate, joiningDate, contact, status, } = req.body;

    const updatedResult = await user.findByIdAndUpdate(
      { _id: _id },
      {
        name: name, dob: dob, salary: salary, relievingDate: relievingDate, joiningDate: joiningDate, contact: contact, status: status
      },{new:true}
    );
    await  updatedResult.save()
    res.status(200).json({ success: true, message: "User Update Successfully", data: updatedResult });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

app.delete('/deleteUser/:_id', async (req, res) => {
  try {
    const { _id } = req.params

    const updatedResult = await user.findByIdAndDelete({ _id })
    if(!updatedResult){
      res.status(404).json({ success: true, message: "User Note Found", data: null });
    }
    res.status(200).json({ success: true, message: "User Deleted Successfully", data: null });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})
app.get('/getUserDetail', async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await user.findOne({ _id: _id })
    if (data) {
      res.status(200).json({ message: "data found successfully", data });
    } else {
      res.status(200).json("data  Not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

