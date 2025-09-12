import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { allowedImages } from "@/lib/utils";


interface ImageImputProps {
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
}


export default function SelectImageInput({ image, setImage }: ImageImputProps) {

  const [selected, setSelected] = useState<string | null>(image);
  const [open, setOpen] = useState(false);

  const handleSelect = () => {
    if(!selected) return;

    setImage(selected);
    setSelected(null);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2">Alterar imagem</Button>
      </DialogTrigger>
      <DialogContent className="space-y-8">

        <DialogHeader>
          <DialogTitle>Selecione uma imagem</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          {
            allowedImages.map((src) => (
              <Image
                key={src}
                src={src}
                alt={""}
                width={80}
                height={80}
                className={`rounded-full object-cover border-2 w-[80px] h-[80px] mx-auto cursor-pointer ${selected === src && "border-blue-500"}`}
                onClick={() => setSelected(src)}
              />
            ))
          }
        </div>

        <Button onClick={handleSelect}>Selecionar</Button>
      </DialogContent>
    </Dialog>
  )
}