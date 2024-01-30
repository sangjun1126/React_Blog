import { GraphQLServer } from "graceful-yoga";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
require("dotenv").config();

const { MONGODB_ID, MONGODB_PW } = process.env;

// .env 파일에서 MONGODB_ID와 MONGODB_PW를 설정하세요.

mongoose.connect(
  `mongodb://${MONGODB_ID}:${MONGODB_PW}@ds052827.mlab.com:52827/reactblog_db`,
  { useNewUrlParser: true }
);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB 연결 에러:", error);
  process.exit(1); // 연결 실패 시 프로세스 종료
});

mongoose.connection.once("open", () => {
  console.log("몽고 DB에 연결되었습니다.");
});

const server = new GraphQLServer({ typeDefs, resolvers });
const PORT = process.env.PORT || 4000;

server.start({ port: PORT }, () => {
  console.log(`서버를 ${PORT}번으로 열기를 성공했어요`);
});
