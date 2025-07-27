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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import { Info, Trash } from "lucide-react";

interface CustomDeleteAlertProps {
  source: string;
  id: number | string;
  text: string;
  onDelete: () => void;
}

export function CustomDeleteAlert({
  source,
  text,
  onDelete,
}: CustomDeleteAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="btn-action-delete"
          title={CUSTOM_TEXT.text_hapus_data}>
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[400px] max-w-[91vw] p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="alert-title text-xl">
            <Info className="w-5 h-5" />
            {CUSTOM_TEXT.text_informasi}
          </AlertDialogTitle>
          <AlertDialogDescription className="alert-desc text-base">
            {`${source} : `}
            <span className="text-[var(--color-error)]">{text}</span>
            <br />
            {CUSTOM_TEXT.info_konfirmasi_hapus}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <AlertDialogCancel className="btn-alert-secondary">
            {CUSTOM_TEXT.button_tidak}
          </AlertDialogCancel>
          <AlertDialogAction
            className="btn-alert-primary"
            onClick={() => onDelete()}>
            {CUSTOM_TEXT.button_ya}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
