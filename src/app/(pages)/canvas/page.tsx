"use client"
import { Button } from "@/components/ui/button";
import React, { MouseEvent, useRef, useState } from "react";
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
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState<IShape | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, shape: IShape) => {
    setDragging(shape);
    setOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y,
    });
    setSelectedShape(shape);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

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
  };

  const handleMouseUp = () => {
    setDragging(null);
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
      width: 0,
      height: 0,
      color: "black",
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
    <div className="w-full h-screen relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="flex items-center gap-[10px] mb-[20px]">
        <Button onClick={addRectangle} className="bg-slate-400">Add Rectangle</Button>
        <Button onClick={addCircle} className="bg-slate-400">Add Circle</Button>
        <Button onClick={addText} className="bg-slate-400">Add Text</Button>

        <div className="center gap-[10px]">
          <p>Rotation {selectedShape?.rotation || 0} Deg:</p>
          <input type="range" max={360} value={selectedShape?.rotation || 0} onChange={handleChangeRotation} />
        </div>

        <div className="center gap-[5px]">
          <p>Color:</p>
          <input type="color" defaultValue={"#0000ff"} onChange={handleChangeColor} disabled={!selectedShape} className="disabled:opacity-[0.5]" />
        </div>

        <input type="file" onChange={handleImageUpload} />
      </div>

      {shapes.map((shape) => (
        <div
          key={shape.id}
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            width: shape.width,
            height: shape.height,
            backgroundColor: shape.type === "image" ? "transparent" : shape.color,
            transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`,
            display: shape.type === "text" ? "inline-block" : "block",
            fontSize: shape.type === "text" ? `${shape.fontSize}px` : "unset",
            lineHeight: shape.type === "text" ? `${shape.fontSize}px` : "unset",
          }}
          onMouseDown={(e) => handleMouseDown(e, shape)}
          className="shape"
        >
          {shape.type === "text" && shape.text}
          {shape.type === "image" && shape.imageUrl && (
            <img src={shape.imageUrl} alt="shape" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShapeEditor;
