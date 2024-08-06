import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import { User } from "../types";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { jsonplaceholderAPI } from "../constants/api";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id !== "new") {
      axios.get(jsonplaceholderAPI + `/users/${id}`).then((response) => {
        const user = {
          id: response.data.id,
          firstName: response.data.name.split(" ")[0],
          lastName: response.data.name.split(" ")[1] || "",
          email: response.data.email,
          skills: [], // JSONPlaceholder не предоставляет навыков, поэтому оставляем пустым
          registrationDate: new Date().toISOString(),
        };
        setUser(user);
      });
    } else {
      setUser({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        skills: [],
        registrationDate: new Date().toISOString(),
      });
    }
  }, [id]);

  const handleSubmit = (data: User) => {
    if (id === "new") {
      axios.post(jsonplaceholderAPI + "/users", data).then((response) => {
        console.log("User added", response.data);
      });
    } else {
      axios.put(jsonplaceholderAPI + `/users/${id}`, data).then((response) => {
        console.log("User updated", response.data);
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {id === "new" ? "Add New User" : "Edit User"}
      </Typography>
      {user && <UserForm user={user} onSubmit={handleSubmit} />}
    </Box>
  );
};

export default EditUser;
