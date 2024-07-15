"use client";
import CircleCanvas from "@/components/Canvas/CircleCanvas";
import ImageCanvas from "@/components/Canvas/Image";
import RectCanvas from "@/components/Canvas/RectCanvas";
import TextCanvas from "@/components/Canvas/TextCanvas";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { MouseEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  color: string;
  rotation: number;
  type: "rectangle" | "circle" | "image" | "text";
  text?: string;
  radius: number;
  fontSize?: number;
  imageUrl?: string;
}

const ShapeEditor: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [shapes, setShapes] = useState<IShape[]>([]);
  const [dragging, setDragging] = useState<IShape | null>(null);
  const [resizing, setResizing] = useState<IShape | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedShape, setSelectedShape] = useState<IShape | null>(null);

  const RESIZE_HANDLE_SIZE = 15;

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    shape: IShape,
    resize: boolean = false
  ) => {
    e.stopPropagation();

    if (resize) {
      setResizing(shape);
    } else {
      setDragging(shape);
      setOffset({
        x: e.clientX - shape.x,
        y: e.clientY - shape.y,
      });
    }
    setSelectedShape(shape);
  };

  const removeItem = () => {
    const newShapes = shapes.filter(({ id }) => id !== selectedShape?.id);
    setShapes(newShapes);
  };

  // to delete the element
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keycode = e.keyCode;
      if (keycode === 46 && selectedShape) {
        const newShapes = shapes.filter(({ id }) => id !== selectedShape.id);
        setShapes(newShapes);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape, shapes]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === dragging.id) {
          return {
            ...shape,
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    } else if (resizing) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === resizing.id) {
          const deltaX = e.clientX - shape.x;
          const deltaY = e.clientY - shape.y;

          console.log({ deltaX, deltaY });

          if (shape.type === "text" && shape.fontSize) {
            const newFontSize = Math.max(deltaX, deltaY);

            return {
              ...shape,
              fontSize: newFontSize / 8,
            };
          } else if (shape.type === "rectangle" || shape.type === "image") {
            return {
              ...shape,
              width: Math.max(deltaX, RESIZE_HANDLE_SIZE) * 1,
              height: Math.max(deltaY, RESIZE_HANDLE_SIZE) * 1,
            };
          } else if (shape.type === "circle") {
            const newRadius = Math.max(deltaX, deltaY) / 2;
            return {
              ...shape,
              radius: newRadius,
              width: newRadius * 2,
              height: newRadius * 2,
            };
          }
        }
        return shape;
      });
      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  const addRectangle = () => {
    const newShape: IShape = {
      x: 50,
      radius: 0,
      y: 50,
      width: 300,
      height: 200,
      color: "#4a4a4a",
      id: uuidv4(),
      type: "rectangle",
      rotation: 0,
    };
    setShapes([...shapes, newShape]);
  };

  const addCircle = () => {
    const newShape: IShape = {
      x: 150,
      y: 150,
      radius: 100,
      width: 200,
      height: 200,
      color: "#4a4a4a",
      id: uuidv4(),
      type: "circle",
      rotation: 0,
    };
    setShapes([...shapes, newShape]);
  };

  const addText = () => {
    const newShape: IShape = {
      x: 250,
      y: 250,
      radius: 0,
      width: 0,
      height: 0,
      color: "#000000",
      id: uuidv4(),
      type: "text",
      rotation: 0,
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
      radius: 0,
      id: uuidv4(),
      type: "image",
      rotation: 0,
      imageUrl,
    };
    setShapes([...shapes, newShape]);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (!selectedShape) return;
    const newShape = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, color };
      }
      return shape;
    });
    setShapes(newShape);
  };

  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rotation = Number(e.target.value);
    if (!selectedShape) return;
    const newShape = shapes.map((shape) => {
      if (shape.id === selectedShape.id) {
        return { ...shape, rotation };
      }
      return shape;
    });
    setSelectedShape(
      newShape.find(({ id }) => id === selectedShape.id) as IShape
    );
    setShapes(newShape);
  };

  return (
    <div
      className="w-full relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex items-center gap-[10px] mb-[20px] select-none">
        <Button onClick={addRectangle} className="bg-slate-400">
          Add Rectangle
        </Button>
        <Button onClick={addCircle} className="bg-slate-400">
          Add Circle
        </Button>
        <Button onClick={addText} className="bg-slate-400">
          Add Text
        </Button>

        <div className="center gap-[10px]">
          <p>Rotation {selectedShape?.rotation || 0} Deg:</p>
          <input
            type="range"
            max={360}
            value={selectedShape?.rotation || 0}
            onChange={handleChangeRotation}
          />
        </div>

        <div className="center gap-[5px]">
          <p>Color:</p>
          <input
            type="color"
            value={selectedShape?.color || "#4a4a4a"}
            onChange={handleChangeColor}
            disabled={!selectedShape}
            className="disabled:opacity-[0.5]"
          />
        </div>

        <input type="file" onChange={handleImageUpload} />
      </div>

      <div className="w-[90vw] h-screen mx-auto border-[1px] border-borderColor relative overflow-hidden">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              transform: `rotate(${shape.rotation}deg) scale(${1})`,
              display: shape.type === "text" ? "inline-block" : "block",
              fontSize: shape.type === "text" ? `${shape.fontSize}px` : "unset",
              lineHeight:
                shape.type === "text" ? `${shape.fontSize}px` : "unset",
            }}
            onMouseDown={(e) => handleMouseDown(e, shape)}
            className={`${
              selectedShape?.id === shape.id
                ? "border-[#4c4cff]"
                : "border-transparent"
            } border-[2px] p-[10px]`}
          >
            {shape.type === "text" && <TextCanvas shape={shape} />}
            {shape.type === "image" && shape.imageUrl && (
              <ImageCanvas shape={shape} />
            )}
            {shape.type === "rectangle" && <RectCanvas shape={shape} />}
            {shape.type === "circle" && <CircleCanvas shape={shape} />}
            {/* Resize handle */}
            {selectedShape?.id === shape.id ? (
              <>
                <div
                  onMouseDown={(e) => handleMouseDown(e, shape, true)}
                  style={{
                    position: "absolute",
                    width: `${RESIZE_HANDLE_SIZE}px`,
                    height: `${RESIZE_HANDLE_SIZE}px`,
                    bottom: `-${RESIZE_HANDLE_SIZE / 2}px`,
                    right: `-${RESIZE_HANDLE_SIZE / 2}px`,
                    backgroundColor: "white",
                    border: "1px solid black",
                    cursor: "nwse-resize",
                    borderRadius: "50%",
                  }}
                ></div>

                <button
                  className="absolute top-[-35px] shadow-md left-0 w-[30px] h-[30px] bg-white rounded-full center"
                  onClick={removeItem}
                >
                  <Trash className="w-[15px]" />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeEditor;
