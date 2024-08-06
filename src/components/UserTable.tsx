import React, { useState } from "react";
import { User } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import UserList from "./UserList";
import { jsonplaceholderAPI } from "../constants/api";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    axios.delete(jsonplaceholderAPI + `/users/${id}`).then((response) => {
      console.log("User deleted", response.data);
    });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (orderBy === "id") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
    return (order === "asc" ? a[orderBy] < b[orderBy] : a[orderBy] > b[orderBy])
      ? -1
      : 1;
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sortDirection={orderBy === "id" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleRequestSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "firstName" ? order : false}>
              <TableSortLabel
                active={orderBy === "firstName"}
                direction={orderBy === "firstName" ? order : "asc"}
                onClick={() => handleRequestSort("firstName")}
              >
                Имя
              </TableSortLabel>
            </TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Навыки</TableCell>
            <TableCell>Дата регистрации</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UserList users={paginatedUsers} handleDelete={handleDelete} />
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default UserTable;
