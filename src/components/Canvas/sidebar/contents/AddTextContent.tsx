import React from "react";
interface IProps {
  addText: () => void;
}

const AddTextContent: React.FC<IProps> = ({ addText }) => {
  return (
    <div className=" flex items-start justify-start flex-col gap-[25px] px-[15px]">
      <h3 className="text-[#bebebe] text-[30px] font-[700]">Add Text</h3>
      <div className="flex items-center justify-start gap-[20px] flex-wrap h-fit w-full">
        <button
          className="w-full bg-primaryMat text-white rounded-[5px] py-[8px]"
          onClick={addText}
        >
          Add a text
        </button>
      </div>
    </div>
  );
};

export default AddTextContent;
