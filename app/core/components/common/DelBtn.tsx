import React, { FC, Fragment, useState } from "react"
import { ICON_SIZE } from "app/core/styles/theme"
import { MdDelete } from "react-icons/md"
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal"
import { Button } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"

const DelBtn: FC<{
  label: string
  isLoading: boolean
  onSubmit: () => Promise<void>
}> = ({ label, onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const cancelRef = React.useRef<any>()

  return (
    <Fragment>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Icon as={MdDelete} width={ICON_SIZE} height={ICON_SIZE} color="red" />
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer {label}
            </AlertDialogHeader>

            <AlertDialogBody>Etes vous sur de vouloir supprimer {label} ?</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onSubmit} mr={3} isLoading={isLoading}>
                Supprimer
              </Button>
              <Button ref={cancelRef} onClick={onClose} marginLeft="">
                Annuler
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
}

export default DelBtn
