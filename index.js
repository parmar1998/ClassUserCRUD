const express = require("express");//returns a express function
const app = express();//invoking the express
const port = 8000;
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.use(bodyparser.urlencoded());
// app.get("/", (req, res) => {
//     res.send('<h1>Bhagg D.K Bose</h1>');
// })

// app.get("/users", (req, res) => {
//     console.log(req.body);
// })


// app.get("/apiUsers", (req, res) => {
//     res.send('<h1 style="color: red;">User hu Bhai</h1>');
// })


// app.get("/users/:id/:name",(req,res)=>{
//     console.log(req.params);
//     console.log(req.query);
// });

const userArr=[
    {
        id:Math.floor(Math.random()*1000),
        name:"User 1"
    },
    {
        id:Math.floor(Math.random()*1000),
        name:"User 2"
    }
]
app.get("/users",(req,res)=>{
    if(userArr.length==0){
        return res.json({
            message:"No user found"
        })
    }
    return res.json({userArr});
});

app.post("/createUser",(req,res)=>{
    const newUser={
        id:Math.floor(Math.random()*1000),
        name:req.body.name
    }
    userArr.push(newUser);
    return res.json({message:"User added Succefully"});
});

app.delete("/deleteUser/:id",(req,res)=>{
    const {id}=req.params;
    const elemIndex=userArr.findIndex(elem=>elem.id==id);
    if(elemIndex===-1){
        return res.json({message:"No user Found"});
    }
    userArr.splice(elemIndex,1);
    return res.json({message:"User Deleted"});

    //using filter
    // const filteredArr=userArr.filter((elem)=>elem.id!=id);
    // userArr=filteredArr;
    // return res.json({message:"User deleted successfully"})

})

app.put('/updateUser/:id',(req,res)=>{
    const {id}=req.params;
    const elemIndex=userArr.findIndex(elem=>elem.id==id);
    if(elemIndex===-1){
        return res.json({message:"No user Found"});
    }
    const newUser={
        id,
        name:req.body.name
    }
    userArr[elemIndex]=newUser;
    return res.json({message:"user updated successfully"})
})
app.listen(port, () => {
    console.log("Server running on port: ", port);
});