import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addShape } from "@/redux/features/project/project.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import { CloudUploadIcon } from "lucide-react";
import React from "react";

import { v4 as uuidv4 } from "uuid";

const UploadImageContent = () => {
  const { shapes } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newShape: IShape = {
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      color: "",
      radius: 0,
      zIndex: shapes.length,
      id: uuidv4(),
      type: "image",
      rotation: 0,
      imageUrl,
    };
    dispatch(addShape(newShape));
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-primary">
      <div className="flex flex-col items-center justify-center gap-4 text-center text-primary-foreground">
        <CloudUploadIcon className="w-16 h-16 text-[#cbcbcb]" />
        <h2 className="text-3xl font-bold text-[#cbcbcb]">Upload an Image</h2>
        <p className="text-lg text-muted-foreground text-[#a8a8a8]">
          Drag and drop your image here or click to select a file.
        </p>
        <Input
          type="file"
          className="hidden"
          id="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <Label
          className="px-6 py-2 text-lg text-[#cbcbcb] bg-slate-900"
          htmlFor="file"
        >
          Choose File
        </Label>
      </div>
    </div>
  );
};

export default UploadImageContent;
