import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import SnackbarUpdate from "./SnackbarUpdate";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 330,
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
  idEdit: number | null;
  itemEdit: string | null;
  itemEditStatus: string | null;
}

export default function ModalUpdateSubject({
  open,
  close,
  idEdit,
  itemEdit,
  itemEditStatus,
}: Open) {
  const [valueInput, setValueInput] = React.useState<string | null>(itemEdit);
  const [errorInput, setErrorInput] = React.useState<string | null>();

  const [valueStatus, setValueStatus] = React.useState<string | null>(
    itemEditStatus
  );
  const [openSnackbarEdit, setOpenSnackbarEdit] = React.useState(false);

  //khu xu ly thay doi
  const handleChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValueInput(e.target.value);
    if (e.target.value === "") {
      setValueInput(null);
      setErrorInput("empty");
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8081/subject?subject_name=${e.target.value}`
        );
        if (response.data.length > 0) {
          setErrorInput("exist");
          setValueInput(null);
        } else {
          setErrorInput(e.target.value);
          setValueInput(e.target.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // khu vuc xu ly status mới
  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValueStatus(e.target.value);
    }
  };
  //ham xử ly api cap nhat
  const handleClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/subject/${idEdit}`,
        {
          subject_name: valueInput,
          subject_status: valueStatus,
          subject_time: new Date().toISOString(),
        }
      );
      setOpenSnackbarEdit(true);
      setErrorInput(null);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setValueInput(itemEdit);
    setValueStatus(itemEditStatus);
  }, [itemEdit, itemEditStatus]);

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
                Cập nhật môn học
              </div>
              <button onClick={close}>
                {" "}
                <CloseIcon></CloseIcon>
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              value={valueInput}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Tên môn học"
              variant="outlined"
              onChange={(e) => {
                handleChangeInput(e);
              }}
              error={
                errorInput === "empty"
                  ? true
                  : errorInput === "exist"
                  ? true
                  : false
              }
              helperText={
                errorInput === "empty"
                  ? "Tên môn học không được bỏ trống"
                  : errorInput === "exist"
                  ? "Tên môn học đã được sử dụng"
                  : ""
              }
            />
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Trạng thái
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={valueStatus}
                onChange={(e) => {
                  handleStatus(e);
                }}
              >
                <FormControlLabel
                  value="Đang hoạt động"
                  control={<Radio />}
                  label="Đang hoạt động"
                />
                <FormControlLabel
                  value="Ngừng hoạt động"
                  control={<Radio />}
                  label="Ngừng hoạt động"
                />
              </RadioGroup>
            </FormControl>
            <div className="flex justify-end gap-1 ">
              <Button
                variant="text"
                sx={{
                  background: "#E4E4E7",
                  borderRadius: "10px",
                  color: "black",
                  width: "70px",
                  height: "45px",
                }}
                onClick={close}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#007AFF",
                  borderRadius: "10px",
                  width: "70px",
                  height: "45px",
                }}
                onClick={handleClick}
                disabled={valueInput === null ? true : false}
              >
                Lưu
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <SnackbarUpdate
        status={openSnackbarEdit}
        onClose={() => setOpenSnackbarEdit(false)}
      ></SnackbarUpdate>
    </div>
  );
}
