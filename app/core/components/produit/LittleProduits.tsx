import React, { FC } from "react"
import {
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Divider,
  Text,
  UnorderedList,
  ListItem,
  Badge,
  Box,
} from "@chakra-ui/react"
import { IoMdNotifications } from "react-icons/io"
import { ICON_SIZE } from "../../styles/theme"
import Title from "app/core/components/common/Title"

const LittleProduits: FC = () => {
  const finDeStock: any[] = []
  const vide: any[] = []
  const nb = 0

  return (
    <Popover>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="produits en fin de stock"
            icon={<Icon as={IoMdNotifications} w={ICON_SIZE} h={ICON_SIZE} />}
          />
          {nb !== 0 && (
            <Badge colorScheme="green" position="absolute" top={-2} right={-2}>
              {nb}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Title>Produits en fin de stock</Title>
        </PopoverHeader>
        <PopoverBody>
          <Text>Fin de stock</Text>
          <UnorderedList>
            {finDeStock.map((p) => (
              <ListItem key={p.id}>
                <Text>
                  {p.nom} ({p.prix_vente}Ar) : {p.stock}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
          <Divider />
          <Text>Vide</Text>
          <UnorderedList>
            {vide.map((p) => (
              <ListItem key={p.id}>
                <Text>
                  {p.nom} ({p.prix_vente}Ar) : {p.stock}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default LittleProduits
