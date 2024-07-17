import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IShape } from "@/types/shape";
import React from "react";
import { AiOutlineSave } from "react-icons/ai";

interface IProps {
  shapes: IShape[] | [];
}

const SaveChanges: React.FC<IProps> = ({ shapes }) => {
  const handleSaveChanges = () => {
    const closeBtn = document.getElementById("close") as HTMLElement;

    localStorage.setItem("canvas", JSON.stringify(shapes));
    closeBtn.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-[25px] border-slate-200 rounded-[8px] "
          variant={"outline"}
        >
          <AiOutlineSave />
        </Button>
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-md rounded-lg p-6 shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle>Do you want to save your changes Changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Do you want to save them?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <span id="close">Dont save</span>
          </DialogClose>
          <Button
            onClick={handleSaveChanges}
            className="bg-[#080808] text-white hover:bg-[#585858]"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveChanges;
