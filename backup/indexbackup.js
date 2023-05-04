const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
//const { v4: uuidv4 } = require("uuid");
//const axios = require('axios');

const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ndvbfrt6ipybmdrfpicdlrebvek@)(dd205683dnnc{mcdk]?";
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const helmet = require("helmet");

app.use(helmet());

var nodemailer = require('nodemailer');
// var popup = require('popups');
const Token = require('./token');
const sendEmail = require("./email"); 
const passwordValidator = require('password-validator');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const uri = process.env.ATLAS_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})


require("./user_schema")
require("./trip_plan")
require("./poll_schema")
require("./itinerary_schema")

// require("./places_schema")

const User = mongoose.model("UserInfo"); // importing model
// const Place = mongoose.model("Places");
const TripStart = mongoose.model("TripPlan");
const PollStart = mongoose.model("Poll");
const ItineraryStart = mongoose.model("Itinerary");



function restrictionPassword(password) {
  const schema = new passwordValidator();
  
  schema
    .is().min(8)   // Minimum length 8
    .is().max(20)  // Maximum length 20
    .has().uppercase()  // Must have uppercase letters
    .has().lowercase()  // Must have lowercase letters
    .has().digits()  // Must have digits
    .has().symbols()  // Must have symbols
    .has().not().spaces()  // Should not have spaces

    const isValidP = schema.validate(password);
    console.log('Password validation result:', isValidP);
    return isValidP;
  // return schema.validate(password);
}

app.post("/register", async(req,res) => {
    const {username, email, password, confirmpassword} = req.body; // getting data

    if (!username || !email || !password || !confirmpassword ){
        return res.json({error: "Please fill all the fields!"});
      }
      // check password length
      if (password.length < 8 || password.length > 15) {
        return res.json({ error: "Password must be between 8 and 5 characters!"});
      }

  if (!restrictionPassword(password)) {
    console.log('Password is not valid');
    return res.status(400).json({ error: 'Invalid password' });
  }

      const isValid = validatePassword(password, confirmpassword);
  if (!isValid) {
      // res.send('Passwords do not match');
      return res.json({ error: "Passwords dont match!"});
  } 

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    
    try{
        const userFound = await User.findOne({email}); // email constraint 
                                                     // await so that for the next one, it gets time to execute
        
        if (userFound){
            return res.json({error: "User email already exists! Kindly use another email."}); // return will make sure this ends here and not execute the rest
        }
  

        const newUser = new User({
          username: username,
          email: email,
          password: encryptedPassword,
        });
      
        try {
          await newUser.save();
          res.status(200).json({ status: "OK!" });
        } catch (error) {
          res.status(500).json({ status: "Error!" });
        }// create new user in MongoDB
 
let token = await new Token({
  userId : newUser._id,
  token: crypto.randomBytes(32).toString("hex")
}).save();

const message = `Dear user, click on the link to verify your account! http://localhost:5000/verify/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", message);

    res.send("An Email sent to your account please verify");
  } catch (error) {
    // res.status(400).send("An erroruu occured");
  }
  

});

function validatePassword(password, confirmpassword) {
    if (password !== confirmpassword) {
      return false;
    }
    return true;
  }

app.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid Link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    // await User.updateOne({ _id: user._id}{} verified: true });
    await User.updateOne(
      {
        _id : user._id
      },
      {
        $set:
        {
          verified : true
        }
      }
    )
    await Token.findByIdAndRemove(token._id);
    res.send(`Email verified sucessfully! Click <a href="http://localhost:3000/sign-in">here</a> to login.`);

    

  } catch (error) {
    console.error(error);
    // res.status(400).send("An error occured");
  }
});

app.post("/login_user", async(req, res) => {
    const{email, password} = req.body;

    const userFound = await User.findOne({email});
    if(!userFound){
        return res.json({error: "User not found! Unsuccesful log in!"});
    }
    if(await bcrypt.compare(password, userFound.password)){ // compare original password with user-given password
                                                            // at first, decrypt the original one
        const token = jwt.sign({email: userFound.email }, JWT_SECRET,{ // generating token
            expiresIn: 864000// token will expire after 864000 seconds
        }); 

        

        if (res.status(201)){
            return res.json({status: "OK!", data: token ,userId: userFound._id}); // passing token as well
        } else {
            return res.json({error: "Error!"});
        }
    }
    res.json({status: "Error!", error: "Invalid Password!"});
});


app.post("/userData", async (req, res) =>{
  const {token, userId} = req.body; // get data through token
  console.log(userId, token);
  try{
      const user = jwt.verify(token, JWT_SECRET); // verify if this token is true or not with the help of JWT_SECRET
      console.log(user);
      const userid = userId;
      User.findOne({ _id: userid }).then((data) =>{ // finding user
          if(!data){
              return res.send({status: "Error!", data: "Invalid user ID!"});
          }
          res.send({status: "OK!", data: data});
      })
      .catch((error) => {
          res.send({status: "Error!", data: error});
      });
  } catch (error) {
      console.log(error);
      return res.send({status: "Error!", data: "Invalid token!"});
  }
});


app.post("/tripData", async (req, res) =>{
  const {tripId} = req.body; // get data 
  console.log(tripId);
  try{
     
      const tripid = tripId;
      TripStart.findOne({ _id: tripid }).then((data) =>{ // finding trip
          if(!data){
              return res.send({status: "Error!", data: "Invalid trip ID!"});
          }
          res.send({status: "OK!", data: data});
      })
      .catch((error) => {
          res.send({status: "Error!", data: error});
      });
  } catch (error) {
      console.log(error);
      return res.send({status: "Error!", data: "Invalid!"});
  }
});


      app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = JWT_SECRET + userFound.password;
      const token = jwt.sign({ email: userFound.email, id: userFound._id }, secret, {
        expiresIn: "5m",
       });
       const link = `http://localhost:5000/reset-password/${userFound._id}/${token}`;
       console.log(link);
     var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "bonvoyage562@gmail.com",
        pass: "zyloiqsivpzuyxlz",
    }});
    var mailOptions = {
        from: "bonvoyage562@gmail.com",
        to: "shairasadia@iut-dhaka.edu, sadia.shaira03@gmail.com",
        subject: "Bon Voyage! - Reset Password",
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    } catch (error) {}
      });
    

    

      app.get("/reset-password/:id/:token", async (req, res) => {
        const { id, token } = req.params;
        console.log(req.params);
        
         const userFound = await User.findOne({ _id: id });
         if (!userFound) {
           return res.json({ status: "User Not Exists!!" });
         }
         const secret = JWT_SECRET + userFound.password;
         try {
           const verify = jwt.verify(token, secret);
           res.render("index", { email: verify.email, status: "Not Verified" });
        // res.send("Verified");
         
         } catch (error) {
           console.log(error);
          res.send("Not Verified");
        }
        // res.send("Done");
      });

      app.post("/reset-password/:id/:token", async (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;
      
        const userFound = await User.findOne({ _id: id });
        if (!userFound) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + userFound.password;
        try {
          const verify = jwt.verify(token, secret);
        //   res.send("Verified");
          const encryptedPassword = await bcrypt.hash(password, 10);
          await User.updateOne(
            {
             _id: id,
             },
             {
               $set: {
                 password: encryptedPassword,
               },
             }
           );
           res.json({ status: "Password Updated"});
      
           res.render("index", { email: verify.email, status: "verified" });
        } catch (error) {
          console.log(error);
        //   res.json({ status: "Something Went Wrong" });
        res.send("Not Verified");
        }
      });


//       app.get ("/log-out", async (req, res) => {
//         try{
// req.session.destroy();
// res.redirect ('/sign-in');
//         }
//         catch(error){
// console.log(error.message);
//         }
//       });


app.post("/insert", async (req, res) => {
  const { tripName, destination, startDate, endDate, members } = req.body;
  const userId = req.headers.authorization;

  const existingTripPlan = await TripStart.findOne({ userId: req._id, tripName: req.body.tripName });
  if (existingTripPlan) {
    return res.status(409).json({ message: 'Trip plan already exists for this user' });
  }

  try {
  
    const user = await User.findById(userId);

    const newTripPlan = new TripStart({
      tripName: tripName,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      members: members,
      userId: userId,
      createdBy: user.username // add the user's name to the createdBy field
    });

    console.log(user.username);
    const savedTripPlan = await newTripPlan.save();

    // Update the user's trips array with the new trip ID
    await User.updateOne({ userId }, { $push: { trips: savedTripPlan._id } });

    res.status(200).json({ status: "OK!", tripId: savedTripPlan._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "na!" });
  }
});


app.post('/add-member', async (req, res) => {
  const { tripId, email } = req.body;
  console.log(tripId, email);

  // Check if the trip ID is valid
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  // Find the trip in the database
  const trip = await TripStart.findById(tripId);

  // Check if the trip exists
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  // Check if the email has already been added to the collaborators array
  if (trip.collaborators.includes(email)) {
    return res.status(400).json({ message: 'Email has already been invited to the trip' });
  }

  try {

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    let userId;
    if (!user) {
      // Create a new user with the provided email
      user = new User({ email });
      await user.save();
      userId = user._id;
    } else {
      userId = user._id;
    }

    // Add the trip ID to the user's trips array
    user.trips.push(tripId);

    // Add the user ID to the addedMembers array of the trip
    trip.addedMembers.push(userId);

    // Add the email to the collaborators array of the trip
    trip.collaborators.push(email);

    // Add the trip ID and status to the pendingInvitations array of the user
    user.pendingInvitations.push({ tripId: tripId, status: 'pending' });

    // Save the updated user and trip objects to the database
    await user.save();
    await trip.save();

    // Send an invitation email to the added member
    const message = `Dear user, you have been invited to join this trip! http://localhost:5000/tripinvitation?tripId=${tripId}&userId=${userId} `;
    await sendEmail(user.email, "Invitation ", message);
    console.log('Invitation email sent to ' + email);

    res.status(200).json({ status: "OK!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
});


app.get('/tripinvitation', async (req, res) => {
  const { tripId, userId } = req.query;
  const trip = await TripStart.findById(tripId);
try{
  if (!trip) {
    return res.status(404).json({ error: 'Invalid trip ID' });
  }

  // redirect the user to a page where they can accept or decline the invitation
  res.redirect(`http://localhost:3000/tripinvitation?tripId=${tripId}&userId=${userId}`);
}
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




app.post('/tripinvitation/accept', async (req, res) => {
  const { tripId, userId } = req.body;
console.log(tripId, userId);
  // Check if the trip ID is valid
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }


  // Check if the user ID is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  

  // Find the trip in the database
  const trip = await TripStart.findById(tripId);


  // Check if the trip exists
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  
  // Check if the user is already a member of the trip
  // if (trip.addedMembers.includes(userId)) {
  //   return res.status(400).json({ message: 'User is already a member of the trip' });
  // }console.log('iiiii5');
  const user = await User.findById(userId);


//onsole.log('pendingInvitation', pendingInvitation);
  console.log('iiiii5');
  try {
  

    await User.updateOne(
      {
        _id : userId,
        pendingInvitations: {
          $elemMatch: {
            tripId: tripId,
            status: 'pending'
          }
        }
      },
      {
        $set:
        {
          "pendingInvitations.$.status" : 'accepted'
        }
      }
    );
    

    // Add the user to the trip's "members" array
    trip.addedMembers.push(userId);

    // Save the updated trip object to the database
    await trip.save();


    // Redirect the user to the trip details page
   // res.redirect(`http://localhost:3000/detailtripplan?userId=${userId}&tripId=${tripId}`);
   res.status(200).json({ status: "OK!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
});


app.post('/tripinvitation/decline', async (req, res) => {
  const { tripId, userId } = req.body;

  // Find the trip in the database
  const trip = await TripStart.findById(tripId);
  
  // Check if the trip exists
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  
  // Check if the user has a pending invitation for this trip
  
  try {
    await User.updateOne(
      {
        _id: userId,
        pendingInvitations: {
          $elemMatch: {
            tripId: tripId,
            status: 'pending'
          }
        }
      },
      {
        $set: {
          "pendingInvitations.$.status": 'declined'
        }
      }
    );

    // Save the updated trip object to the database
    await trip.save();
    
    // Redirect the user to the trip details page
    // res.redirect(`http://localhost:3000/detailtripplan?userId=${userId}&tripId=${tripId}`);

    res.status(200).json({ message: 'Invitation declined' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.get("/getDestination", async (req, res) => {
  try {
    // const lookDestination = await TripStart.find({});
    const lookDestination = await TripStart.find({}).select('destination');
    res.send({ status: "ok", data: lookDestination });
  } catch (error) {
    console.log(error);
  }
});



app.post('/trips', async (req, res) => {
  try {
    const userId = req.body.userId;
    // Find all trips created by the specified user
    const trips = await TripStart.find({ userId: userId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", trips: trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.post('/joinedtrips', async (req, res) => {
  try {
    const userId = req.body.userId;
    // Find all trips created by the specified user
    const trips = await TripStart.find({ addedMembers: userId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", trips: trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/createpoll', async (req, res) => {
  const { question, options, tripId, userId } = req.body;
console.log(question, options, tripId, userId);

  console.log(1)
;  const poll = new PollStart({
    question,
    // options: options.map((option) => ({ name: option, votes: 0 })), // Map options array to an array of objects with name and votes properties
    tripId,
    options: options.map(option => ({ id: option.id, value: option.value })),
  
    createdBy: userId // Manually set createdBy to logged in user ID
  });

  

  try {
    await poll.save();
    res.send({ status: "OK!" });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create poll.' });
  }
});

 


app.post('/getpolls', async (req, res) => {
  try {
    const tripId = req.body.tripId;
    // Find all trips created by the specified user
    const polls = await PollStart.find({ tripId: tripId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", polls: polls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/getpollsbypollId', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    // Find all trips created by the specified user
    const polls = await PollStart.find({ pollId: pollId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", polls: polls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/itinerary', async (req, res) => {
  const { destination, tripId } = req.body;
console.log(destination, tripId);
  const userId = req.body.userId;
  console.log(1)
;  const itinerary = new ItineraryStart({
    destination,
    
    tripId,
    
  
  
    userId: userId // Manually set createdBy to logged in user ID
  });

  

  try {
    await itinerary.save();
    res.send({ status: "OK!", itineraryId: itinerary._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to save.' });
  }
});


app.post("/itineraryData", async (req, res) =>{
  const {itineraryId} = req.body; // get data 
  console.log(itineraryId);
  try{
     
      const itineraryid = itineraryId;
      ItineraryStart.findOne({ _id: itineraryid }).then((data) =>{ // finding trip
          if(!data){
              return res.send({status: "Error!", data: "Invalid itinerary ID!"});
          }
          res.send({status: "OK!", data: data});
      })
      .catch((error) => {
          res.send({status: "Error!", data: error});
      });
  } catch (error) {
      console.log(error);
      return res.send({status: "Error!", data: "Invalid!"});
  }
});


const pollData = require("./options.json");
app.get("/poll", function (req, res) {
  res.send(pollData);
});

app.post("/poll", function (req, res) {  
  if (req.body) {
    fs.writeFileSync("data.json", JSON.stringify(req.body));
    res.send({
      message: "Data Saved",
    });
  } else {
    res.status(400).send({
      message: "Error No Data",
    });
  }
});

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});