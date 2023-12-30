import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

interface DeleteAlertProps {
    isOpen: boolean;
    onClose: () => void;
    deleteNote: () => void;
    cancelRef: any;
}

export function DeleteAlert({ isOpen, onClose, deleteNote, cancelRef }: DeleteAlertProps) {
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Note
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure you want to delete this customer? You can&apos;t undo this action afterwards.</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => {
                                deleteNote();
                                onClose();
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
