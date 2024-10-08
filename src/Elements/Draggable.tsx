import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import {Box, Button} from '@mui/material';

const Draggable = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </Box>
  );
};

export default Draggable;
