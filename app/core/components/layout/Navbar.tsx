import React, { FC } from "react"
import Link from "next/link"
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  Skeleton,
} from "@chakra-ui/react"
import { FaUser } from "react-icons/fa"
import { ICON_SIZE } from "../../styles/theme"
import { useRouter } from "next/router"
import LittleProduits from "../produit/LittleProduits"

interface LinkShape {
  name: string
  url: string
}

interface NavbarItemProps {
  link: LinkShape
}

const NavbarItem: FC<NavbarItemProps> = ({ link }) => {
  const router = useRouter()
  const isActive = router.pathname.startsWith(link.url) ? true : false

  return (
    <Link key={link.url} href={link.url}>
      <Text as="button" marginRight={5} color={isActive ? "secondary" : "white"} fontWeight="bold">
        {link.name}
      </Text>
    </Link>
  )
}

interface Props {
  links: LinkShape[]
}

const Navbar: FC<Props> = ({ links }) => {
  return (
    <Flex
      height="100%"
      paddingInline={25}
      backgroundColor="quaternary"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex>
        {links.map((link) => (
          <NavbarItem link={link} key={link.url} />
        ))}
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" w={250}>
        <LittleProduits />
        {false ? (
          <Image
            borderRadius={"full"}
            objectFit="contain"
            boxSize="50px"
            src={""}
            fallback={<Skeleton height="10px" />}
            alt="utilisateur photo"
          />
        ) : (
          <Icon as={FaUser} w={ICON_SIZE} h={ICON_SIZE} color="white" />
        )}

        <Menu>
          <MenuButton as={Button}>...</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                //
              }}
              justifyContent="center"
              fontWeight="bold"
            >
              Se deconnecter
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export const stockNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        url: "/stock/entree-stock",
        name: "Entree de stock",
      },
      {
        url: "/stock/sortie-stock",
        name: "Sortie de stock",
      },
    ]}
  />
)

export const fournisseurNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        url: "/fournisseurs/commande",
        name: "Commande",
      },
    ]}
  />
)

export const parametresNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        url: "/parametres/mon-compte",
        name: "Mon compte",
      },
      {
        url: "/parametres/societe",
        name: "Societe",
      },
      {
        url: "/parametres/utilisateurs",
        name: "Utilisateurs",
      },
    ]}
  />
)

export const financeNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        url: "/finance/charges",
        name: "Charges",
      },
      {
        url: "/finance/comptes",
        name: "Comptes",
      },
    ]}
  />
)

export default Navbar
