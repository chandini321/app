const express=require('express')
const app=express()
const User=require("./models/schema")
const db=require("./models/db")
const bodyparser=require('body-parser')



//connecting to db
db();

//start the server
const port=3000;
app.listen(port,()=>
{
    console.log(`Server is listening on port ${port}`)
})

//middleware
app.use(bodyparser.json())

//posting the data 
app.post('//',async(req,res)=>
{
    const post=new User({
        id:req.body.id,
        name:req.body.name,
        hobbies:req.body.hobbies
    });
    try{
        await post.save();
        res.send({staus:"true",message:"saved"})
    }
    catch(err)
    {
        res.send(err.message)
    }
})

//getting matched ids
app.get('/match/:id', async (req, res) => {
    const userid= req.params.id;
  
    try {
      // Find the user by ID
      const user = await User.findOne({id:userid});
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find matches based on shared hobbies
      const Matches = await User.find({
        id: { $ne: user.id }, // Exclude the current user from matches
        hobbies: { $in: user.hobbies }, // Find users with at least one shared hobby
      });
  
      res.json(Matches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  app.get('/',(req,res)=>{
    res.send("working");
  })
  