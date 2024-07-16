import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IShape } from "@/types/shape";
import { MinusIcon, PlusIcon } from "lucide-react";

interface IProps {
  updateFontSize: (delta: number) => void;
  selectedShape: IShape | null;
}

const UpdateFontSize: React.FC<IProps> = ({
  updateFontSize,
  selectedShape,
}) => {
  return (
    <div className="center gap-[2px]">
      <Button variant="outline" onClick={() => updateFontSize(-1)}>
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
      <Button variant="outline" onClick={() => updateFontSize(1)}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UpdateFontSize;
