// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); 
// const database = ()=>{
     
//     mongoose.connect(process.env.MONGODB_URI!).then(
//         ()=>{
//             console.log(`database connected to ${process.env.MONGODB_URI}`);
//         }).catch(  (err:Error)=>{
//             console.log(err);
//         });
// }


// export default database ;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const database = () => {
  // const uri = process.env.MONGODB_URI || process.env.DB;
  const uri = process.env.DB;


  if (!uri) {
    throw new Error(" MongoDB URI is missing in environment variables!");
  }

  mongoose.connect(uri)
    .then(() => {
      console.log(`Database connected to: ${uri}`);
    })
    .catch((err: Error) => {
      console.error("Database connection error:", err);
    });
};

export default database;
