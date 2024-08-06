import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import EditUser from "./pages/EditUser";
import { Container } from "@mui/material";
import "./App.css";

const App: React.FC = () => {
  return (
    <Container className="container">
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
