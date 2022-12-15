// Custom error handeling for the project
const errorHandler =  (err,req,res, next) => {
    //log it to the console
    console.error(err.stack)
  
    //send an error code+msg to the frontend
    res.status(500).send(err.message)
}

module.exports = errorHandler