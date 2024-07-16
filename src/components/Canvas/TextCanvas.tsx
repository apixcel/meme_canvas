import { IShape } from "@/types/shape";

const TextCanvas = ({ shape }: { shape: IShape }) => {
  console.log(shape.textStyle?.fontSize);

  return (
    <p
      style={{
        color: shape.color,
        fontSize: `${shape.textStyle?.fontSize || 20}px`,
        textAlign: `${shape.textStyle?.textAlign || "start"}`,
      }}
    >
      {shape.text}
    </p>
  );
};

export default TextCanvas;
