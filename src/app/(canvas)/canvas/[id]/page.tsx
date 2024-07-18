"use client";

import CircleCanvas from "@/components/Canvas/CircleCanvas";
import ImageCanvas from "@/components/Canvas/Image";
import RectCanvas from "@/components/Canvas/RectCanvas";
import CanvasSideBar from "@/components/Canvas/sidebar/CanvasSideBar";
import TextCanvas from "@/components/Canvas/TextCanvas";
import TextValueChangeModal from "@/components/Canvas/TextValueChangeModal";
import DownloadButton from "@/components/Canvas/topBar/DownloadButton";
import SaveChanges from "@/components/Canvas/topBar/SaveChanges";
import TopBar from "@/components/Canvas/topBar/TopBar";
import {
  useGetProjectQuery,
  useUpdateProjectShapeMutation,
} from "@/redux/features/project/project.api";
import {
  setSelectedShape,
  setShapes,
} from "@/redux/features/project/project.slice";
import { useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import debounce from "lodash/debounce";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
const ShapeEditor: React.FC = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetProjectQuery(id as string);
  const [update] = useUpdateProjectShapeMutation();

  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);

  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);

  const [dragging, setDragging] = useState<IShape | null>(null);
  const [resizing, setResizing] = useState<IShape | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // => debouncing
  const debouncedUpdate = useMemo(
    () =>
      debounce((id, shapes) => {
        if (!shapes.length) return;
        update({ id, shapes });
      }, 1000),
    [update]
  );

  useEffect(() => {
    debouncedUpdate(id, shapes);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [shapes, debouncedUpdate, id]);

  useEffect(() => {
    if (data && data.data) {
      dispatch(setShapes(data.data.shapes));
    }
  }, [data, dispatch]);

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
    dispatch(setSelectedShape(shape));
  };

  const removeItem = () => {
    const newShapes = shapes.filter(({ id }) => id !== selectedShape?.id);
    dispatch(setShapes(newShapes));
  };
  const editText = (value: string) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShape?.id) {
        return { ...shape, text: value };
      }
      return shape;
    });
    dispatch(setShapes(newShapes));
  };

  // to delete the element
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keycode = e.keyCode;
      if (keycode === 46 && selectedShape) {
        const newShapes = shapes.filter(({ id }) => id !== selectedShape.id);
        dispatch(setShapes(newShapes));
      }

      if (e.ctrlKey && e.key === "c" && selectedShape) {
        navigator.clipboard.writeText(selectedShape.id || "").catch((err) => {
          console.error("Could not copy text: ", err);
        });
      }

      if (e.ctrlKey && e.key === "v") {
        navigator.clipboard
          .readText()
          .then((pastedText) => {
            const shapeToClone = shapes.find(
              (shape) => shape.id === pastedText
            );
            if (shapeToClone) {
              const newCloneShape = {
                ...shapeToClone,
                x: 80,
                y: 50,
                zIndex: shapes.length,
                id: uuid(),
              };

              dispatch(setShapes([...shapes, newCloneShape]));
              dispatch(setSelectedShape(newCloneShape));
            }
          })
          .catch((err) => {
            console.error("Could not read text from clipboard: ", err);
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedShape, shapes, dispatch]);

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
      dispatch(setShapes(newShapes));
    } else if (resizing) {
      const newShapes = shapes.map((shape) => {
        if (shape.id === resizing.id) {
          if (shape.type === "text" && shape.textStyle?.fontSize) {
            const deltaX = (e.clientX - shape.x) / 2;
            const deltaY = (e.clientY - shape.y) / 2;
            const newFontSize = Math.max(deltaX, deltaY);

            const { textStyle = {}, ...rest } = shape;
            const newTextStyle = { ...textStyle, fontSize: newFontSize };

            return { ...rest, textStyle: newTextStyle };
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
      dispatch(setShapes(newShapes));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };
  if (isFetching) {
    return <></>;
  }
  return (
    <div
      className="w-full h-screen relative flex items-start justify-start py-[20px] bg-slate-100 gap-[20px]"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="h-full" onClick={() => setSelectedShape(null)}>
        <CanvasSideBar />
      </div>

      <div className="flex flex-col justify-start items-start gap-[10px] w-full h-full">
        <div className="w-full h-[80px] bg-white flex items-center justify-between px-[30px]">
          <TopBar />

          <div className="center gap-[15px]">
            <DownloadButton />
            <SaveChanges shapes={shapes} />
          </div>
        </div>
        <div
          className="max-w-full h-full mx-auto border-[1px] border-borderColor relative overflow-hidden bg-white"
          id="canvas"
          style={{
            width: data?.data?.canvas.width,
            aspectRatio:
              (data?.data?.canvas.width || 1) /
              (data?.data?.canvas.height || 1),
          }}
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
