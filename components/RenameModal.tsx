"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

const RenameModal = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const [input, setInput] = useState("");

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  async function renameFile() {
    if (!user || !fileId) return;

    toast({
      description: "Renaming..",
    });

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: input,
      })
        .then(() => {
          setInput("");
        })
        .finally(() => {
          setIsRenameModalOpen(false);
          toast({
            title: "Success",
            description: "File has been renamed successfully!",
          });
        });
    } catch (error) {
      console.error("Error in Rename modal", error);
      setIsRenameModalOpen(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with renaming the file.",
      });
    }
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size={"sm"}
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              size={"sm"}
              className="px-3"
              type="submit"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
