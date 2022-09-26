
const { ObjectId } = require('mongodb');
const db = require('../config/connection');

module.exports = {
    getAllUser: () => {
        return new Promise(async (res, rej) => {
            const users = await db.get().collection('users').find().toArray()
            res(users)
        })
    },
    deleteUser: (userId) => {
        return new Promise(async (res, rej) => {
            const users = await db.get().collection('users').deleteOne({ _id: ObjectId(userId) })
            res(users)
        })
    },
    getUser: (userId) => {
        return new Promise(async (res, rej) => {
            const user = await db.get().collection("users").findOne({ _id: ObjectId(userId) })
            res(user)
        })
    },
    updateUser: (userId, userDetails) => {
        return new Promise(async (res, rej) => {
            const user = await db.get().collection('users').updateOne({ _id: ObjectId(userId) },
                {
                    $set: {
                        name: userDetails.name,
                        email: userDetails.email,
                        password: userDetails.password,
                    }
                })
                res(user)
        })
    }


}