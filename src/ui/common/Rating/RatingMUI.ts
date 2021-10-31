import { makeStyles, Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    color: "#21268F",
    fontSize: "12px",

    '& span ': {
      padding: "1px",
    },
  }
}))