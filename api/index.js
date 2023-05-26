const express = require("express");
const app = express()

const multer = require('multer');
const fs = require("fs")
const zip = require('express-zip');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/images/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// db connection
const db = require('./helper/db.js')();

//Models
const User = require("./models/User")
const Task = require("./models/Task")
const Code = require("./models/Code")
const Meeting = require("./models/Meeting")

//dosya indirme
app.get('/download/:filenames', (req, res) => {
  const filenames = req.params.filenames;
  filenamesArr = filenames.split("&")

  const zipData = [];

  filenamesArr.forEach(filename => {
    zipData.push({ path: `./assets/images/uploads/` + filename , name: filename });
  });

  res.zip(zipData);
  
});


//USERS
app.get("/users", (req, res, next) => {
  const promise = User.find({})
  promise.then((data) => {
    if (!data) {
      next({ message: "User verisi yok" })
    }
    res.json(data)
  }).catch((err) => {
    res.json(err.message)
  })
})

//TASKS
app.get("/tasks", (req, res, next) => {
  const promise = Task.find({})
  promise.then((data) => {
    if (!data) {
      next({ message: "Task verisi yok" })
    }
    res.json(data)
  }).catch((err) => {
    res.json(err.message)
  })
})

app.post("/tasks", (req, res) => {
  const task = new Task(req.body)

  const promise = task.save()
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

//sadece text
app.put("/tasksText/:taskid", (req, res, next) => {

  const promise = Task.findOneAndUpdate({ _id: req.params.taskid }, { text: req.body.text }, { new: true } /* Güncellenen veriyi döndüren seçenek*/)

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })

})

//sadece status
app.put("/tasks/:taskid", (req, res, next) => {

  const promise = Task.findOneAndUpdate({ _id: req.params.taskid }, { status: req.body.status }, { new: true } /* Güncellenen veriyi döndüren seçenek*/)

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })

})



//CODES
app.get("/codes", (req, res, next) => {
  const promise = Code.find({})
  promise.then((data) => {
    if (!data) {
      next({ message: "Code cevabı yok" })
    }
    res.json(data)
  }).catch((err) => {
    res.json(err.message)
  })
})

//yalnız giriş yapan kullanının kodları 
app.get("/codes/:user", (req, res, next) => {
  const promise = Code.find({ name: req.params.user })
  promise.then((data) => {
    if (!data) {
      next({ message: "Kullanıcın herhangi bir sorusu yok" })
    }
    res.json(data)
  }).catch((err) => {
    res.json(err.message)
  })
})

app.post("/codes/:user", upload.array('file'), (req, res) => {

  //console.log(req.files,req.body)

  const code = new Code({
    name: req.params.user,
    text: req.body.text,
    images: req.files
  })

  const promise = code.save()
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

app.delete("/codes/:user", (req, res, next) => {

  const promise = Code.findOneAndRemove({ name: req.params.user })

  promise.then((data) => {
    res.json(data)

    setTimeout(() => {
      data.images.forEach(file => {
        fs.unlink(file.path, (error) => {
          if (error) {
            console.error('Resim silinirken bir hata oluştu:', error);
          } else {
            console.log('Resim başarıyla silindi.');
          }
        });
      })
    }, 2000);

  }).catch((err) => {
    res.json(err)
  })
})

app.put("/codes/:user", (req, res) => {

  const promise = Code.findOneAndUpdate({ name: req.params.user }, { $push: { answers: { sendername: req.body.name, sendertext: req.body.text } } }, { new: true, upsert: true })

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

//MEETİNGS
app.get("/meetings/:userid", (req, res, next) => {
  const promise = Meeting.find({ userId: req.params.userid })
  promise.then((data) => {
    if (!data) {
      next({ message: "Meeting yok" })
    }
    res.json(data)
  }).catch((err) => {
    res.json(err.message)
  })
})

app.put("/meetings/:userid", (req, res) => {
  const senderid = req.body.meetings[0].senderid
  const sendername = req.body.meetings[0].sendername
  const status = req.body.meetings[0].status

  const promise = Meeting.findOneAndUpdate({ userId: req.params.userid }, { name: req.body.name, userId: req.body.userId, $push: { meetings: { senderid: senderid, sendername: sendername, status: status } } }, { new: true, upsert: true })

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

//delete okunan görüşmeleri silme
app.put("/deleteMeeting/:userid/:senderid", (req, res, next) => {

  const promise = Meeting.findOneAndUpdate({ userId: req.params.userid }, { $pull: { meetings: { senderid: req.params.senderid } } }, { new: true })

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })
})

module.exports = {
  path: "/api",
  handler: app
}