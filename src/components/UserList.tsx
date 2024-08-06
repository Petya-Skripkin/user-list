import React from "react";
import { User } from "../types";
import { TableCell, TableRow, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface UserListProps {
  users: User[];
  handleDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, handleDelete }) => {
  return (
    <>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.lastName}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.skills.join(", ")}</TableCell>
          <TableCell>
            {new Date(user.registrationDate).toLocaleDateString()}
          </TableCell>
          <TableCell>
            <IconButton component={Link} to={`/edit/${user.id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(user.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default UserList;
