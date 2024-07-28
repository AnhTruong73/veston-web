import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

export default function DialogButton({
  btnNm,
  dialogTitle,
  dialogDescription,
  onClickFunction,
  isDisabled,
  open,
  setOpen,
}) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={isDisabled}>{btnNm}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogDescription}</DialogDescription>
          <DialogFooter>
            <Button onClick={(events) => onClickFunction(events)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
