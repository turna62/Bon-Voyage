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

// Set up CORS middleware to allow requests from the client on a different port
app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
const uri = process.env.ATLAS_URI;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const http = require('http');
const server = http.createServer(app);



mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})



require("./user_schema")
require("./trip_plan")
require("./poll_schema")
require("./itinerary_schema")
require("./notifs_schema")
require("./dpoll_schema")

// require("./places_schema")

const User = mongoose.model("UserInfo"); // importing model
// const Place = mongoose.model("Places");
const TripStart = mongoose.model("TripPlan");
const PollStart = mongoose.model("Poll");
const ItineraryStart = mongoose.model("Itinerary");
const NotificationStart = mongoose.model("Notification");
const DPollStart = mongoose.model("dPoll");


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

app.post('/tripData2', (req, res) => {
  const { tripId } = req.body;

  // Find the trip with the matching tripId
  const trip = TripStart.find((trip) => trip.tripId === tripId);

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  const { startDate, endDate } = trip;
  res.json({ startDate, endDate });
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
    const userIdn = savedTripPlan.userId;

    const newNotification = new NotificationStart({
     
       message: `Your trip titled: ${tripName} has been created!`,
       username: user.username, // set the username to the user who 
       tripId: savedTripPlan._id,
       isCreatorNotification: true,
       userId: userIdn

       
    
    });
    await newNotification.save();

    res.status(200).json({ status: "OK!", tripId: savedTripPlan._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "na!" });
  }
});


app.post("/adddate", async (req, res) => {
  const { tripId, startDate, endDate } = req.body;

  try {
    
    const trip = await TripStart.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    trip.startDate = new Date(startDate).toLocaleDateString();
    trip.endDate = new Date(endDate).toLocaleDateString();

    await trip.save();

    res.status(200).json({ status: "OK!", updatedTrip: trip });
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
    const message = 
    
    `Dear user,


You have been invited to join a trip titled "${trip.tripName}", created by ${trip.createdBy}! Click the link below to accept the invitation and view further details:
    
    
http://localhost:5000/tripinvitation?tripId=${tripId}&userId=${userId}
    
    
We hope to see you soon on this exciting trip!
    
    
Best regards,
The BonVoyage! team`;
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

  // Check if the trip ID is valid
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const trip = await TripStart.findById(tripId);
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  const user = await User.findById(userId);

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
          "pendingInvitations.$.status" : 'accepted'
        }
      }
    );

    trip.addedMembers.push(userId);
    await trip.save();

    const existingNotification = await NotificationStart.findOne({ 
      tripId: tripId,
      message: `${user.username} has joined "${trip.tripName}"!`,
      username: user.username,
      isRead: false
    });
    
    if (existingNotification) {
      console.log('Notification already exists');
      return res.status(400).json({ error: 'Notification already exists' });
    } else {
      const users = trip.addedMembers;
      const userId1 = trip.userId;
      const notification = new NotificationStart({
        message: `${user.username} has joined ${trip.tripName}!`,
        tripId: tripId,
        users: users,
        username: user.username,
        userId: userId1
      });
      // save new notification to database
      await notification.save();
      console.log(notification);
    }
    

    
   

    //const existingNotification = await NotificationStart.findOne({ tripId: notification.tripId });
    
    


    // console.log('notification', notification);
   

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
  const { question, options, tripId, userId, addedMembers } = req.body;
  console.log(question, options, tripId, userId, addedMembers);

  const poll = new PollStart({
    question,
    //options: options.map((option) => ({ name: option, votes: 0 })), 
    options: options.map(option => ({ id: option.id, value: option.value, count : 0, userId:userId })),
    // Map options array to an array of objects with name and votes properties
    tripId,
    createdBy: userId, // Manually set createdBy to logged in user ID
    addedMembers: addedMembers || [] // Set addedMembers to empty array if it's null
  
  });

  //const users = trip.addedMembers;
  try {
    const trip = await TripStart.findById(tripId);
    const users = trip.addedMembers;
     const user = await User.findById(userId);
    const savedPoll = await poll.save();
    console.log(savedPoll);
    const notification = new NotificationStart({
      message: `${user.username} has created a poll titled "${savedPoll.question}"!`,
        tripId: tripId,
        users: users,
        username: user.username,
        userId: userId
    });
    await notification.save();
    res.json({ status: "OK!" });
  } catch (error) {
    console.error(error);
    res.json({ status: "Error saving poll!" });
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

 

app.post('/vote', async (req, res) => {
  const { pollId, optionId, userId , tripId} = req.body;
  console.log(tripId);
  try {
    const poll = await PollStart.findById(pollId);
    const trip = await TripStart.findById(tripId);
    console.log(tripId);
    const users = trip.addedMembers;
     const user = await User.findById(userId);
    
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check if user has already voted
    const hasVoted = poll.votes.some((v) => v.userId.toString() === userId.toString());
    if (hasVoted) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    const option = poll.options.find((o) => o.id === optionId);

    if (!option) {
      return res.status(400).json({ error: 'Option not found' });
    }

    const vote = { userId: userId, option: optionId, username: user.username };
    poll.votes.push(vote);
    option.count++;

    await poll.save();

    
    const notification = new NotificationStart({
      message: `${user.username} has cast their vote on poll: "${poll.question}"!`,
        tripId: tripId,
        users: users,
        username: user.username,
        userId: userId
    });
    await notification.save();
    
    res.json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/vote/change', async (req, res) => {
  const { pollId, optionId, userId, tripId } = req.body;
  
  try {
    const poll = await PollStart.findById(pollId);
    const trip = await TripStart.findById(tripId);
    const user = await User.findById(userId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const existingVoteIndex = poll.votes.findIndex((v) => v.userId.toString() === userId.toString());
    if (existingVoteIndex === -1) {
      return res.status(400).json({ error: 'User has not voted yet' });
    }

    const existingOptionId = poll.votes[existingVoteIndex].option;
    const existingOption = poll.options.find((o) => o.id === existingOptionId);
    if (existingOption) {
      existingOption.count--; // Decrease the count for the existing option
    }

    poll.votes.splice(existingVoteIndex, 1); // Remove the vote for the existing option

    await poll.save();

  
    res.json({ message: 'Vote changed successfully!' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/closepoll', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const poll = await PollStart.findById(pollId);
    

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (poll.closed) {
      return res.status(400).json({ error: 'Poll is already closed' });
    }

    poll.closed = true;
    await poll.save();

    // Calculate final result based on highest votes
    const options = poll.options;
    const sortedOptions = options.sort((a, b) => b.count - a.count); // Sort options by count in descending order

    if (sortedOptions.length >= 2 && sortedOptions[0].count === sortedOptions[1].count) {
      // There's a tie between the top two options, ask users to vote again
      poll.closed = false; // Open the poll for voting again
      await poll.save();

      return res.json({ message: 'Tie between top options. Please vote again.' });
    } else {
      // Single winner or clear majority
      const finalOption = sortedOptions[0];
      poll.winner = finalOption.value; // Set the winner value in the poll document
      await poll.save();

      return res.json({ message: 'Final result', winner: finalOption });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


app.post('/getwinner', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const poll = await PollStart.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const closed = poll.closed;
    if (!closed) {
      return res.status(400).json({ error: 'Poll is still open' });
    }

    if (!poll.winner) {
      return res.status(404).json({ error: 'Winner not determined yet' });
    }

    const winner = poll.winner;
    const question = poll.question;
    return res.json({ closed, winner, question });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});



app.post('/itinerary', async (req, res) => {
  const { tripId, days } = req.body;
console.log(tripId);
  const userId = req.body.userId;
  console.log(days);  const itinerary = new ItineraryStart({
    days: days.map((day) => ({
      description: day.description,
      activities: day.activities,
      day: day.day,
      spots: day.spots
    })),
    tripId:tripId,
    userId: userId 
  });
  try {
    await itinerary.save();
    res.send({ status: "OK!", itineraryId: itinerary._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to save.' });
  }
});


app.post('/newitinerary', async (req, res) => {
  const { tripId, days, itineraryId } = req.body;
  console.log(tripId);
  const userId = req.body.userId;
  console.log(days);
  
  try {
    const itinerary = await ItineraryStart.findOne({ _id: itineraryId });
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found.' });
    }
  
    // Append the new days to the existing days array
    itinerary.days = itinerary.days.concat(days.map((day) => ({
      description: day.description,
      activities: day.activities,
      day: day.day,
      spots: day.spots
    })));
    itinerary.tripId = tripId;
    itinerary.userId = userId;
  
    await itinerary.save();
  
    res.send({ status: "OK!", itineraryId: itinerary._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update the itinerary.' });
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

app.post('/notifications', async (req, res) => {
  const { tripId, userId } = req.body;

  try {
    let notifications;

    // Check if user is the creator of the trip
    const trip = await TripStart.findById(tripId);
    const isCreator = trip.userId.toString() === userId;
    


    if (isCreator) {
      // If user is the creator
      notifications = await NotificationStart.find({
        tripId: tripId,
      
        isCreatorRead: false
      });
    } else {
      // If user is not the creator, fetch all notifications except the trip created notification
      notifications = await NotificationStart.find({
        tripId: tripId,
        isCreatorNotification: false,
        isRead: false
      });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
});


app.put('/notifications/read', async (req, res) => {
  const { tripId, userId } = req.body;

  try {
    // Check if user is the creator of the trip
    const trip = await TripStart.findById(tripId);
    const isCreator = trip.userId.toString() === userId;

    // Update notifications as read for the current user
    const userNotificationsQuery = {
      tripId: tripId,
      isRead: false,
      users: { $in: [userId] } // Use $in operator to find the user in the users array
    };

    const userUpdate = { $set: { isRead: true } };

    // If the user is the creator, mark the creator notifications as read separately
    if (isCreator) {
      // Update notifications as read for the creator
      const creatorNotificationsQuery = {
        tripId: tripId,
       // isCreatorNotification: true,
        isCreatorRead: false
      };
      
      const creatorUpdate = { $set: { isCreatorRead: true } };
      
      await NotificationStart.updateMany(creatorNotificationsQuery, creatorUpdate);
    } else {
      // Update notifications as read for the users
      await NotificationStart.updateMany(userNotificationsQuery, userUpdate);
    }

    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
});

/// destination poll //lamia

app.post('/dcreatepoll', async (req, res) => {
  const { question, options, tripId, userId, addedMembers } = req.body;
  console.log(options, tripId, userId, addedMembers);

  try {
    const trip = await TripStart.findById(tripId);
    const users = trip.addedMembers;
    const user = await User.findById(userId);

    const poll = new DPollStart({
      options: options.map((option, index) => ({ value: option, id: index, count: 0 })),
      tripId: tripId,
      createdBy: userId,
      question: question
    });

    const savedPoll = await poll.save();
    console.log(savedPoll);

    const notification = new NotificationStart({
      message: `${user.username} has created a poll titled: ${savedPoll.question} to select a destination!`,
      tripId: tripId,
      users: users,
      username: user.username,
      userId: userId
    });

    await notification.save();

    res.json({ status: "OK!" });
  } catch (error) {
    console.error(error);
    res.json({ status: "Error saving poll!" });
  }
});

//getpoll destination

app.post('/dgetpolls', async (req, res) => {
  try {
    const tripId = req.body.tripId;
    // Find all trips created by the specified user
    const polls = await DPollStart.find({ tripId: tripId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", polls: polls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/dgetpollsbypollId', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    // Find all trips created by the specified user
    const polls = await DPollStart.find({ pollId: pollId });

    // Send the retrieved trips data as a response
    res.send({ status: "OK!", polls: polls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/// destination voting part

app.post('/dvote', async (req, res) => {
  const { pollId, optionId, userId , tripId} = req.body;
  console.log(tripId);
  try {
    const poll = await DPollStart.findById(pollId);
    const trip = await TripStart.findById(tripId);
    console.log(tripId);
    const users = trip.addedMembers;
     const user = await User.findById(userId);
    
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check if user has already voted
    const hasVoted = poll.votes.some((v) => v.userId.toString() === userId.toString());
    if (hasVoted) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    const option = poll.options.find((o) => o.id === optionId);

    if (!option) {
      return res.status(400).json({ error: 'Option not found' });
    }

    const vote = { userId: userId, option: optionId, username: user.username };
    poll.votes.push(vote);
    option.count++;

    await poll.save();

    
    const notification = new NotificationStart({
      message: `${user.username} has cast their vote on poll: "${poll.question}"!`,
        tripId: tripId,
        users: users,
        username: user.username,
        userId: userId
    });
    await notification.save();
    
    res.json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/dclosepoll', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const poll = await DPollStart.findById(pollId);
    

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (poll.closed) {
      return res.status(400).json({ error: 'Poll is already closed' });
    }

    poll.closed = true;
    await poll.save();

    // Calculate final result based on highest votes
    const options = poll.options;
    const sortedOptions = options.sort((a, b) => b.count - a.count); // Sort options by count in descending order

    if (sortedOptions.length >= 2 && sortedOptions[0].count === sortedOptions[1].count) {
      // There's a tie between the top two options, ask users to vote again
      poll.closed = false; // Open the poll for voting again
      await poll.save();

      return res.json({ message: 'Tie between top options. Please vote again.' });
    } else {
      // Single winner or clear majority
      const finalOption = sortedOptions[0];
      poll.winner = finalOption.value; // Set the winner value in the poll document
      await poll.save();

      return res.json({ message: 'Final result', winner: finalOption });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

//destination get winner

app.post('/dgetwinner', async (req, res) => {
  try {
    const pollId = req.body.pollId;
    const poll = await DPollStart.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const closed = poll.closed;
    if (!closed) {
      return res.status(400).json({ error: 'Poll is still open' });
    }

    if (!poll.winner) {
      return res.status(404).json({ error: 'Winner not determined yet' });
    }

    const winner = poll.winner;
    const question = poll.question;
    return res.json({ closed, winner, question });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/vote/dchange', async (req, res) => {
  const { pollId, optionId, userId, tripId } = req.body;
  
  try {
    const poll = await DPollStart.findById(pollId);
    const trip = await TripStart.findById(tripId);
    const user = await User.findById(userId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const existingVoteIndex = poll.votes.findIndex((v) => v.userId.toString() === userId.toString());
    if (existingVoteIndex === -1) {
      return res.status(400).json({ error: 'User has not voted yet' });
    }

    const existingOptionId = poll.votes[existingVoteIndex].option;
    const existingOption = poll.options.find((o) => o.id === existingOptionId);
    if (existingOption) {
      existingOption.count--; // Decrease the count for the existing option
    }

    poll.votes.splice(existingVoteIndex, 1); // Remove the vote for the existing option

    await poll.save();

  
    res.json({ message: 'Vote changed successfully!' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

///add destination

app.post("/adddestination", async (req, res) => {
  const { tripId, destination } = req.body;
console.log(destination, tripId);
  try {
    
    const trip = await TripStart.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

trip.destination = destination;

    await trip.save(); 

    res.status(200).json({ status: "OK!", updatedTrip: trip });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "na!" });
  }
});

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

