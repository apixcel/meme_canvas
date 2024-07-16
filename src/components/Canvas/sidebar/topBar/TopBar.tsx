import { IShape } from "@/types/shape";
import React, { SetStateAction } from "react";
import { shapeStyleFunction } from "../../canvasFunctions";
import ChangeColor from "./ChangeColor";
import UpdateFontSize from "./UpdateFontSize";
interface IProps {
  setSelectedShape: React.Dispatch<SetStateAction<IShape | null>>;
  selectedShape: IShape | null;
  shapes: IShape[];
  setShapes: React.Dispatch<SetStateAction<IShape[]>>;
}
const TopBar: React.FC<IProps> = ({
  setSelectedShape,
  selectedShape,
  shapes,
  setShapes,
}) => {
  const { updateFontSize, handleChangeColor } = shapeStyleFunction({
    setSelectedShape,
    selectedShape,
    shapes,
    setShapes,
  });

  return (
    <div className="flex items-center gap-[20px]">
      <UpdateFontSize
        selectedShape={selectedShape}
        updateFontSize={updateFontSize}
      />
      <ChangeColor
        handleChangeColor={handleChangeColor}
        selectedShape={selectedShape}
      />
    </div>
  );
};

export default TopBar;
