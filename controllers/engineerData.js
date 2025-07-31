const Engineer=require("../models/engineer")

const engineerData={}

//index
engineerData.index= async (req,res,next)=> 
{
    try {
        const engineers = await Engineer.find({})
        // console.log(engineers)
        res.locals.data.engineers=engineers
        // res.status(200).json(engineers)// uncomment it to run tests
        next()
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}



//delete
engineerData.destroy=async (req,res,next)=>
{
    try {
        await Engineer.findByIdAndDelete(req.params.id)
        next()
    } catch (error) {
        res.status(400).send({message:error.message})     
    }
}
//update
engineerData.update = async (req,res,next)=>
{
    if(req.body.available==="on"||req.body.available===true)
    {
        req.body.available=true
    }
    else{
        req.body.available=false
    }

    try {
        res.locals.data.engineer=await Engineer.findByIdAndUpdate(req.params.id,req.body,{new:true})
        next()
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}
//create
engineerData.create= async (req,res,next) => {
    if(req.body.available==="on"||req.body.available===true)
    {
        req.body.available=true
    }
    else{
        req.body.available=false
    }
    try {
        const newEngineer=await Engineer.create(req.body)
        next()
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}



//show

engineerData.show= async (req,res,next)=>
{
    try {
        const foundEngineer=await Engineer.findById(req.params.id)
        res.locals.data.engineer=foundEngineer
        next()
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}
module.exports=engineerData