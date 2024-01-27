import { GraphQLServer } from "graceful-yoga";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
require("dotenv").config();

const { MONGODB_ID, MONGODB_PW } = process.env;

mongoose.connect(
  `mongodb://${MONGODB_ID}:${MONGODB_PW}@ds052827.mlab.com:52827/reactblog_db`,
  { useNewUrlParser: true } // Fixed: Correcting the typo
);

mongoose.connection.once("open", () => {
  console.log("몽고 DB 연결중");
});

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("서버를 4000번으로 열기를 성공했어요"));
