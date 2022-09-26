const bcrypt = require("bcrypt")
const db = require('../config/connection');
module.exports = {
    addUser :  function (user){
        return new Promise (async (res,rej)=>{
          let valid = {}
          let use = await db.get().collection('users').findOne({email:user.email})
          if(use){
            valid.exist = true 
            res(valid)
          }else{
            user.password = await bcrypt.hash(user.password,10)

               db.get().collection('users').insertOne(user).then((data) => {
                      
                      res(data)
                      console.log(data)
        
                })

          }
        } )
    },
    getUser: function(email,callback){
        db.get().collection('users').findOne({email:email}).then((data)=>{
            callback(data)
        })
    },
    doLogin: function(user,callback){
        return new Promise ( async function (res,rej){
           const use = await db.get().collection('users').findOne({email:user.email})
           if(use){
               if(await bcrypt.compare(user.password,use.password)){
                   callback(true)
               }else{
                   callback(false)
               }
           }else{
               callback(false)
           }
           res(use)
        })
    }
}