import React from "react";
import { Routes, Route } from "react-router-dom"

import Home from "../components/home/Home"
import UserCrud from "../components/user/UserCrud"
import UserView from "../components/user/UserView"

export default props =>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cadastro" element={<UserCrud />} />
        <Route path="/restaurantes" element={<UserView />} />
        <Route path="*" element={<Home />} />
    </Routes>