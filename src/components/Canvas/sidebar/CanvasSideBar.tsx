import React, { SetStateAction, useState } from "react";

import { IShape } from "@/types/shape";
import { CanvasFuntions } from "../canvasFunctions";
import SidebarLinks from "./SidebarLinks";
import AddTextContent from "./contents/AddTextContent";
import ShapeContent from "./contents/ShapeContent";

interface IProps {

  shapes: IShape[];
  setShapes: React.Dispatch<SetStateAction<IShape[]>>;
}

const CanvasSideBar: React.FC<IProps> = ({

  shapes,
  setShapes,
}) => {
  const [tab, setTab] = useState("shape");

  const {
    addCircle,
    addRectangle,
    addText,
    handleImageUpload,
  } = CanvasFuntions({
    shapes,
    setShapes,
  });

  return (
    // <div className="flex flex-col items-center gap-[10px] mb-[20px] select-none">
    //   <Button onClick={addRectangle} className="bg-slate-400">
    //     Add Rectangle
    //   </Button>
    //   <Button onClick={addCircle} className="bg-slate-400">
    //     Add Circle
    //   </Button>
    //   <Button onClick={addText} className="bg-slate-400">
    //     Add Text
    //   </Button>

    //   <div className="center gap-[10px]">
    //     <p>Rotation {selectedShape?.rotation || 0} Deg:</p>
    //     <input
    //       type="range"
    //       max={360}
    //       value={selectedShape?.rotation || 0}
    //       onChange={handleChangeRotation}
    //     />
    //   </div>

    //   <div className="center gap-[5px]">
    //     <p>Color:</p>
    //     <input
    //       type="color"
    //       value={selectedShape?.color || "#4a4a4a"}
    //       onChange={handleChangeColor}
    //       disabled={!selectedShape}
    //       className="disabled:opacity-[0.5]"
    //     />
    //   </div>

    //   <input type="file" onChange={handleImageUpload} />
    // </div>

    <div className="h-full w-[550px] bg-[#252627] flex items-start justify-start">
      <SidebarLinks setTab={setTab} tab={tab} />

      <div className="w-[calc(100%-80px)] h-full py-[10px]">
        {tab === "shape" && (
          <ShapeContent addCircle={addCircle} addRectangle={addRectangle} />
        )}
        {tab === "text" && <AddTextContent addText={addText} />}
      </div>
    </div>
  );
};

export default CanvasSideBar;
