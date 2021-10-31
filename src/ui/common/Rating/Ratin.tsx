import { Rating, RatingProps } from "@mui/material";
import React from "react";
import { useStyles } from "./RatingMUI";

export const RatingMUI = React.memo((props: RatingProps) => {


  // const classes = useStyles();

  return (
    <div>
      <Rating  {...props} readOnly /> 
    </div>
  )
})

//className={classes.root}