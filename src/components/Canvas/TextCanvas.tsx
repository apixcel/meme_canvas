import { IShape } from "@/app/(pages)/canvas/page";

const TextCanvas = ({ shape }: { shape: IShape }) => {
  return (
    <p
      contentEditable
      onInput={(e) => console.log(e)}
      style={{ color: shape.color }}
    >
      {shape.text}
    </p>
  );
};

export default TextCanvas;
