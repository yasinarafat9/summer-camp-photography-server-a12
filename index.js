const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
// app.use(cors())
//pasted
const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());

// Mongodb Driver

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nosbxzl.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // pasted 
    client.connect();
    

    const classCollection = client.db("summerCampPhotographyDB").collection("classes");
    const instructorsCollection = client.db("summerCampPhotographyDB").collection("instructors");
    const myClassesCollection = client.db("summerCampPhotographyDB").collection("myClasses");
    const usersCollection = client.db("summerCampPhotographyDB").collection("users");

    app.get('/classes', async(req, res) => {
        const result = await classCollection.find().toArray();
        res.send(result);
    })
 
    app.get('/instructors', async(req, res) => {
        const result = await instructorsCollection.find().toArray();
        res.send(result);
    })
 
    // my classes
    app.post('/myClasses', async(req, res) => {
      const myclass = req.body;
      const result = await myClassesCollection.insertOne(myclass);
      res.send(result);
    })



    //users apis
    app.post('/users', async(req, res)=>{
      const user = req.body;
      const query = {email: user.email}
      const existingUser = await usersCollection.findOne(query);

      if(existingUser){
        return res.send({message: 'user already exists'})
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('summer camp photography is running')
})

app.listen(port, ()=> {
    console.log(`summer camp photography is running on port: ${port}`);
})

