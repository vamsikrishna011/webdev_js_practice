const express = require("express")
const PORT = 3000;
const app = express();

app.use(express.json());

var users = [];
var usernames = [];
app.post('/signup', function handleSignup(req,res) {
  var user = req.body;
  user['uniqueID'] = Date.now();
  if (usernames.includes(user.username)){
    res.status(400).send("Bad Request")
  }
  else {
    usernames.push(user.username);
    users.push(user)
    res.status(200).send(users);
  }
  
})

app.post('/login', function handleLogin(req,res) {
  var user = req.body;
  var userbody;
  var gotit = false;
  for (let i = 0; i < users.length; i++){
    if(users[i].username === user.username && users[i].password === user.password){

      gotit = true;
      userbody = users[i];
      break;
    }
  }

  if(gotit){
    res.status(200).json({FirstName : userbody.firstName, LastName : userbody.lastName, U_ID: userbody.uniqueID});
  }
  else{
    res.status(401).send("Unauthorized");
  }

})

app.get('/data', function handleData(req,res) {
  var username = req.headers.username;
  var password = req.headers.password;
  var gotit = false;
  var userbody;
  for (let i = 0; i < users.length; i++){
    if(users[i].username === username && users[i].password === password){

      gotit = true;
      userbody = users[i];
      break;
    }
  }

  if(gotit){
    res.status(200).json({FirstName : userbody.firstName, LastName : userbody.lastName, U_ID: userbody.uniqueID});
  }
  else{
    res.status(401).send("Unauthorized");
  }

})

app.listen(PORT, function started() {
  console.log(`Example app listening at port ${PORT}`);
})