const mongoDB= require('mongodb')
const state = {
    db:null
}

const mongoClient = mongoDB.MongoClient


module.exports.link=function(done){
    const url = 'mongodb://localhost:27017'
    const dbname = 'node'

    mongoClient.connect(url,(err,data) => {
        if(err) return done(err)

        state.db=data.db(dbname)
        done() 
    })
 
}
module.exports.get=function(){
    return state.db
}