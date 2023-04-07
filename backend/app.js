require("dotenv").config();
require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const { readdirSync } = require("fs");
const connectDB = require("./database/connect");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// var whitelist = [
//   "http://localhost:3000",
//   "http://127.0.0.1:3000",
//   "http://localhost:8000",
//   "https://facebook-clone-ipqvlw4l2-trungnguyenhuynhminh46.vercel.app/",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// Middlewares
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const express = require("express");
const app = express();

app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());
// app.options("*", cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

readdirSync("./routes").map((fileName) => {
  const base = fileName.split(".")[0];
  app.use(`/${base}`, require(`./routes/${fileName}`));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB(process.env.MONGO_DB_CONNECTION_STRING);
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT ${port}`);
  });
};
start();
