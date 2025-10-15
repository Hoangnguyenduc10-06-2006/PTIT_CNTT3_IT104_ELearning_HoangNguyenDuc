import {
  Avatar,
  Box,
  Button,
  Checkbox,
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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalAddLession from "../components/ModalAddLession";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IoSearchCircleOutline } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
export default function LessionManager() {
  // xử lý sự kiện của lọc theo trạng thái
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [lessions, setLession] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [searchElement, setSearchElement] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sort, setSort] = useState("lession_name");
  const [order, setOrder] = useState<boolean>(true);
  const [openAdd, setOpenAdd] = useState(false);
  // const [open, setOpen] = useState<boolean>(false);

  // khu vuc xu ly cua table

  const listLession = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/lession`, {
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: order === true ? "asc" : "desc",
          lession_name_like: searchElement,
          lession_status_like: filterStatus,
        },
      });
      setLession(res.data);
      const totalCount = res.headers["x-total-count"];
      if (totalCount) {
        setTotal(Number(totalCount));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // sử lý set cac value nhap vao
  //1.loc theo trang thai
  const handleChange = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value as string);
  };
  //2. sap xep
  const handleSort = () => {
    setOrder(!order);
  };

  // khu vực xử lý phần searrch

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
    setSearchElement(event.target.value);
  };

  // khu cuc xu ly check box
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => {
    listLession();
  }, [page, searchElement, sort, order, filterStatus, open]);

  const navigate = useNavigate();
  const handleLsubject = () => {
    navigate("/subject_Manager");
  };
  // modal them

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleClodeAdd = () => {
    setOpenAdd(false);
  };
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
                <ListItemButton onClick={handleLsubject}>
                  <ListItemIcon>
                    <LibraryBooksIcon></LibraryBooksIcon>
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
                <ListItemButton sx={{ background: "#D7EDFF" }}>
                  <ListItemIcon>
                    <FolderCopyIcon
                      sx={{ background: "#D7EDFF", color: "#0E73F6" }}
                    ></FolderCopyIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary="Quản lý bài học"
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",

                      color: "#0E73F6",
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
              Bài học
            </div>
            <div className="flex gap-[8px]">
              <FormControl sx={{ width: 259 }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Lọc theo trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterStatus}
                  label="Lọc theo trạng thái"
                  onChange={handleChange}
                >
                  <MenuItem value={"complete"}>Ngừng hoạt động</MenuItem>
                  <MenuItem value={"incomplete"}>Đang hoạt động</MenuItem>
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
                value={searchElement}
                placeholder="Tìm Kiếm bài học theo tên..."
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
                  <Checkbox {...label} />
                </TableCell>
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
                  Thời gian học
                  <ArrowUpwardIcon
                    sx={{ width: 15, height: 15 }}
                  ></ArrowUpwardIcon>
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
              {lessions.map((row) => (
                <TableRow
                  key={row.lession_name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox {...label} defaultChecked={checkBox} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lession_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                  <TableCell align="left">
                    <div>
                      <Chip
                        sx={{
                          color:
                            row.lession_status === "complete"
                              ? "#027A48"
                              : "#B91C1C",
                          background:
                            row.lession_status === "complete"
                              ? "#ECFDF3"
                              : "#FEF2F2",
                        }}
                        icon={
                          <Brightness1Icon
                            sx={{ width: 8, height: 8 }}
                            color={
                              row.lession_status === "complete"
                                ? "success"
                                : "warning"
                            }
                          />
                        }
                        label={
                          row.lession_status === "complete"
                            ? "Đã hoàn thành"
                            : "Chưa Hoàn thành"
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex gap-5">
                      <button>
                        <DeleteIcon sx={{ color: "#FF0101" }}></DeleteIcon>
                      </button>
                      <button>
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
          count={Math.ceil(total / limit)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
      <ModalAddLession open={openAdd} close={handleClodeAdd}></ModalAddLession>
    </div>
  );
}
