import { Rating, RatingProps } from "@mui/material";
import React from "react";
import s from './Rating.module.css'


export const RatingMUI = React.memo((props: RatingProps) => {


  // const classes = useStyles();

  return (
    <>
      <Rating  {...props} readOnly className={s.rating} />
    </>
  )
})

//className={classes.root}