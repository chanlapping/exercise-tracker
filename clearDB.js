const User = require("./models/User");
const connectDB = require("./db/connect");

const clearDB = async () => {
  await connectDB(process.env.MONGO_URI);
  await User.deleteMany({});
  process.exit(0);
};

clearDB().catch((err) => console.log(err));
