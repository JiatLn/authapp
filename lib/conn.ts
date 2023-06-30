import mongoose from 'mongoose';


export async function connectMongo() {
  return mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
      return true
    })
    .catch(error => {
      console.error('Error connecting to database: ', error)
      return false
    })
}
