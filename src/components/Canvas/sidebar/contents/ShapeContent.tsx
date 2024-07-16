import React from "react";

interface IProps {
  addCircle: () => void;
  addRectangle: () => void;
}
const ShapeContent: React.FC<IProps> = ({ addCircle, addRectangle }) => {
  return (
    <div className=" flex items-start justify-start flex-col gap-[25px] px-[15px]">
      <h3 className="text-[#bebebe] text-[30px] font-[700]">Add shape</h3>
      <div className="flex items-center justify-start gap-[20px] flex-wrap h-fit">
        <button
          className="w-[150px] h-[80px] bg-slate-200"
          onClick={addRectangle}
        >
          Rectagle
        </button>
        <button
          className="w-[80px] h-[80px] rounded-full bg-slate-200"
          onClick={addCircle}
        >
          Circle
        </button>
      </div>
    </div>
  );
};

export default ShapeContent;
