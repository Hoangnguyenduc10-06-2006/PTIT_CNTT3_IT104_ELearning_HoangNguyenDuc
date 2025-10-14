import {
  Alert,
  Snackbar,
  type SnackbarCloseReason,
} from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  status: boolean;
  onClose?: () => void;
}

export default function SnackbarLogin({ status, onClose }: Props) {
  const [open, setOpen] = React.useState(status);

  const handleClick = () => {
    setOpen(true);
    if (onClose) onClose();
  };
  useEffect(() => {
    setOpen(status);
  }, [status]);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "escapeKeyDown") {
      return;
    }
    if (onClose) onClose();
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          icon={<CheckCircleIcon sx={{ color: "#02EE6A" }}></CheckCircleIcon>}
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "450px",
            height: "91px",
            borderRadius: "16px",
            bgcolor: "#333E5A",
          }}
        >
          <div className="flex flex-col gap-2">
            <div style={{ fontWeight: 500, fontSize: "18px" }}>
              {" "}
              Thành công{" "}
            </div>
            <div> Đăng nhập tài khoản thành công</div>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}
