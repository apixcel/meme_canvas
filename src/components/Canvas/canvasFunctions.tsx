import { IShape } from "@/types/shape";
import { SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  setSelectedShape: React.Dispatch<SetStateAction<IShape | null>>;
  selectedShape: IShape | null;
  shapes: IShape[];
  setShapes: React.Dispatch<SetStateAction<IShape[]>>;
}
export const CanvasFuntions = (args: IProps) => {
  const { selectedShape, setSelectedShape, setShapes, shapes } = args;

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
      zIndex: shapes.length,
    };
    setShapes([...shapes, newShape]);
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
      zIndex: shapes.length,
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
      zIndex: shapes.length,
      textStyle: {
        fontSize: 20,
        textAlign: "start",
      },
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
      zIndex: shapes.length,

      id: uuidv4(),
      type: "image",
      rotation: 0,
      imageUrl,
    };
    setShapes([...shapes, newShape]);
  };

  return {
    handleChangeColor,
    handleChangeRotation,
    handleImageUpload,
    addCircle,
    addRectangle,
    addText,
  };
};
