import { IShape } from "@/types/shape";
import React, { SetStateAction } from "react";
import { shapeStyleFunction } from "../../canvasFunctions";
import ChangeColor from "./ChangeColor";
import SelecteFontWeight from "./SelecteFontWeight";
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
  const { updateFontSize, handleChangeColor ,updateFontWeight} = shapeStyleFunction({
    setSelectedShape,
    selectedShape,
    shapes,
    setShapes,
  });

  return (
    <div className="flex items-center gap-[20px]">
      {selectedShape?.type == "text" ? (
        <>
          <UpdateFontSize
            selectedShape={selectedShape}
            updateFontSize={updateFontSize}
          />
          <SelecteFontWeight updateFontWeight={updateFontWeight} />
        </>
      ) : (
        ""
      )}

      <ChangeColor
        handleChangeColor={handleChangeColor}
        selectedShape={selectedShape}
      />
    </div>
  );
};

export default TopBar;
