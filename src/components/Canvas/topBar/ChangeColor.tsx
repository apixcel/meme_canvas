import { Input } from "@/components/ui/input";
import { IShape } from "@/types/shape";
import React from "react";
interface IProps {
  handleChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedShape: IShape | null;
}
const ChangeColor: React.FC<IProps> = ({
  handleChangeColor,
  selectedShape,
}) => {
  return (
    <div className=" center gap-[5px]">
      <p>Color:</p>
      <Input
        className="p-[0] w-[50px]"
        type="color"
        value={selectedShape?.color}
        onChange={handleChangeColor}
      />
    </div>
  );
};

export default ChangeColor;
