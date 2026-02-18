import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const SHOW_TOAST_EVENT = "SHOW_TOAST";

export const toast = {
  success: (message) => {
    window.dispatchEvent(
      new CustomEvent(SHOW_TOAST_EVENT, {
        detail: { message, severity: "success" },
      })
    );
  },
  error: (message) => {
    window.dispatchEvent(
      new CustomEvent(SHOW_TOAST_EVENT, {
        detail: { message, severity: "error" },
      })
    );
  },
};

const Toast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    const handleToast = (event) => {
      setMessage(event.detail.message);
      setSeverity(event.detail.severity);
      setOpen(true);
    };

    window.addEventListener(SHOW_TOAST_EVENT, handleToast);
    return () => window.removeEventListener(SHOW_TOAST_EVENT, handleToast);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
