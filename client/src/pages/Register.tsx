import { Button, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import SnackbarRegister from "../components/SnackbarRegister";
interface infoAccUser {
  firstName: string | null;
  name: string | null;
  email: string | null;
  password: string | null;
  create_at: string;
}
export default function Register() {
  // validate dữ liệu
  const navigate = useNavigate();
  const [errorFirst, setErrorFirst] = useState<null | string>(null);
  const [errorName, setErrorName] = useState<null | string>(null);
  const [errorEmail, setErrorEmail] = useState<null | string>(null);
  const [errorPassWord, setErrorPassword] = useState<null | string>(null);
  const [errorComfirmPassWord, setErrorComfirmPassWord] = useState<
    null | string
  >(null);
  const [checked, setChecked] = useState<boolean>(false);
  // useState thông tin acc
  const [firstName, setFirstName] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [comfirmPassWord, setComfirmPassWord] = useState<null | string>(null);
  const [submit, setSubmit] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  // hàm xử lý
  const checkErrorFirst = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorFirst("empty");
      setFirstName(null);
    } else {
      setErrorFirst(e.target.value);
      setFirstName(e.target.value);
    }
  };

  const checkErrorName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorName("empty");
      setName(null);
    } else {
      setErrorName(e.target.value);
      setName(e.target.value);
    }
  };

  const checkErrorEmail = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorEmail("empty");
      setEmail(null);
    } else if (!e.target.value.endsWith("@gmail.com")) {
      setErrorEmail("wrong");
      setEmail(null);
    } else if (
      e.target.value.slice(0, e.target.value.indexOf("@gmail.com")) === ""
    ) {
      setErrorEmail("wrong");
      setEmail(null);
    } else {
      try {
        const reponse = await axios.get(
          `http://localhost:8081/accountUser?email=${e.target.value}`
        );
        if (reponse.data.length > 0) {
          setErrorEmail("exist");
          setEmail(null);
        } else {
          setErrorEmail(e.target.value);
          setEmail(e.target.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const checkErrorPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorPassword("empty");
      setPassword(null);
    } else if (e.target.value.length < 8) {
      setErrorPassword("shortPassword");
      setPassword(null);
    } else {
      setErrorPassword(e.target.value);
      setPassword(e.target.value);
    }
  };
  const checkErrorComfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setErrorComfirmPassWord("empty");
      setComfirmPassWord(null);
    } else if (e.target.value !== password) {
      setErrorComfirmPassWord("wrong");
      setComfirmPassWord(null);
    } else {
      setErrorComfirmPassWord(e.target.value);
      setComfirmPassWord(e.target.value);
    }
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const validateRegister = () => {
    if (
      firstName !== null &&
      name !== null &&
      email !== null &&
      password !== null &&
      comfirmPassWord !== null &&
      checked === true
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  };

  // xử lý khi submit
  const handleSubmit = async () => {
    const newAccount: infoAccUser = {
      firstName: firstName,
      name: name,
      email: email,
      password: password,
      create_at: new Date().toISOString(),
    };
    try {
      const reponse = await axios.post(
        "http://localhost:8081/accountUser",
        newAccount
      );

      setOpenSnackbar(true);
      setFirstName("");
      setName("");
      setEmail("");
      setPassword("");
      setComfirmPassWord("");
      setSubmit(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateRegister();
  }, [firstName, name, email, password, checked, comfirmPassWord]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="space-y-[20px] md:flex flex-col items-center ">
        <div className="space-y-[20px] md:flex flex-col items-center ">
          <p className="font-semibold text-4xl leading-[44px] text-gray-900">
            Đăng Ký tài khoản
          </p>
          <p className="font-normal text-xl leading-[30px] mb-[20px] text-gray-500">
            Đăng ký tài khoản để sử dụng dịch vụ
          </p>
        </div>

        <div className=" flex flex-col gap-5 ">
          <div className="flex gap-5  flex-1 ">
            <div className="flex flex-col gap-2 flex-1 ">
              <label className="font-semibold text-sm leading-5 text-gray-700">
                Họ và tên đệm
              </label>
              <TextField
                value={firstName}
                id="register-input-firstName"
                type="input"
                onChange={(e) => {
                  checkErrorFirst(e);
                }}
                error={errorFirst === "empty" ? true : false}
                helperText={errorFirst === "empty" ? "Không được bỏ trống" : ""}
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm leading-5 text-gray-700">
                  Tên
                </label>
                <TextField
                  value={name}
                  id="register-input-name"
                  type="input"
                  onChange={(e) => {
                    checkErrorName(e);
                  }}
                  error={errorName === "empty" ? true : false}
                  helperText={
                    errorName === "empty" ? "Không được bỏ trống" : ""
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm leading-5 text-gray-700">
              Email
            </label>
            <TextField
              value={email}
              placeholder="you@company.com"
              className="w-full"
              id="register-input-email"
              type="email"
              onChange={(e) => {
                checkErrorEmail(e);
              }}
              error={
                errorEmail === "empty"
                  ? true
                  : errorEmail === "wrong"
                  ? true
                  : errorEmail === "exist"
                  ? true
                  : false
              }
              helperText={
                errorEmail === "empty"
                  ? "Không được bỏ trống"
                  : errorEmail === "wrong"
                  ? "Không đúng định dạng"
                  : errorEmail === "exist"
                  ? "email đã được đặt"
                  : ""
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm leading-5 text-gray-700">
              Mật khẩu
            </label>
            <TextField
              value={password}
              className="w-full"
              id="register-input-password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                checkErrorPassword(e);
              }}
              error={
                errorPassWord === "empty"
                  ? true
                  : errorPassWord === "shortPassword"
                  ? true
                  : false
              }
              helperText={
                errorPassWord === "empty"
                  ? "Không được bỏ trống"
                  : errorPassWord === "shortPassword"
                  ? "Mật khẩu phải nhiều hơn 8 kí tự "
                  : null
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm leading-5 text-gray-700">
              Xác nhận lại mật khẩu
            </label>
            <TextField
              value={comfirmPassWord}
              className="w-full"
              id="register-input-confirmPassword"
              type="comfirmPassword"
              autoComplete="current-password"
              onChange={(e) => {
                checkErrorComfirmPassword(e);
              }}
              error={
                errorComfirmPassWord === "empty"
                  ? true
                  : errorComfirmPassWord === "wrong"
                  ? true
                  : false
              }
              helperText={
                errorComfirmPassWord === "empty"
                  ? "Không được bỏ trống"
                  : errorComfirmPassWord === "wrong"
                  ? "mật khẩu xác nhận không đúng"
                  : null
              }
            />
          </div>

          <div>
            <FormControlLabel
              control={<Checkbox onChange={(e) => handleChecked(e)} />}
              label={
                <span>
                  <span className="text-[#344054] text-base leading-6">
                    Bạn đông ý với {""}{" "}
                  </span>
                  <a className="text-[#007AFF] text-base leading-6">
                    chính sách và điều khoản
                  </a>
                </span>
              }
            />
          </div>
          <Button
            className="w-[480px] h-12 text-white rounded-lg font-semibold hover:bg-blue-700"
            variant="contained"
            disabled={!submit}
            onClick={handleSubmit}
          >
            <div className="font-semibold text-base leading-7">Đăng ký</div>
          </Button>

          <div className="flex items-center justify-center ">
            Bạn đã có tài khoản?{" "}
            <NavLink to={"/"} className="text-blue-500 font-semibold">
              {" "}
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
      <SnackbarRegister
        status={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      ></SnackbarRegister>
    </div>
  );
}
