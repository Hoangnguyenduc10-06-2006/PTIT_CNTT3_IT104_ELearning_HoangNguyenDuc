import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import SnackbarAddSubject from "./SnackbarAddSubject";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  p: 4,
};

interface Open {
  open: boolean;
  close: () => void;
}
interface Subject {
  subject_name: string | null;
  subject_status: string | null;
  subject_time: string | null;
}

export default function ModalUpdateLession({ open, close }: Open) {
  const [error, setError] = React.useState<string | null>(null);
  const [valueInput, setValueInput] = React.useState<string | null>(null);

  const [status, setStatus] = React.useState<boolean>(false);
  const [valueStatus, setValueStatus] = React.useState<string | null>(null);

  const [btnnAdd, setBtnAdd] = React.useState<boolean>(true);

  const [openSnackbarAdd, setOpenSnackbarAdd] = React.useState(false);
  // khu xu ly validate
  const handleCheck = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setError("empty");
      setValueInput(null);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8081/subject?subject_name=${e.target.value}`
        );
        if (response.data.length > 0) {
          setError("exist");
          setValueInput(null);
        } else {
          setError(e.target.value);
          setValueInput(e.target.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // khu vực xử lý status
  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setStatus(e.target.checked);
      setValueStatus(e.target.value);
    } else {
      setStatus(false);
      setValueStatus(null);
    }
  };
  // btn add
  const btnAdd = () => {
    if (valueInput !== null && status !== false) {
      setBtnAdd(false);
    } else {
      setBtnAdd(true);
    }
  };

  const handleClick = async () => {
    const newSubject: Subject = {
      subject_name: valueInput,
      subject_status: valueStatus,
      subject_time: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "http://localhost:8081/subject",
        newSubject
      );

      setOpenSnackbarAdd(true);
      setValueInput("");
      setValueStatus(null);
      setStatus(false);
      setError(null);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  // khu vuc selec
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  React.useEffect(() => {
    btnAdd();
  }, [valueInput, valueStatus]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-add-subject" variant="h6" component="h2">
            <div className="flex justify-between">
              <div className="font-semibold text-[20px] leading-[24px]">
                Cập nhật bài học
              </div>
              <button onClick={close}>
                <CloseIcon></CloseIcon>
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Tên môn học"
              variant="outlined"
              error={
                error === "empty" ? true : error === "exist" ? true : false
              }
              helperText={
                error === "empty"
                  ? "Tên môn học không được bỏ trống"
                  : error === "exist"
                  ? "Tên môn học đã được sử dụng"
                  : ""
              }
              onChange={(e) => handleCheck(e)}
            />
          </Typography>
          <FormControl fullWidth sx={{ height: 44 }}>
            <InputLabel id="demo-simple-select-label">loại môn học</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="loại môn học"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              size="small"
              type="number"
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="thời gian học"
              variant="outlined"
            />
          </Typography>

          <div className="flex justify-end ">
            <Button variant="text" onClick={close}>
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#007AFF", borderRadius: "10px" }}
              disabled={btnnAdd}
              onClick={handleClick}
            >
              Thêm
            </Button>
          </div>
        </Box>
      </Modal>
      <SnackbarAddSubject
        status={openSnackbarAdd}
        onClose={() => setOpenSnackbarAdd(false)}
      ></SnackbarAddSubject>
    </div>
  );
}
