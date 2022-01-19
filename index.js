const express = require("express");
const { MongoClient } = require("mongodb");
const res = require("express/lib/response");
const cors=require('cors')
const app = express();
const ObjectId=require('mongodb').ObjectId
//middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT|| 5000;

// user = tanvir
// password =tanvir12

const uri =
  "mongodb+srv://tanvir:tanvir12@cluster0.vqco3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("MyOne");
    const userCollection = database.collection("users");

    // get api

    app.get('/users',async(req,res)=>{
      const cursor=userCollection.find({})
      const users=await cursor.toArray()
      res.send(users)
    })
    
   app.get('/users/:id', async(req,res)=>{
     const id=req.params.id
     console.log('user id,',id)
     const query={_id:ObjectId(id)}
     const user=await userCollection.findOne(query)
     res.json(user)
   })

     //post api
    app.post('/users', async(req,res)=>{
      const newUser=req.body
      const result=await userCollection.insertOne(newUser)
      console.log('add new user',result)
      console.log('hitting the console', req.body)
      res.json(result)
    })  
    
    //delete api
    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id:ObjectId(id)}
      const result=await userCollection.deleteOne(query)
      console.log('you are delete id:',result)
      res.json(result)
    })
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

// const uri = "mongodb+srv://tanvir:tanvir12@cluster0.vqco3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("MyOne").collection("users");
//   // perform actions on the collection object
//   console.log('hiting the data base')
//   const userOne={name:'tanvir',email:'tanvir32110@hgamil.com'}
//   collection.insertOne(userOne)
//   .then(()=>{
//       console.log('insert success')
//   })

// //   client.close();
// });

//old


app.get("/", (req, res) => {
  res.send("database mongodb");
});

app.listen(port, () => {
  console.log("Running...server", port);
});
