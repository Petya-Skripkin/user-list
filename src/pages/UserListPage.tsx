import React, { useEffect } from "react";
import UserTable from "../components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUsers } from "../slices/usersSlice";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Список пользователей
      </Typography>
      <UserTable users={users} />
      <div className="addUserBtn">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/edit/new"
        >
          Добавить пользователя
        </Button>
      </div>
    </Box>
  );
};

export default UserListPage;
