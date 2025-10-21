import { useCallback, useEffect, useRef, useState } from "react";
import "../css/pillSplitter.css";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  id?: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomRightRadius: number;
  bottomLeftRadius: number;
  originalHeight?: number;
  originalWidth?: number;
  fillColor: string;
}

const PillSplitter = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingStateRef = useRef<{
    isDrawing: boolean;
    isDragging: boolean;
    startX: number;
    startY: number;
    dragOffsetX: number;
    dragOffsetY: number;
    selectRect: Rectangle | null;
    clickStartTime: number;
    hasMoved: boolean;
    fillColor: string;
  }>({
    isDrawing: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    selectRect: null,
    clickStartTime: 0,
    hasMoved: false,
    fillColor: "rgba(220, 220, 220, 0.8)",
  });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [rectangles, setRectangles] = useState<Rectangle[] | []>([]);
  const [tempRectangle, setTempRectangle] = useState<Rectangle | null>(null);
  const fillColors = [
    "rgba(255, 99, 132, 0.7)", // soft red / rose
    "rgba(255, 159, 64, 0.7)", // orange
    "rgba(255, 205, 86, 0.7)", // yellow
    "rgba(75, 192, 192, 0.7)", // teal
    "rgba(54, 162, 235, 0.7)", // sky blue
    "rgba(153, 102, 255, 0.7)", // violet
    "rgba(201, 203, 207, 0.7)", // silver grey (neutral)
    "rgba(255, 111, 181, 0.7)", // pink
    "rgba(100, 221, 23, 0.7)", // lime green
    "rgba(0, 188, 212, 0.7)", // cyan
    "rgba(156, 39, 176, 0.7)", // deep purple
    "rgba(255, 87, 34, 0.7)", // deep orange
  ];

  const borderRadius = 10;
  const minSize = 30;
  const clickTime = 200;

  const drawCross = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mousePosition.x, 0);
    ctx.lineTo(mousePosition.x, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, mousePosition.y);
    ctx.lineTo(canvas.width, mousePosition.y);
    ctx.stroke();
  }, [mousePosition]);

  const drawRoundedRect = useCallback(
    (ctx: CanvasRenderingContext2D, rect: Rectangle) => {
      const {
        x,
        y,
        width,
        height,
        topLeftRadius = 0,
        topRightRadius = 0,
        bottomRightRadius = 0,
        bottomLeftRadius = 0,
        fillColor,
      } = rect;
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.moveTo(x + topLeftRadius, y);
      ctx.lineTo(x + width - topRightRadius, y);
      if (topRightRadius > 0) {
        ctx.quadraticCurveTo(x + width, y, x + width, y + topRightRadius);
      } else {
        ctx.lineTo(x + width, y);
      }

      ctx.lineTo(x + width, y + height - bottomRightRadius);
      if (bottomRightRadius > 0) {
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - bottomRightRadius,
          y + height
        );
      } else {
        ctx.lineTo(x + width, y + height);
      }

      ctx.lineTo(x + bottomLeftRadius, y + height);
      if (bottomLeftRadius > 0) {
        ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeftRadius);
      } else {
        ctx.lineTo(x, y + height);
      }
      ctx.lineTo(x, y + topLeftRadius);
      if (topLeftRadius > 0) {
        ctx.quadraticCurveTo(x, y, x + topLeftRadius, y);
      } else {
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fill();
    },
    []
  );
  const drawAll = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#99c2ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (rectangles.length > 0) {
      rectangles.forEach((rect) => {
        drawRoundedRect(ctx, rect);
      });
    }
    if (tempRectangle) {
      drawRoundedRect(ctx, tempRectangle);
    }
    drawCross();
  }, [drawCross, tempRectangle, rectangles, drawRoundedRect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setMousePosition({ x: canvas.width / 2, y: canvas.height / 2 });

    drawAll();
  }, []);

  useEffect(() => {
    drawAll();
  }, [drawAll]);

  const getMousePos = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      // console.log("Mouse Position:", { x: event.clientX, rs: rect.left, y: event.clientY, rt: rect.top });
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    []
  );
  const shouldCutRect = useCallback(
    (rect: Rectangle, crossHairX: number, crossHairY: number) => {
      const verticalIntersects =
        crossHairX > rect.x && crossHairX < rect.x + rect.width;
      const horizontalIntersects =
        crossHairY > rect.y && crossHairY < rect.y + rect.height;
      return verticalIntersects || horizontalIntersects;
    },
    []
  );
  const cutRect = useCallback(
    (rect: Rectangle, crossHairX: number, crossHairY: number) => {
      const verticalIntersects =
        crossHairX > rect.x && crossHairX < rect.x + rect.width;
      const horizontalIntersects =
        crossHairY > rect.y && crossHairY < rect.y + rect.height;
      const rightEdge = rect.x + rect.width;
      const bottomEdge = rect.y + rect.height;
      const slicedRects: Rectangle[] = [];

      if (verticalIntersects && horizontalIntersects) {
        // top left
        if (crossHairX - rect.x > 1 && crossHairY - rect.y > 1) {
          const leftR: Rectangle = {
            id: Date.now() * Math.random(),
            x: rect.x,
            y: rect.y,
            width: crossHairX - rect.x,
            height: crossHairY - rect.y,
            topLeftRadius: rect.topLeftRadius,
            topRightRadius: 0,
            bottomRightRadius: 0,
            bottomLeftRadius: 0,
            originalWidth: rect.originalWidth,
            originalHeight: rect.originalHeight,
            fillColor: rect.fillColor,
          };
          slicedRects.push(leftR);
        }
        // top right
        if (rightEdge - crossHairX > 1 && crossHairY - rect.y > 1) {
          const rightR: Rectangle = {
            id: Date.now() * Math.random(),
            x: crossHairX,
            y: rect.y,
            width: rightEdge - crossHairX,
            height: crossHairY - rect.y,
            fillColor: rect.fillColor,
            topLeftRadius: 0,
            topRightRadius: rect.topRightRadius,
            bottomRightRadius: 0,
            bottomLeftRadius: 0,
          };
          slicedRects.push(rightR);
        }
        // bottom left
        if (crossHairX - rect.x > 1 && bottomEdge - crossHairY > 1) {
          const leftBottomR: Rectangle = {
            id: Date.now() * Math.random(),
            x: rect.x,
            y: crossHairY,
            width: crossHairX - rect.x,
            height: bottomEdge - crossHairY,
            fillColor: rect.fillColor,
            topLeftRadius: 0,
            topRightRadius: 0,
            bottomRightRadius: 0,
            bottomLeftRadius: rect.bottomLeftRadius,
          };
          slicedRects.push(leftBottomR);
        }
        // bottom right
        if (rightEdge - crossHairX > 1 && bottomEdge - crossHairY > 1) {
          const rightBottomR: Rectangle = {
            id: Date.now() * Math.random(),
            x: crossHairX,
            y: crossHairY,
            width: rightEdge - crossHairX,
            height: bottomEdge - crossHairY,
            fillColor: rect.fillColor,
            topLeftRadius: 0,
            topRightRadius: 0,
            bottomRightRadius: rect.bottomRightRadius,
            bottomLeftRadius: 0,
          };
          slicedRects.push(rightBottomR);
        }
      } else if (verticalIntersects) {
        if (crossHairX - rect.x > 1) {
          slicedRects.push({
            id: Date.now() * Math.random(),
            x: rect.x,
            y: rect.y,
            width: crossHairX - rect.x,
            height: rect.height,
            topLeftRadius: rect.topLeftRadius,
            topRightRadius: 0,
            bottomRightRadius: 0,
            bottomLeftRadius: rect.bottomLeftRadius,
            originalWidth: rect.originalWidth,
            originalHeight: rect.originalHeight,
            fillColor: rect.fillColor,
          });
        }
        if (rightEdge - crossHairX > 1) {
          slicedRects.push({
            id: Date.now() * Math.random(),
            x: crossHairX,
            y: rect.y,
            width: rightEdge - crossHairX,
            height: rect.height,
            topLeftRadius: 0,
            topRightRadius: rect.topRightRadius,
            bottomRightRadius: rect.bottomRightRadius,
            bottomLeftRadius: 0,
            originalWidth: rect.originalWidth,
            originalHeight: rect.originalHeight,
            fillColor: rect.fillColor,
          });
        }
      } else if (horizontalIntersects) {
        if (crossHairY - rect.y > 1) {
          const hTopR = {
            id: Date.now() * Math.random(),
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: crossHairY - rect.y,
            topLeftRadius: rect.topLeftRadius,
            topRightRadius: rect.topRightRadius,
            bottomRightRadius: 0,
            bottomLeftRadius: 0,
            originalWidth: rect.originalWidth,
            originalHeight: rect.originalHeight,
            fillColor: rect.fillColor,
          };
          slicedRects.push(hTopR);
        }
        if (bottomEdge - crossHairY > 1) {
          const hBottomR = {
            id: Date.now() * Math.random(),
            x: rect.x,
            y: crossHairY,
            width: rect.width,
            height: bottomEdge - crossHairY,
            topLeftRadius: 0,
            topRightRadius: 0,
            bottomRightRadius: rect.bottomRightRadius,
            bottomLeftRadius: rect.bottomLeftRadius,
            originalWidth: rect.originalWidth,
            originalHeight: rect.originalHeight,
            fillColor: rect.fillColor,
          };
          slicedRects.push(hBottomR);
        }
      }
      return slicedRects;
    },
    []
  );
  const isAboveMinSize = useCallback(
    (
      rect: Rectangle,
      crossHairX: number,
      crossHairY: number,
      selectRect?: Rectangle | null,
      startX?: number
    ) => {
      const { x, y, width, height } = rect;
      const rightEdge = x + width;
      const bottomEdge = y + height;
      const verticalIntersects = crossHairX > rect.x && crossHairX < rightEdge;
      const horizontalIntersects =
        crossHairY > rect.y && crossHairY < bottomEdge;
      const afterCutHeightOfR =
        crossHairY - rect.y > minSize && bottomEdge - crossHairY > minSize;
      const afterCutWidthOfR =
        crossHairX - rect.x > minSize && rightEdge - crossHairX > minSize;
      if (
        verticalIntersects &&
        horizontalIntersects &&
        afterCutHeightOfR &&
        afterCutWidthOfR
      ) {
        console.log(afterCutHeightOfR, afterCutWidthOfR);
        return true;
      } else {
        if (verticalIntersects && horizontalIntersects && afterCutHeightOfR) {
          console.log(afterCutHeightOfR, "height");
          setRectangles((prevR) => {
            const index = prevR.findIndex((r) => r.id == rect.id);
            if (index > -1) {
              const mx = crossHairX;
              const my = crossHairY;
              prevR[index].x = mx;
              prevR[index].y = my;
              return [...prevR];
            } else {
              return prevR;
            }
          });
        } else if (
          verticalIntersects &&
          horizontalIntersects &&
          afterCutWidthOfR
        ) {
          console.log(afterCutWidthOfR, "width");
          setRectangles((prevR) => {
            const index = prevR.findIndex((r) => r.id == rect.id);
            if (index > -1) {
              const mx = crossHairX;
              const my = rect.y - (bottomEdge - crossHairY);
              prevR[index].x = mx;
              prevR[index].y = my;
              return [...prevR];
            } else {
              return prevR;
            }
          });
        } else if (height < minSize && width > minSize + 5) {
          return false;
        } else {
          if (selectRect && selectRect.id == rect.id && startX) {
            setRectangles((prevR) => {
              const index = prevR.findIndex((r) => r.id == selectRect.id);
              if (index > -1) {
                const moveX = startX - rect.x;
                const mx = rect.x + moveX;
                prevR[index].x = mx;
                return [...prevR];
              } else {
                return prevR;
              }
            });
          }
        }
      }
    },
    []
  );
  const cutAllInterRects = useCallback(
    (
      crossHairX: number,
      crossHairY: number,
      selectRect: Rectangle | null,
      startX: number
    ) => {
      setRectangles((prevR) => {
        const rectsToCut = prevR.filter(
          (rect) =>
            shouldCutRect(rect, crossHairX, crossHairY) &&
            isAboveMinSize(rect, crossHairX, crossHairY, selectRect, startX)
        );
        // console.log(rectsToCut, "from to cut",);
        if (rectsToCut.length == 0) {
          return prevR;
        }
        const newRects = [...prevR];
        rectsToCut.forEach((rect) => {
          const index = newRects.findIndex((r) => r.id == rect.id);
          if (index > -1) {
            const slicedRects = cutRect(rect, crossHairX, crossHairY);
            newRects.splice(index, 1, ...slicedRects);
          }
        });
        return newRects;
      });
    },
    [shouldCutRect, cutRect, isAboveMinSize]
  );
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getMousePos(event);
      setMousePosition({ x, y });

      const state = drawingStateRef.current;

      if (state.isDragging && state.selectRect) {
        setRectangles((prev) => {
          return prev.map((rect) =>
            rect.id === state.selectRect?.id
              ? { ...rect, x: x - state.dragOffsetX, y: y - state.dragOffsetY }
              : rect
          );
        });
        state.hasMoved = true;
      } else if (state.isDrawing) {
        state.hasMoved = true;
        const minX = Math.min(state.startX, x);
        const minY = Math.min(state.startY, y);
        const width = Math.abs(x - state.startX);
        const height = Math.abs(y - state.startY);
        setTempRectangle({
          x: minX,
          y: minY,
          width,
          height,
          topLeftRadius: borderRadius,
          topRightRadius: borderRadius,
          bottomRightRadius: borderRadius,
          bottomLeftRadius: borderRadius,
          fillColor: state.fillColor,
        });
      }
    },
    [getMousePos]
  );

  const getRectAt = useCallback(
    (x: number, y: number) => {
      for (let i = rectangles.length - 1; i >= 0; i--) {
        const rect = rectangles[i];
        if (
          x > rect.x &&
          x < rect.x + rect.width &&
          y > rect.y &&
          y < rect.y + rect.height
        ) {
          return rect;
        }
      }
      return null;
    },
    [rectangles]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = getMousePos(event);
      const state = drawingStateRef.current;
      const rect = getRectAt(pos.x, pos.y);
      state.clickStartTime = Date.now();
      state.hasMoved = false;
      if (rect) {
        state.isDragging = true;
        state.selectRect = rect;
        state.dragOffsetX = pos.x - rect.x;
        state.dragOffsetY = pos.y - rect.y;

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.style.cursor = "grabbing";
        }
      } else {
        state.isDrawing = true;
        state.startX = pos.x;
        state.startY = pos.y;
      }
    },
    [getMousePos, getRectAt]
  );
  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getMousePos(event);
      const state = drawingStateRef.current;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = "crosshair";
      }
      if (state.isDragging) {
        const clickDuration = Date.now() - state.clickStartTime;
        const check = clickDuration < clickTime && !state.hasMoved;
        if (check) {
          cutAllInterRects(
            mousePosition.x,
            mousePosition.y,
            state.selectRect,
            x
          );
        }
        state.isDragging = false;
        state.selectRect = null;
      }
      if (state.isDrawing) {
        state.isDrawing = false;
        const clickDuration = Date.now() - state.clickStartTime;
        const check = clickDuration < clickTime && !state.hasMoved;
        if (check) {
          cutAllInterRects(
            mousePosition.x,
            mousePosition.y,
            state.selectRect,
            x
          );
        } else {
          const width = Math.abs(x - state.startX);
          const height = Math.abs(y - state.startY);
          const newRectangle: Rectangle = {
            x: Math.min(x, state.startX),
            y: Math.min(y, state.startY),
            width,
            height,
            id: Date.now() * Math.random(),
            topLeftRadius: borderRadius,
            topRightRadius: borderRadius,
            bottomRightRadius: borderRadius,
            bottomLeftRadius: borderRadius,
            originalHeight: height,
            originalWidth: width,
            fillColor: state.fillColor,
          };
          const check = width > minSize && height > minSize;
          if (check) {
            setRectangles((prev) => [...prev, newRectangle]);
          }

          const index = Math.floor(Math.random() * fillColors.length);
          state.fillColor = fillColors[index];
        }

        setTempRectangle(null);
      }
    },
    [getMousePos, mousePosition]
  );
  return (
    <canvas
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
    />
  );
};

export default PillSplitter;
