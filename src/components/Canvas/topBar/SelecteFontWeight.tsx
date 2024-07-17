import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFontWeight } from "@/types/shape";
import React from "react";

interface IProps {
  updateFontWeight: (delta: TFontWeight) => void;
}

const SelecteFontWeight: React.FC<IProps> = ({ updateFontWeight }) => {
  return (
    <Select onValueChange={(e) => updateFontWeight(Number(e) as TFontWeight)}>
      <SelectTrigger className="w-[180px] border-borderColor">
        <SelectValue placeholder="Select font weight" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup className="cursor-pointer">
          <SelectLabel>Font Weight</SelectLabel>
          <SelectItem value="300">Light</SelectItem>
          <SelectItem value="400">Regular</SelectItem>
          <SelectItem value="500">Medium</SelectItem>
          <SelectItem value="600">Bold</SelectItem>
          <SelectItem value="700">Extra bold</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelecteFontWeight;
