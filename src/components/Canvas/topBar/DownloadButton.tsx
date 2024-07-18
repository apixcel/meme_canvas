import { Button } from "@/components/ui/button";
import { setSelectedShape } from "@/redux/features/project/project.slice";
import { useAppDispatch } from "@/redux/hook";
import { toPng } from "html-to-image";
import React from "react";
import { MdDownload } from "react-icons/md";

const DownloadButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const downloadImage = async () => {
    dispatch(setSelectedShape(null));
    const node = document.getElementById("canvas");

    if (!node) {
      console.error(`Element with id ${"canvas"} not found`);
      return;
    }

    try {
      const dataUrl = await toPng(node, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to convert HTML element to image:", error);
    }
  };
  return (
    <Button
      className="text-[25px] border-slate-200 rounded-[8px] "
      variant={"outline"}
      onClick={downloadImage}
    >
      <MdDownload />
    </Button>
  );
};

export default DownloadButton;
