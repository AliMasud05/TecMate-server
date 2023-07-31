const express =require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port =process.env.PORT || 5000;
require('dotenv').config();


//middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://pc_professor:Xc7A3XxyLbxQnFyq@cluster0.memgfjc.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
async function run(){
    try{
        const productCollection =client.db('pc-professor').collection('product');
        const reviewCollection = client.db("pc-professor").collection("cpu");
        
         app.get("/products/:id", async (req, res) => {
           const { id } = req.params;
           const query = { _id: new ObjectId(id) };
           console.log(query);
           const result = await productCollection.findOne(query);
           console.log(result);
           res.send(result);
         });
        app.get("/products", async (req, res) => {
          let filter = {};
          if (req.query && req.query.featured === "true") {
            filter = { featured: true };
          } else {
            filter = req.query;
          }
          const result = await productCollection.find(filter).toArray();
          res.send(result);
        });
       
        app.post('/products', async (req, res) => {
            const service = req.body;
            const result = await productCollection.insertOne(service)
            res.send(result);
        });       
    

        
    }
    finally{

    }

}
run().catch(err=>console.error(err));



app.get('/', (req, res)=>{
    res.send('server ids running');
});


app.listen(port, ()=>{
    console.log(`go-ship server running on ${port}`);
})