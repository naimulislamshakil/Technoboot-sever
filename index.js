const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmanv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const allStudentCollaction = client
      .db("student-management")
      .collection("all-student");
    // get all student
    app.get("/all_student", async (req, res) => {
      const result = await allStudentCollaction.find().toArray();
      res.send(result);
    });
    // delete a student
    app.delete("/all_student/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const result = await allStudentCollaction.deleteOne(quary);
      res.send(result);
    });
    //   get a student
    app.get("/singel_student/:id", async (req, res) => {
      const id = req.params.id;
      const quaty = { _id: ObjectId(id) };
      const result = await allStudentCollaction.findOne(quaty);
      res.send(result);
    });

    // add student
    app.post("/singel_student", async (req, res) => {
      const user = req.body;
      const result = await allStudentCollaction.insert(user);
      res.send(result);
    });
  } finally {
    // await client.close()
  }
};

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("How are you?");
});

app.listen(port, () => {
  console.log(`creative agency server side runing ${port}`);
});
