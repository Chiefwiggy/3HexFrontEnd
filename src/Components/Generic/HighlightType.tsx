import React from 'react'
import {Typography} from "@mui/material";

interface IHighlightTypeInput {
    text: string,
    number: number
}
const HighlightType = ({
    text,
    number
}: IHighlightTypeInput) => {
    const parts = text.split(/(X)/);

  return (
    <Typography
        sx={{fontSize: "0.8rem"}}
    >
      {parts.map((part, index) =>
        part === 'X' ? (
          <Typography key={index} component="span" color="primary">
            {number}*
          </Typography>
        ) : (
          part
        )
      )}
    </Typography>
  );
};

export default HighlightType