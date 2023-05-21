const express = require("express");
const app = express()

// db connection
const db = require('./helper/db.js')();

//Models
const User = require("./models/User")
const Task = require("./models/Task")
const Code = require("./models/Code")
const Meeting = require("./models/Meeting")

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

//sadece text
app.put("/tasksText/:taskid",(req,res,next)=>{

  const promise = Task.findOneAndUpdate({ _id: req.params.taskid },{ text: req.body.text },{ new: true } /* Güncellenen veriyi döndüren seçenek*/)

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
  
})

//sadece status
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

//MEETİNGS
app.get("/meetings/:userid", (req, res,next) => {
  const promise = Meeting.find({userId:req.params.userid})
  promise.then((data)=>{
    if (!data) {
      next({message: "Meeting yok"})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err.message)
  })
})

app.put("/meetings/:userid", (req, res) => {
  const senderid = req.body.meetings[0].senderid
  const sendername = req.body.meetings[0].sendername
  const status = req.body.meetings[0].status
  
  const promise = Meeting.findOneAndUpdate({ userId:req.params.userid },{name:req.body.name, userId:req.body.userId, $push: { meetings: {senderid:senderid,sendername:sendername,status:status} } },{ new: true,upsert:true })

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

//delete okunan görüşmeleri silme
app.put("/deleteMeeting/:userid/:senderid",(req,res,next)=>{

  const promise = Meeting.findOneAndUpdate({userId:req.params.userid},{ $pull: { meetings: { senderid: req.params.senderid } } },{ new: true })

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