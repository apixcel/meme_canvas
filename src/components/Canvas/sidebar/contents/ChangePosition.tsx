import { IShape } from "@/types/shape";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { SetStateAction } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface IProps {
  shapes: IShape[] | [];
  setShapes: React.Dispatch<React.SetStateAction<IShape[]>>;
  setSelectedShape: React.Dispatch<SetStateAction<IShape | null>>;
  selectedShape: IShape | null;
}

interface IShapeProps {
  shape: IShape;
  setSelectedShape: React.Dispatch<SetStateAction<IShape | null>>;
  selectedShape: IShape | null;
}

const Shape: React.FC<IShapeProps> = ({
  shape,
  selectedShape,
  setSelectedShape,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: shape.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <div className="w-full" onMouseDown={() => setSelectedShape(shape)}>
      <div
        className={`w-[90%] py-[8px] px-[10px] border-[1px]  flex items-center justify-between mx-auto bg-[#fffffff1] rounded-[8px] ${
          selectedShape?.id === shape.id
            ? "border-[blue]"
            : "border-borderColor"
        }`}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <HiDotsVertical />
        {shape.type === "rectangle" && (
          <div
            style={{
              width: 100,
              height: 50,

              backgroundColor: shape.color,

              borderRadius: `${shape.radius}%`,
            }}
          >
            {shape.text}
          </div>
        )}
        {shape.type === "circle" && (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
              width: 50,
              height: 50,
              backgroundColor: shape.color,

              borderRadius: `${shape.radius}%`,
            }}
          >
            {shape.text}
          </div>
        )}
        {shape.type === "text" && (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
              width: "100%",
              textAlign: "center",
              borderRadius: `${shape.radius}%`,
            }}
          >
            {shape.text}
          </div>
        )}
      </div>
    </div>
  );
};

const ChangePosition: React.FC<IProps> = ({
  shapes,
  setShapes,
  selectedShape,
  setSelectedShape,
}) => {
  const sensiors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

  const getShapePosition = (id: any) => {
    return shapes.findIndex((shape) => shape.id === id);
  };

  const handleDrag = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id === over?.id) return;

    const shapePosition = getShapePosition(active.id);
    const newPosition = getShapePosition(over?.id);

    const newArr = arrayMove(shapes, shapePosition, newPosition);
    const newArrayIndx = newArr.map((shape, i) => ({ ...shape, zIndex: i }));

    setShapes(newArrayIndx as IShape[]);
  };

  return (
    <div>
      <DndContext
        {...sensiors}
        collisionDetection={closestCenter}
        onDragEnd={handleDrag}
      >
        <div className="flex flex-col gap-[20px]">
          <SortableContext
            items={shapes}
            strategy={verticalListSortingStrategy}
          >
            {shapes.map((shape) => (
              <Shape
                key={shape.id}
                shape={shape}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default ChangePosition;
