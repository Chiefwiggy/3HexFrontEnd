import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';

const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        color: isOver ? 'green' : undefined,
        border: '1px solid',
        padding: 2,
        borderRadius: 1,
        transition: 'color 0.3s',
      }}
    >
      {props.children}
    </Box>
  );
};

export default Droppable;
