const express = require("express");
const app = express()

// db connection
const db = require('./helper/db.js')();

//Models
const User = require("./models/User")
const Task = require("./models/Task")
const Code = require("./models/Code")

//USERS
app.get("/users", (req, res,next) => {
    const promise = User.find({ })
    promise.then((data)=>{
      if (!data) {
        next({message: "User verisi yok"})
      }
      res.json(data)
    }).catch((err)=>{
      res.json(err.message)
    })
})

app.post("/user", (req, res) => {
   
})

app.delete("/user", (req, res) => {

})

app.put("/user", (req, res) => {

})

//TASKS
app.get("/tasks", (req, res,next) => {
  const promise = Task.find({ })
  promise.then((data)=>{
    if (!data) {
      next({message: "Task verisi yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err.message)
  })
})

app.post("/tasks", (req, res) => {
  const task = new Task(req.body)

  const promise = task.save()
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })  
})

app.put("/tasks/:taskid",(req,res,next)=>{

  const promise = Task.findOneAndUpdate({ _id: req.params.taskid },{ status: req.body.status },{ new: true } /* Güncellenen veriyi döndüren seçenek*/)

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
})


//CODES
app.get("/codes", (req, res,next) => {
  const promise = Code.find({ })
  promise.then((data)=>{
    if (!data) {
      next({message: "Code cevabı yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err.message)
  })
})

app.post("/codes", (req, res) => {
  const code = new Code(req.body)

  const promise = code.save()
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })  
})


module.exports = {
    path: "/api",
    handler: app
}