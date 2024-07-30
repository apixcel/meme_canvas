import { useAppSelector } from "@/redux/hook";
import React from "react";
import { shapeStyleFunction } from "../canvasFunctions";
import ChangeColor from "./ChangeColor";
import ChangeOpacity from "./ChangeOpacity";
import DownloadButton from "./DownloadButton";
import SelecteFontWeight from "./SelecteFontWeight";
import UpdateFontSize from "./UpdateFontSize";

const TopBar: React.FC = () => {
  const { shapes, selectedShape } = useAppSelector((state) => state.shapes);

  const {
    updateFontSize,
    handleChangeColor,
    updateFontWeight,
    handleChangeOpacity,
  } = shapeStyleFunction({
    selectedShape,
    shapes,
  });

  return (
    <div className="w-full flex items-center justify-between px-[10px] h-[80px]">
      <div className="flex items-center gap-[20px]">
        {selectedShape?.type == "text" ? (
          <>
            <UpdateFontSize updateFontSize={updateFontSize} />
            <SelecteFontWeight updateFontWeight={updateFontWeight} />
          </>
        ) : (
          ""
        )}

        {selectedShape ? (
          <>
            <ChangeColor handleChangeColor={handleChangeColor} />
            <ChangeOpacity handleChangeOpacity={handleChangeOpacity} />
          </>
        ) : (
          ""
        )}
      </div>
      <DownloadButton />
    </div>
  );
};

export default TopBar;
