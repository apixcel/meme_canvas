import { useAppSelector } from "@/redux/hook";
import React from "react";
import { shapeStyleFunction } from "../canvasFunctions";
import ChangeColor from "./ChangeColor";
import SelecteFontWeight from "./SelecteFontWeight";
import UpdateFontSize from "./UpdateFontSize";

const TopBar: React.FC = () => {
  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);

  const { updateFontSize, handleChangeColor, updateFontWeight } =
    shapeStyleFunction({
      selectedShape,
      shapes,
    });

  return (
    <div className="flex items-center gap-[20px]">
      {selectedShape?.type == "text" ? (
        <>
          <UpdateFontSize updateFontSize={updateFontSize} />
          <SelecteFontWeight updateFontWeight={updateFontWeight} />
        </>
      ) : (
        ""
      )}

      <ChangeColor handleChangeColor={handleChangeColor} />
    </div>
  );
};

export default TopBar;
