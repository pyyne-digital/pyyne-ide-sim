import { useEffect } from 'react';

export const useDragGesture = (callback: any, undo: any) => {
  const exitCallback = () => {
    document.removeEventListener('mousemove', callback);
    undo();
  };

  useEffect(() => {
    document.addEventListener('mousemove', callback);
    document.addEventListener('mouseup', exitCallback);
    document.addEventListener('mouseleave', exitCallback);
  });
};
