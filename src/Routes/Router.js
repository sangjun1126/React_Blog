import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, About, Login, Board, MyBoard, MyPage } from "./index";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/board" element={<Board />} />
    <Route path="/myboard" element={<MyBoard />} />
    <Route path="/mypage" element={<MyPage />} />
  </Routes>
);

export default Router;
