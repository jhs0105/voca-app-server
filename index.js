const daySchema = require("./models/DaySchema");
const vocasSchema = require("./models/VocaSchema");
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/db");

//middleware (cors, json을 거쳐가는)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 5000);

const PORT = app.get("port");

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/days", (req, res) => {
  //db에서 데이터를 긁어서 json으로 리턴
  // res.json([
  //   {
  //     id: 1,
  //     day: 1,
  //   },
  //   {
  //     id: 2,
  //     day: 2,
  //   },
  //   {
  //     id: 3,
  //     day: 3,
  //   },
  //   {
  //     day: 4,
  //     id: 4,
  //   },
  //   {
  //     day: 5,
  //     id: 5,
  //   },
  // ]);
  daySchema
    .find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

//서버에서 클라이언트에서 온 데이터 받는 법
//url에 실려올때 http://localhost/user/190 params
//app.post("/user/:id", (req,res)=>{ req.params.id}) 로 받는다.

//url에 실려올때 http://localhost/days?id=190 query
//app.post("/days", (req,res)=>{ req.query.id}) 로 받는다.

//form tag로 올때는 body로 받아야 한다.
app.post("/days", (req, res) => {
  //console.log(req.body.day);
  const { day, id } = req.body;
  const insertDay = new daySchema({
    id: 100,
    day: 100,
  });
  insertDay
    .save()
    .then(() => {
      console.log("잘들어갔습니다.");
      res.json({ state: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/vocas", (req, res) => {
  const { day, kor, eng, done } = req.body;
  const insertVocaItem = new vocasSchema({
    day,
    kor,
    eng,
    done,
  });
  insertVocaItem
    .save()
    .then(() => {
      res.json({ state: "ok" });
      console.log("잘 들어갔습니다!");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/vocas", (req, res) => {
  //console.log(req.query);
  const { day } = req.query;
  vocasSchema.find({ day: day }).then((response) => {
    //console.log(response);
    res.json(response);
  });
});

app.delete("/vocas/:id", (req, res) => {
  const { id } = req.params;
  //console.log(id);
  vocasSchema
    .deleteOne({ _id: id })
    .then((response) => {
      console.log(response);
      res.json({ state: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/vocas/:id", (req, res) => {
  const { id } = req.params;
  vocasSchema
    .updateOne({ _id: id }, { $set: { done: req.body.done } })
    .then((response) => {
      console.log(response);
      res.json({ state: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
