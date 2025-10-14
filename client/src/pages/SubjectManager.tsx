import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type SelectChangeEvent,
} from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { styled } from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalAddSubject from "../components/ModalAddSubject";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axios from "axios";
import ModalDelete from "../components/ModalDelete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ModalUpdateSubject from "../components/ModalUpdateSubject";
export default function SubjectManager() {
  // xử lý sự kiện của lọc theo trạng thái
  const [age, setAge] = React.useState("");
  const [listSubject, setListSubject] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 5;
  const [sort, setSort] = useState("subject_name");
  const [order, setOrder] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fiterStatus, setFiterStatus] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [itemDelete, setItemDelete] = useState<string>("");
  const [idDelete, setIdDelete] = useState<number>(0);

  const [idEdit, setIdEdit] = useState<number>(0);
  const [itemEdit, setItemEdit] = useState<string>("");
  const [itemEditStatus, setItemEditStatus] = useState<string>("");

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    setFiterStatus(event.target.value);
  };

  //khu vuv xu ly tim mon hoc theo ten

  // đây là chỗ khi bấm vào search
  const Search = styled("div")(({ theme }) => ({
    color: "#E7EAEE",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#F5F5F5",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "343px",
    },
  }));

  // icon kính lúp
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: "#656565",
    padding: theme.spacing(0, 2),
    height: "80%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  }));

  // chữ trong search
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#656565",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {},
    },
  }));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // khu vuc xu ly cua table
  // const ListSubject = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8081/subject");
  //     setListSubject(response.data);
  //   } catch (error) {
  //     console.log("lỗi ở table",error);
  //   }
  // };

  // khu vuc xu ly phan trang

  const getSubjects = async (page: number) => {
    try {
      const res = await axios.get(` http://localhost:8081/subject`, {
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: order === true ? "asc" : "desc",
          subject_name_like: searchTerm,
          subject_status_like: fiterStatus,
        },
      });

      setListSubject(res.data);

      // Tổng số môn học (JSON Server tự gửi header này)
      const totalCount = parseInt(res.headers["x-total-count"], 10);
      setTotalPage(Math.ceil(totalCount / limit));
    } catch (err) {
      console.error("Lỗi khi lấy danh sách môn học:", err);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  //khu xử lý open modal edit
  const [openedit, setOpenEdit] = useState<boolean>(false);
  const handleEditSubject = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8081/subject/${id}`);
      setIdEdit(response.data.id);
      setItemEdit(response.data.subject_name);
      setItemEditStatus(response.data.subject_status);
      setOpenEdit(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClodeEdit = () => {
    setOpenEdit(false);
  };

  //khu vuc xu ly open modal thêm
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenAdd = () => {
    setOpen(true);
  };
  const handleClodeAdd = () => {
    setOpen(false);
  };

  // khu vuc xu ly chuc nang  xoa api
  //comfirm xoa ben modal

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8081/subject/${id}`);

      setItemDelete(res.data.subject_name);
      setIdDelete(res.data.id);
      setOpenModalDelete(true);

      getSubjects();
      setPage(1);
    } catch (err) {
      console.error("Lỗi khi xóa môn học:", err);
    }
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };
  // khu vực xử lý button sắp xếp
  const handleSort = () => {
    setOrder(!order);
  };

  // khu vực xử lý edit

  // khuc xu ly useEffect
  useEffect(() => {
    // ListSubject();
    getSubjects(page);
  }, [open, page, searchTerm, fiterStatus, order]);

  return (
    <div className="flex">
      {/* sidebar trai */}
      <div className="bg-[#F6F8F9] h-screen w-[15%]">
        <Box
          sx={{
            width: "100%",
            maxWidth: 208,
            bgcolor: "#F6F8F9",
            margin: "10px",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding className="flex gap-8">
                <img
                  className="ml-4"
                  src="https://res.cloudinary.com/dgw3ijzxk/image/upload/v1759702642/book_hn03pw.png"
                ></img>
                <div>
                  <div className="font-semibold text-[14px] leading-[24px] text-[#252C32]">
                    Study Tracher
                  </div>
                  <div className="font-normal text-[12px] leading-[16px] text-[#84919A]">
                    Quản ly tiến độ học tập
                  </div>
                </div>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TrendingUpIcon></TrendingUpIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary="thông kê"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ background: "#D7EDFF", color: "#0E73F6" }}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon
                      sx={{ background: "#D7EDFF", color: "#0E73F6" }}
                    ></LibraryBooksIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Quản lý môn học"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FolderCopyIcon></FolderCopyIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Quản lý bài học"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
      </div>
      {/* main */}
      <div className=" h-screen w-[85%]">
        {/* treen cungf */}
        <div className=" h-[65px] flex justify-between items-center p-[20px]">
          <AppsIcon></AppsIcon>
          <div className="flex gap-[16px] items-center">
            <NotificationsIcon></NotificationsIcon>
            <HelpIcon></HelpIcon>
            <SettingsIcon></SettingsIcon>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
        </div>

        <div className=" pl-[20px] pr-[20px]">
          <div className="flex justify-between items-center">
            <div
              style={{
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "24px",
                color: "#000000",
              }}
            >
              Môn học
            </div>
            <div className="flex gap-[8px]">
              <FormControl sx={{ width: 259 }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Lọc theo trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Lọc theo trạng thái"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={"Ngừng hoạt động"}>Ngừng hoạt động</MenuItem>
                  <MenuItem value={"Đang hoạt động"}>Đang hoạt động</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" onClick={handleOpenAdd}>
                Thêm mới môn học
              </Button>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Search className="flex items-center justify-end">
              <SearchIconWrapper>
                <IoSearchCircleOutline fontSize={"small"} />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchTerm}
                placeholder="Tìm Kiếm môn học theo tên..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </Search>
          </div>
        </div>
        {/* table */}
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ background: "#EAECF0", color: "#667085" }}>
                  Tên môn học
                  <button onClick={handleSort}>
                    {order === true ? (
                      <ArrowUpwardIcon
                        sx={{ width: 15, height: 15 }}
                      ></ArrowUpwardIcon>
                    ) : (
                      <ArrowDownwardIcon
                        sx={{ width: 15, height: 15 }}
                      ></ArrowDownwardIcon>
                    )}
                  </button>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ background: "#EAECF0", color: "#667085" }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ background: "#EAECF0", color: "#667085" }}
                >
                  Chức năng
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listSubject.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.subject_name}
                  </TableCell>
                  <TableCell align="left">
                    <div>
                      <Chip
                        sx={{
                          color:
                            row.subject_status === "Đang hoạt động"
                              ? "#027A48"
                              : "#B91C1C",
                          background:
                            row.subject_status === "Đang hoạt động"
                              ? "#ECFDF3"
                              : "#FEF2F2",
                        }}
                        icon={
                          <Brightness1Icon
                            sx={{ width: 8, height: 8 }}
                            color={
                              row.subject_status === "Đang hoạt động"
                                ? "success"
                                : "warning"
                            }
                          />
                        }
                        label={row.subject_status}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex gap-5">
                      <button
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <DeleteIcon sx={{ color: "#FF0101" }}></DeleteIcon>
                      </button>
                      <button
                        onClick={() => {
                          handleEditSubject(row.id);
                        }}
                      >
                        <EditIcon sx={{ color: "#FF9500" }}></EditIcon>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className="flex justify-center mt-3"
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </div>
      <ModalAddSubject open={open} close={handleClodeAdd}></ModalAddSubject>
      <ModalUpdateSubject
        open={openedit}
        close={handleClodeEdit}
        idEdit={idEdit}
        itemEdit={itemEdit}
        itemEditStatus={itemEditStatus}
      ></ModalUpdateSubject>
      <ModalDelete
        status={openModalDelete}
        close={handleCloseModalDelete}
        item={itemDelete}
        idDelete={idDelete}
      ></ModalDelete>
    </div>
  );
}
