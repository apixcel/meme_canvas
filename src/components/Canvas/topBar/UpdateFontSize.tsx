import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  setSelectedShape,
  updateShape,
} from "@/redux/features/project/project.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IShape } from "@/types/shape";
import { MinusIcon, PlusIcon } from "lucide-react";

interface IProps {
  updateFontSize: (delta: number) => IShape | null;
}

const UpdateFontSize: React.FC<IProps> = ({ updateFontSize }) => {
  const { selectedShape } = useAppSelector((state) => state.shapes);

  const dispatch = useAppDispatch();

  const increaseFontSize = () => {
    const shape = updateFontSize(1);
    if (!shape) return;
    dispatch(setSelectedShape(shape));

    dispatch(updateShape(shape));
  };
  const decCreaseFontSize = () => {
    const shape = updateFontSize(-1);
    if (!shape) return;

    dispatch(setSelectedShape(shape));
    dispatch(updateShape(shape));
  };

  return (
    <div className="center gap-[2px]">
      <Button variant="outline" onClick={decCreaseFontSize}>
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={selectedShape?.textStyle?.fontSize || 0}
        // onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        className="w-20 text-center"
        readOnly
        min={0}
      />
      <Button variant="outline" onClick={increaseFontSize}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UpdateFontSize;
