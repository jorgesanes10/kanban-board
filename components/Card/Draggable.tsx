import React, { HTMLAttributes } from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props: HTMLAttributes<HTMLDivElement>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id!,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(-3deg)`,
        zIndex: 10,
      }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {props.children}
    </div>
  );
}
