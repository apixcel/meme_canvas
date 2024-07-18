import { useState } from "react";

import SidebarLinks from "./SidebarLinks";
import AddTextContent from "./contents/AddTextContent";
import ChangePosition from "./contents/ChangePosition";
import ShapeContent from "./contents/ShapeContent";
import UploadImageContent from "./contents/UploadImageContent";

const CanvasSideBar = () => {
  const [tab, setTab] = useState("shape");

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

      <div className="w-[calc(100%-80px)] h-full py-[10px] overflow-auto smoothBar">
        {tab === "shape" && <ShapeContent />}
        {tab === "text" && <AddTextContent />}
        {tab === "image" && <UploadImageContent />}
        {tab === "position" && <ChangePosition />}
      </div>
    </div>
  );
};

export default CanvasSideBar;
