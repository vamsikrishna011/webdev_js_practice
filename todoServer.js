const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const todos = require('./toDos.json');

function updateFile(todos){
  fs.writeFile('toDos.json', JSON.stringify(todos, null, 2) , (err) => {
    if (err){
      console.log("error");
    }
    console.log("Success");
  })
}

app.use(bodyParser.json());

  
app.get('/todos', function retrieveAll(req,res) {
  res.status(200).json(todos);
})


app.get('/todos/:id', (req,res) => {
  var ID = req.params.id;
  var todos_ids = Object.keys(todos);
  if (todos_ids.includes(ID)){
    res.send(todos[ID]);
    return;
  } 
  res.status(404).send("Not Found");
})

app.post('/todos', (req,res) => {

  var title = req.body.title;
  var completed = req.body.completed;
  var description = req.body.description;

  var id_size = Math.floor(Math.random() * 1000000);

  todos[String(id_size)] = {title : title, completed : completed, description: description}

  updateFile(todos);

  res.json({id : id_size});

})

app.put('/todos/:id', (req,res) => {
  var ID = req.params.id;
  var title = req.body.title;
  var completed = req.body.completed;
  var todos_ids = Object.keys(todos);
  if (todos_ids.includes(ID)){
    todos[ID].title = title;
    todos[ID].completed = completed;
    updateFile(todos);
    res.send("Updated Successfully");
    return;
  }
  res.status(404).send("Not Found");
})

app.delete('/todos/:id', (req,res) => {
  var ID = req.params.id;
  delete todos[ID];
  updateFile(todos);
  res.send("Deleted Succesfully");
})

app.listen(3000, () => {
  console.log("App running at port 3000");
})