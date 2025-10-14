import { Alert } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 280,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  p: 4,
};

interface Props {
  status: boolean;
  close: () => void;
  item: string;
  idDelete: number;
}

export default function ModalDelete({ status, close, item, idDelete }: Props) {
  const [open, setOpen] = React.useState(status);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/subject/${idDelete}`);

      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Modal
          open={status}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ErrorOutlineIcon
              sx={{
                color: "#D92D20",
                bgcolor: "#FEE4E2",
                border: "8px",
                borderRadius: "28px",
                width: "48px",
                height: "48px",
              }}
            ></ErrorOutlineIcon>
            <div
              style={{
                fontWeight: "700",
                fontSize: "20px",
                lineHeight: "28px",
                color: "#101828",
              }}
            >
              Xác nhận
            </div>
            <div
              style={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "24px",
                color: "#101828",
              }}
            >
              Bạn có chắc chắn muốn xóa{" "}
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#667085",
                }}
              >
                {item}
              </span>{" "}
              khỏi hệ thống không?
            </div>
            <div className="flex justify-end gap-1 ">
              <Button
                variant="text"
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "24px",
                  background: "#E4E4E7",
                  borderRadius: "10px",
                  color: "#344054",
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
                  background: "#D92D20",
                  borderRadius: "10px",
                  width: "70px",
                  height: "45px",
                }}
                onClick={handleDelete}
              >
                Xóa
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
