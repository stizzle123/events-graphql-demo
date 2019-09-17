export const dbconnect = mongoose => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`[MongoDB] Connected to database successfully`))
    .catch(err => console.log(`[MongoError] Failed to connect to database`));
};
