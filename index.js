const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://job-portal-2:yObyukmtybQYzmPV@cluster0.ax6qyiu.mongodb.net/job-portal-3?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     // await client.db("admin").command({ ping: 1 });
//     const db = client.db("jobPort");
//     const jobCollection = db.collection("jobs");

//     app.post("/postJob", async (req, res) => {
//       const data = req.body;
//       const result = await jobCollection.insertOne(data);

//       console.log("result", result);
//       res.send(result);
//     });

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

//

const rakib = 12;
//

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://job-center:0jWlzsEnQ9qZF3OD@cluster0.ax6qyiu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const dbName = client.db("job-center");
    const jobCollection = dbName.collection("employments");

    app.post("/postJob", async (req, res) => {
      const data = req.body;
      // data.createdAt = new Date();
      data.createdAt = new Date();
      const result = await jobCollection.insertOne(data);

      res.send(result);
      console.log("result", result);
    });

    // app.get("/allJobs/:text", async (req, res) => {
    //   console.log(req.params.text);
    //   if (req.params.text === "remote" || req.params.text === "offline") {
    //     const result = await jobCollection
    //       .find({ status: req.params.text })
    //       // .sort({ createdAt: -1 })
    //       .sort({ createdAt: 1 })
    //       .toArray();

    //     return res.send(result);
    //   }
    //   const result = await jobCollection
    //     .find({})
    //     // .sort({ createdAt: -1 })
    //     .sort({ createdAt: 1 })
    //     .toArray();

    //   res.send(result);
    // });

    app.post("/postJob", async (req, res) => {
      // Get the document data from the request body
      const data = req.body;
      data.createdAt = new Date();
      const result = await jobCollection.insertOne(data);
      res.send(result);
      console.log(result);
    });

    app.get("/allJobs/:text", async (req, res) => {
      if (req.params.text == "remote" || req.params.text == "offline") {
        const result = await jobCollection
          .find({ status: req.params.text })
          .sort({ createdAt: -1 })
          .toArray();
        return res.send(result);
      }

      const result = await jobCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/myJobs/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await jobCollection
        .find({ postedBy: req.params.email })

        .toArray();

      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
