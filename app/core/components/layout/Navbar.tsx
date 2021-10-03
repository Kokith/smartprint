import React, { FC } from "react"
import { RouteUrlObject, Link, Routes } from "blitz"
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
  urlObj: RouteUrlObject
}

interface NavbarItemProps {
  link: LinkShape
}

const NavbarItem: FC<NavbarItemProps> = ({ link }) => {
  const router = useRouter()
  const isActive = router.pathname.startsWith(link.urlObj.pathname) ? true : false

  return (
    <Link href={link.urlObj}>
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
          <NavbarItem key={link.urlObj.pathname} link={link} />
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
        urlObj: Routes.EntreeStockPage(),
        name: "Entree de stock",
      },
      {
        urlObj: Routes.SortieStockPage(),
        name: "Sortie de stock",
      },
    ]}
  />
)

export const fournisseurNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        urlObj: Routes.CommandePage(),
        name: "Commande",
      },
    ]}
  />
)

export const parametresNavbar = (): JSX.Element => (
  <Navbar
    links={
      [
        // {
        //   urlObj: "/parametres/mon-compte",
        //   name: "Mon compte",
        // },
        // {
        //   urlObj: "/parametres/societe",
        //   name: "Societe",
        // },
        // {
        //   urlObj: "/parametres/utilisateurs",
        //   name: "Utilisateurs",
        // },
      ]
    }
  />
)

export const financeNavbar = (): JSX.Element => (
  <Navbar
    links={
      [
        // {
        //   urlObj: "/finance/charges",
        //   name: "Charges",
        // },
        // {
        //   urlObj: "/finance/comptes",
        //   name: "Comptes",
        // },
      ]
    }
  />
)

export default Navbar
