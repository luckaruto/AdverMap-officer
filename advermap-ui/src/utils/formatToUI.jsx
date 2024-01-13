import Alert from "@mui/material/Alert";
import React from "react";
import {
  RequestState,
  SpaceFormat,
  SpaceType,
  SurfaceFormat,
} from "constants/types";
import { formatFormat, plannedFormat, stateFormat, typeFormat } from "./format";

const styles = {
  padding: 1,
  fontSize: "12px",
  maxWidth: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const stateFormatUI = (value) => {
  const content = stateFormat(value);
  let status;

  switch (value) {
    case RequestState.IN_PROGRESS:
      status = "info";
      break;
    case RequestState.REJECTED:
      status = "error";
      break;
    case RequestState.CANCELED:
      status = "error";
      break;
    case RequestState.APPROVED:
      status = "success";
      break;
    default:
      status = "warning";
      break;
  }

  return (
    <Alert
      icon={false}
      sx={styles}
      variant="standard"
      // @ts-ignore
      severity={status}
    >
      {content}
    </Alert>
  );
};

export const plannedFormatUI = (value) => {
  const content = plannedFormat(value);
  return (
    <Alert
      icon={false}
      sx={styles}
      variant="standard"
      severity={value ? "success" : "error"}
    >
      {content}
    </Alert>
  );
};
export const typeFormatUI = (value) => {
  const content = typeFormat(value);
  return (
    <Alert icon={false} sx={styles} variant="standard" severity={"info"}>
      {content}
    </Alert>
  );
};
export const formatFormatUI = (value) => {
  const content = formatFormat(value);
  return (
    <Alert icon={false} sx={styles} variant="outlined" severity={"info"}>
      {content}
    </Alert>
  );
};
