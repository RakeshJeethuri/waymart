import mongoose from "mongoose";

let isConnected = false; // Track connection state

export async function connect() {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL!); // No need for extra options
        isConnected = true;

        console.log(' MongoDB connected successfully');

        mongoose.connection.on('error', (err) => {
            console.log(' MongoDB connection error:', err);
        });

    } catch (error) {
        console.log(' Something went wrong in mongoose connection!');
        console.log(error);
    }
}



// import mongoose from "mongoose";

// export async function connect() {
//     try {
//         mongoose.connect(process.env.MONGO_URL!);
//         const connection = mongoose.connection;
//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully');
//         })
//         connection.on('error', (err) => {
//             console.log('MongoDB connection error');
//             console.log(err); 
//         })
//     } catch (error) {
//         console.log('Something goes wrong in mongooges model!');
//         console.log(error);
//     }
// }