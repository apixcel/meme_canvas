"use client";
import { Button } from "@/components/ui/button";
import React, { MouseEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  color: string;
  rotation: number;
  type: "rectangle" | "circle" | "image" | "text";
  scale: number;
  text?: string;
  fontSize?: number;
  imageUrl?: string;
}

const ShapeEditor: React.FC = () => {
  const [shapes, setShapes] = useState<IShape[]>([]);
  const [dragging, setDragging] = useState<IShape | null>(null);
  const [resizing, setResizing] = useState<IShape | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedShape, setSelectedShape] = useState<IShape | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    shape: IShape,
    direction?: string
  ) => {
    e.stopPropagation();
    if (direction) {
      setResizing(shape);
      setResizeDirection(direction);
    } else {
      setDragging(shape);
      setOffset({
        x: e.clientX - shape.x,
        y: e.clientY - shape.y,
      });
      setSelectedShape(shape);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === dragging.id) {
          let newX = e.clientX - offset.x;
          let newY = e.clientY - offset.y;
          // Ensure the shape stays within the boundaries
          if (newX < 0) newX = 0;
          if (newY < 0) newY = 0;
          if (newX + shape.width > 600) newX = 600 - shape.width;
          if (newY + shape.height > 400) newY = 400 - shape.height;
          return {
            ...shape,
            x: newX,
            y: newY,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    } else if (resizing) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === resizing.id) {
          let newWidth = shape.width;
          let newHeight = shape.height;
          let newX = shape.x;
          let newY = shape.y;

          if (resizeDirection === "bottom-right") {
            newWidth = e.clientX - shape.x;
            newHeight = e.clientY - shape.y;
          } else if (resizeDirection === "bottom-left") {
            newWidth = shape.width - (e.clientX - shape.x);
            newHeight = e.clientY - shape.y;
            newX = e.clientX;
          } else if (resizeDirection === "top-right") {
            newWidth = e.clientX - shape.x;
            newHeight = shape.height - (e.clientY - shape.y);
            newY = e.clientY;
          } else if (resizeDirection === "top-left") {
            newWidth = shape.width - (e.clientX - shape.x);
            newHeight = shape.height - (e.clientY - shape.y);
            newX = e.clientX;
            newY = e.clientY;
          }

          // Ensure the shape stays within the boundaries
          if (newX < 0) newX = 0;
          if (newY < 0) newY = 0;
          if (newX + newWidth > 600) newWidth = 600 - newX;
          if (newY + newHeight > 400) newHeight = 400 - newY;

          return {
            ...shape,
            width: newWidth,
            height: newHeight,
            x: newX,
            y: newY,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
    setResizeDirection(null);
  };

  const addRectangle = () => {
    const newShape: IShape = {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      color: "blue",
      id: uuidv4(),
      type: "rectangle",
      rotation: 0,
      scale: 1,
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = () => {
    const newShape: IShape = {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: "green",
      id: uuidv4(),
      type: "circle",
      rotation: 0,
      scale: 1,
    };
    setShapes([...shapes, newShape]);
  };

  const addText = () => {
    const newShape: IShape = {
      x: 250,
      y: 250,
      width: 100,
      height: 50,
      color: "transparent",
      id: uuidv4(),
      type: "text",
      rotation: 0,
      scale: 1,
      text: "Sample Text",
      fontSize: 20,
    };
    setShapes([...shapes, newShape]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newShape: IShape = {
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      color: "",
      id: uuidv4(),
      type: "image",
      rotation: 0,
      scale: 1,
      imageUrl,
    };
    setShapes([...shapes, newShape]);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (!selectedShape) return;
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, color };
      }
      return shape;
    });
    setShapes(newShapes);
  };

  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rotation = Number(e.target.value);
    if (!selectedShape) return;
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, rotation };
      }
      return shape;
    });
    setSelectedShape(
      newShapes.find(({ id }) => id === selectedShape.id) as IShape
    );
    setShapes(newShapes);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!selectedShape) return;
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, text };
      }
      return shape;
    });
    setShapes(newShapes);
  };

  const resetShapes = () => {
    setShapes([]);
  };

  const removeShape = (id: string) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start pt-[20px]">
      <div className="flex items-center gap-2 mb-5">
        <Button
          onClick={addRectangle}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Rectangle
        </Button>
        <Button
          onClick={addCircle}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add Circle
        </Button>
        <Button
          onClick={addText}
          className="bg-black text-white hover:bg-gray-600"
        >
          Add Text
        </Button>
        <Button
          onClick={resetShapes}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Reset
        </Button>

        <div className="flex items-center gap-2">
          <p>Rotation {selectedShape?.rotation || 0} Deg:</p>
          <input
            type="range"
            max={360}
            value={selectedShape?.rotation || 0}
            onChange={handleChangeRotation}
          />
        </div>

        <div className="flex items-center gap-2">
          <p>Color:</p>
          <input
            type="color"
            defaultValue="#0000ff"
            onChange={handleChangeColor}
            disabled={!selectedShape}
            className="disabled:opacity-50"
          />
        </div>

        <input type="file" onChange={handleImageUpload} />
      </div>

      {selectedShape?.type === "text" && (
        <div className="mb-5">
          <p>Edit Text:</p>
          <input
            type="text"
            defaultValue={selectedShape.text}
            onChange={handleTextChange}
          />
        </div>
      )}

      <div
        className="w-[600px] h-[400px] border border-gray-400 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {isClient &&
          shapes.map((shape) => (
            <div
              key={shape.id}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.width,
                height: shape.height,
                backgroundColor:
                  shape.type === "image" ? "transparent" : shape.color,
                transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`,
                fontSize:
                  shape.type === "text" ? `${shape.fontSize}px` : "unset",
                lineHeight:
                  shape.type === "text" ? `${shape.fontSize}px` : "unset",
                borderRadius: shape.type === "circle" ? "50%" : "unset",
                cursor: dragging ? "move" : "pointer",
              }}
              className="absolute"
              onMouseDown={(e) => handleMouseDown(e, shape)}
            >
              {shape.type === "text" && shape.text}
              {shape.type === "image" && shape.imageUrl && (
                <img
                  src={shape.imageUrl}
                  alt="shape"
                  className="w-full h-full"
                />
              )}
              <button
                className="absolute top-[-16px] left-1/2 -translate-x-1/2 text-red-500 rounded-full w-4 h-4 flex items-center justify-center "
                onClick={() => removeShape(shape.id)}
              >
                X
              </button>
              {["bottom-right", "bottom-left", "top-right", "top-left"].map(
                (direction) => (
                  <div
                    key={direction}
                    className={`absolute ${direction} w-2.5 h-2.5 bg-red-500`}
                    style={{
                      [direction.split("-")[0]]: 0,
                      [direction.split("-")[1]]: 0,
                      cursor: `${direction}-resize`,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, shape, direction)}
                  />
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShapeEditor;
