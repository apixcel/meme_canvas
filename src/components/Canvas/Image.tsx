import { IShape } from "@/app/(pages)/canvas/page";
import Image from "next/image";
const ImageCanvas = ({ shape }: { shape: IShape }) => {
  if (shape.type !== "image") {
    return <></>;
  }

  return (
    <Image
      width={shape.width}
      height={shape.height}
      src={shape.imageUrl as string}
      alt="shape"
      style={{ width: `${shape.width}px`, height: "auto" }}
    />
  );
};

export default ImageCanvas;
