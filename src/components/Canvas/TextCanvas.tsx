import { IShape } from "@/types/shape";

const TextCanvas = ({ shape }: { shape: IShape }) => {
  return (
    <p
      style={{
        color: shape.color,
        fontSize: `${shape.textStyle?.fontSize || 20}px`,
        textAlign: `${shape.textStyle?.textAlign || "start"}`,
        fontWeight: `${shape.textStyle?.fontWeight || "400"}`,
      }}
    >
      {shape.text}
    </p>
  );
};

export default TextCanvas;
