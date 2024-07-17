import { Button } from "@/components/ui/button";
import { IShape } from "@/types/shape";
import { toPng } from "html-to-image";
import React, { SetStateAction } from "react";
import { MdDownload } from "react-icons/md";
interface IProps {
  setSelectedShape: React.Dispatch<SetStateAction<IShape | null>>;
}
const DownloadButton: React.FC<IProps> = ({ setSelectedShape }) => {
  const downloadImage = async () => {
    setSelectedShape(null);
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
