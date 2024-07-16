"use client";

import CircleCanvas from "@/components/Canvas/CircleCanvas";
import ImageCanvas from "@/components/Canvas/Image";
import RectCanvas from "@/components/Canvas/RectCanvas";
import CanvasSideBar from "@/components/Canvas/sidebar/CanvasSideBar";
import DownloadButton from "@/components/Canvas/sidebar/topBar/DownloadButton";
import SaveChanges from "@/components/Canvas/sidebar/topBar/SaveChanges";
import TopBar from "@/components/Canvas/sidebar/topBar/TopBar";
import TextCanvas from "@/components/Canvas/TextCanvas";
import TextValueChangeModal from "@/components/Canvas/TextValueChangeModal";
import { IShape, ITextStyle } from "@/types/shape";
import { Trash } from "lucide-react";
import React, { MouseEvent, useEffect, useState } from "react";

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

  useEffect(() => {
    const items = localStorage.getItem("canvas");
    const savedChanges = items ? JSON.parse(items) : [];
    console.log(savedChanges);

    setShapes(savedChanges);
  }, []);

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
  const editText = (value: string) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape?.id) {
        return { ...shape, text: value };
      }
      return shape;
    });
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
          const deltaX = (e.clientX - shape.x) / 2;
          const deltaY = (e.clientY - shape.y) / 2;

          if (shape.type === "text" && shape.textStyle?.fontSize) {
            const newFontSize = Math.max(deltaX, deltaY);

            const shapCopy = { ...shape };
            (shapCopy.textStyle as ITextStyle).fontSize = newFontSize / 8;
            return shapCopy;
          } else {
            const deltaX = e.movementX;
            const deltaY = e.movementY;

            return {
              ...shape,
              width: shape.width + deltaX,
              height: shape.height + deltaY,
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

  return (
    <div
      className="w-full h-screen relative flex items-start justify-start py-[20px] bg-slate-100 gap-[20px]"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="h-full" onClick={() => setSelectedShape(null)}>
        <CanvasSideBar
          setShapes={setShapes}
          shapes={shapes}
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-[10px] w-full h-full">
        <div className="w-full h-[80px] bg-white flex items-center justify-between px-[30px]">
          <TopBar
            setSelectedShape={setSelectedShape}
            selectedShape={selectedShape}
            setShapes={setShapes}
            shapes={shapes}
          />

          <div className="center gap-[15px]">
            <DownloadButton setSelectedShape={setSelectedShape} />
            <SaveChanges shapes={shapes} />
          </div>
        </div>
        <div
          className="w-full h-full mx-auto border-[1px] border-borderColor relative overflow-hidden bg-white"
          id="canvas"
        >
          {shapes.map((shape) => (
            <div
              key={shape.id}
              style={{
                zIndex: shape.zIndex,
                position: "absolute",
                left: shape.x,
                top: shape.y,
                transform: `rotate(${shape.rotation}deg)`,
                display: shape.type === "text" ? "inline-block" : "block",

                userSelect: "none",
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
                    className="absolute top-[-40px] shadow-md left-0 w-[30px] h-[30px] bg-white rounded-full center"
                    onClick={removeItem}
                  >
                    <Trash className="w-[15px]" />
                  </button>
                  {shape.type === "text" ? (
                    <TextValueChangeModal
                      value={shape.text || ""}
                      onSubmit={editText}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapeEditor;
