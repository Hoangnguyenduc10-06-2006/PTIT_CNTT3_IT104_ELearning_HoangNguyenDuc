import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaTiktok } from "react-icons/fa";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink, useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  //khu vực xử lý chủ/môn học/bài học
  const [aria_label, set_aria_label] = useState<string>("Home");
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  // khu vuc xu ly lọc khóa học
  function handleClickCourse(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="always"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClickCourse}
    >
      Tất cả khóa học
    </Link>,
    <Link
      underline="always"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClickCourse}
    >
      Đã hoàn thành
    </Link>,
    <Link
      underline="always"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClickCourse}
    >
      Chưa hoàn thành
    </Link>,
  ];

  //khu xử lý các thẻ card

  // đây là chỗ khi bấm vào search
  const Search = styled("div")(({ theme }) => ({
    color: "#F5F5F5",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#F5F5F5",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
    marginLeft: 0,
    width: "668px",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "668px",
    },
  }));

  // icon kính lúp
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: "#656565",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  // chữ trong search
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#656565",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {},
    },
  }));
  // logout
  const handleLogOut = () => {
    const confirmLogout = window.confirm("dang xuat");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar className="flex justify-center items-center gap-32  ">
          <div>
            <Search className="flex items-center">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm Kiếm"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>

          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="always" color="inherit" href="">
                Trang chủ
              </Link>
              <Link underline="always" color="inherit" href="">
                <NavLink to={"/subject_Manager"}>Môn học</NavLink>
              </Link>
              <Link underline="always" color="inherit" href="">
                <NavLink to={"/lession_manager"}>Bài học</NavLink>
              </Link>
            </Breadcrumbs>
          </div>

          <div className="flex gap-4">
            <FavoriteIcon></FavoriteIcon>
            <PersonIcon></PersonIcon>
            <button onClick={handleLogOut}>
              <LogoutIcon></LogoutIcon>
            </button>
          </div>
        </Toolbar>
      </AppBar>

      <div className="w-full h-[70vh] pt-[48px] pb-[160px] flex flex-col items-center justify-start ">
        {/* loc khoa hoc */}
        <div className=" w-[1120px] mb-[32px]">
          <Breadcrumbs separator="" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>

        <div className="flex flex-col gap-5 mb-[132px]">
          {/* thẻ card các khóa học */}
          <div className="flex flex-row gap-[3px]">
            <Card className="sm:w-[300px] md:w-[370px]">
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  HTML cơ bản
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 01: Tổng quan về HTML</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 02: Thẻ Inline và Block</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 03: Thẻ hình ảnh </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 04: Thẻ chuyển trang</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 05: Thẻ Semantic</div>
                  </div>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  sx={{
                    color: "#000000",
                  }}
                >
                  xem thêm
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ width: 370, height: 362 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  CSS cơ bản
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 01: Tổng quan về CSS </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 02: Nhúng CSS vào trang Web</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 03: Position </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 04: Flexbox</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 05: Animation </div>
                  </div>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  sx={{
                    color: "#000000",
                  }}
                >
                  xem thêm
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ width: 370, height: 362 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  JavaScript cơ bản
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 01: Tổng quan ngôn ngữ JavaScript</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 02: Khai báo biến</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 03: Câu lệnh điều kiện</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 04: Vòng lặp </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 05: Mảng</div>
                  </div>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  sx={{
                    color: "#000000",
                  }}
                >
                  xem thêm
                </Button>
              </CardActions>
            </Card>
          </div>

          <div className="flex flex-row gap-[3px]">
            <Card sx={{ width: 370, height: 362 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  Lập trình với React.js
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 01: Tổng quan về React.js </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 02: Props, State, Event </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 03: React hook </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 04: UI Framework</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 05: React Router</div>
                  </div>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  sx={{
                    color: "#000000",
                  }}
                >
                  xem thêm
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ width: 370, height: 362 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  Lập trình với Java
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 01: Tổng quan về ngôn ngữ Java</div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 02: Khai báo biến </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 03: Câu lệnh điều kiện </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 04: Vòng lặp </div>
                  </div>
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  <div className="flex gap-3">
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                    <div>Session 05: Mảng</div>
                  </div>
                </Typography>
              </CardContent>
              <CardActions className="flex justify-center">
                <Button
                  size="small"
                  sx={{
                    color: "#000000",
                  }}
                >
                  xem thêm
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ width: 370, height: 362 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: 24,
                    fontWeight: "400",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  Lập trình C
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 1.5,
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="flex justify-center items-center">
                    <div>Chưa có bài tập nào</div>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* footer */}
        <div className="w-full h-[1000px]   bg-[#000000] pt-[104px] pr-[160px] pb-[104px] pl-[160px]">
          <div className="bg-[#000000] text-[#FFFFFF]  w-full flex flex-row  justify-around ">
            <div className="text-[#CFCFCF] text-[14px] font-normal leading-[32px]">
              Chúng tôi cung cấp giải pháp học tập, giúp học sinh <br />
              và viên học tập tốt hơn và hiệu quả hơn.
            </div>
            <div>
              <div className="text-[16px] font-normal leading-[32px]">
                Danh mục
              </div>
              <div className="text-[#CFCFCF] text-[14px] font-normal leading-[32px]">
                môn học
                <br /> bài học
                <br /> ghi chú
              </div>
            </div>

            <div>
              <div className=" text-[16px] font-normal leading-[32px]">
                Hỗ trợ khách hàng
              </div>
              <div className="text-[#CFCFCF] text-[14px] font-normal leading-[32px]">
                Tìm kiếm dịch vụ
                <br />
                Điều khiển dịch vụ
                <br />
                Chính sách và diều khoản
              </div>
            </div>
          </div>

          <div className="flex gap-[36px] pl-[80px] ">
            <TwitterIcon
              sx={{
                color: "#FFFFFF",
              }}
            ></TwitterIcon>
            <FacebookSharpIcon
              sx={{
                color: "#FFFFFF",
              }}
            ></FacebookSharpIcon>
            <FaTiktok className="text-white"></FaTiktok>

            <InstagramIcon
              sx={{
                color: "#FFFFFF",
              }}
            ></InstagramIcon>
          </div>
        </div>
      </div>
    </Box>
  );
}
