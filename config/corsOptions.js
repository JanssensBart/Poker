const allowedOrigins = require('./allowedOrigins')

const  CorsOptions = {
  origin: (origin,callback) => {
    
    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("You are not allowed on this project"))
    }
  },
  optionsSuccesStatus: 200
}

module.exports = CorsOptions