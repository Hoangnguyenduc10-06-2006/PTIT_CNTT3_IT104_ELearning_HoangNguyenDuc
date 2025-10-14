import { Button, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SnackbarLogin from "../components/SnackbarLogin";
import SnackbarUnLogin from "../components/SnackbarUnLogin";

export default function Login() {
  //lỗi
  const [errorEmail, setErrorEmail] = useState<null | string>(null);
  const [errorPassword, setErrorPassword] = useState<null | string>(null);

  const [emailLogin, setEmailLogin] = useState<null | string>(null);
  const [passwordLogin, setPasswordLogin] = useState<null | string>(null);

  const [buttonLogin, setButtonLogin] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openSnackbarUnLog, setOpenSnackbarUnLog] = useState<boolean>(false);
  //validate
  const navigator = useNavigate();

  const checkEmailLogin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorEmail("empty");
      setEmailLogin(null);
    } else {
      setErrorEmail(e.target.value);
      setEmailLogin(e.target.value);
    }
  };

  const checkPasswordLogin = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorPassword("empty");
      setPasswordLogin(null);
    } else {
      setErrorPassword(e.target.value);
      setPasswordLogin(e.target.value);
    }
  };
  const statusDisabled = () => {
    if (emailLogin !== null && passwordLogin !== null) {
      setButtonLogin(true);
    } else {
      setButtonLogin(false);
    }
  };
  const handleLogin = async () => {
    try {
      const responseLogin = await axios.get(
        `http://localhost:8081/accountUser?email=${emailLogin}&password=${passwordLogin}`
      );
      if (responseLogin.data.length > 0) {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigator("/home");
          setEmailLogin("");
          setPasswordLogin("");
          
        }, 2000);
      } else {
        setOpenSnackbarUnLog(true);
        setTimeout(() => {
          setOpenSnackbarUnLog(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    statusDisabled();
  }, [emailLogin, passwordLogin, openSnackbarUnLog]);
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="space-y-[20px] md:flex flex-col items-center ">
        <div className="space-y-[20px] md:flex flex-col text-left w-full mb-8">
          <p className="font-semibold text-[52px] leading-[62px] ">Đăng nhập</p>
          <p className="font-normal text-[18px] leading-[30px] text-gray-600">
            Đăng nhập tài khoản để sử dụng hệ thống quản lý
          </p>
        </div>

        <div className=" flex flex-col gap-5 ">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm leading-5 text-gray-700">
              Email
            </label>
            <TextField
              placeholder="you@company.com"
              className="w-full"
              id="register-input-email"
              type="email"
              value={emailLogin}
              onChange={(e) => {
                checkEmailLogin(e);
              }}
              error={errorEmail === "empty" ? true : false}
              helperText={errorEmail === "empty" ? "Không được bỏ trống" : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm leading-5 text-gray-700">
              Mật khẩu
            </label>
            <TextField
              className="w-full"
              id="register-input-password"
              type="password"
              autoComplete="current-password"
              value={passwordLogin}
              onChange={(e) => {
                checkPasswordLogin(e);
              }}
              error={errorPassword === "empty" ? true : false}
              helperText={
                errorPassword === "empty" ? "Không được bỏ trống" : ""
              }
            />
          </div>

          <div className="">
            <FormControlLabel
              control={<Checkbox />}
              label={
                <div className="flex justify-between w-[430px] items-center">
                  <span className="text-[#344054] text-base leading-6">
                    Nhớ tài khoản
                  </span>
                  <a
                    href=""
                    className="text-blue-600 text-base leading-6 font-semibold"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              }
            />
          </div>
          <Button
            className="w-[480px] h-12 text-white rounded-lg font-semibold hover:bg-blue-700"
            variant="contained"
            disabled={!buttonLogin}
            onClick={handleLogin}
          >
            <div className="font-semibold text-base leading-7">Đăng nhập</div>
          </Button>

          <div className="flex items-center justify-center ">
            Bạn chưa có tài khoản?{" "}
            <NavLink to={"/register"} className="text-blue-500 font-semibold">
              {" "}
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
      <SnackbarLogin
        status={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      ></SnackbarLogin>

      <SnackbarUnLogin
        status={openSnackbarUnLog}
        onClose={() => setOpenSnackbar(false)}
      ></SnackbarUnLogin>
    </div>
  );
}
