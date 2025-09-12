import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface Props {
  //trigger: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  handleOpenDialog: () => void;
  header?: string;
  description?: string;
  open: boolean;
}

export function ConfirmDialog({ open, handleOpenDialog, onConfirm, onCancel, description = "Essa ação não poderá ser desfeita.", header = "Deseja confirmar?" }: Props) {
  const [disabled, setDisabled] = useState(false);

  const handleConfirm = () => {
    try {
      setDisabled(true);
      onConfirm();
    } finally {
      setDisabled(false);
      handleOpenDialog();
    }
  }
  const handleCancel = () => {
    try {
      setDisabled(true);
      onCancel();
    } finally {
      setDisabled(false);
      handleOpenDialog();
    }
  }
  
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled} onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface SimpleConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  description?: string;
  header?: string;
  children?: React.ReactNode;
}

export function SimpleConfirmDialog({ onConfirm, onCancel, description = "Essa ação não poderá ser desfeita.", header = "Deseja confirmar?", children }: SimpleConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
