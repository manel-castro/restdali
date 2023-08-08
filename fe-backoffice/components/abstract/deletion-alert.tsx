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
import { Button } from "@/components/ui/button"

export interface IDeletionAlert {
  isOpen: boolean
  onSuccess: () => void
  onCancel: () => void
}


export const DeletionAlert: React.FC<IDeletionAlert> = ({ isOpen, onSuccess, onCancel }) => {
  return (
    <AlertDialog open={isOpen}  >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Eliminará permanentemente este campo de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onSuccess}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
