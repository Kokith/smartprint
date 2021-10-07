import React, { FC, Fragment, Suspense } from "react"
import { RouteUrlObject, Link, Routes, useMutation, useQuery, Router } from "blitz"
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
import logout from "app/auth/mutations/logout"
import getCurrentUser from "app/user/queries/getCurrentUser"

interface LinkShape {
  name: string
  urlObj: RouteUrlObject
}

const NavbarItem: FC<{
  link: LinkShape
}> = ({ link }) => {
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

const RightItemsFallback: FC = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between" minWidth={250}>
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
          <MenuItem justifyContent="center" fontWeight="bold">
            Se deconnecter
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

const RightItems: FC = () => {
  const [user] = useQuery(getCurrentUser, null)
  const [mutate] = useMutation(logout)

  const handleLogout = () => {
    mutate().then(() => {
      Router.replace(Routes.LoginPage().pathname)
    })
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" minWidth={250}>
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
        <MenuButton as={Button}>{user.nom.toUpperCase()}</MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout} justifyContent="center" fontWeight="bold">
            Se deconnecter
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

const Navbar: FC<{
  links: LinkShape[]
}> = ({ links }) => {
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

      <Suspense fallback={<RightItemsFallback />}>
        <RightItems />
      </Suspense>
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
    links={[
      {
        urlObj: Routes.MonComptePage(),
        name: "Mon compte",
      },
      {
        urlObj: Routes.SocietePage(),
        name: "Societe",
      },
      {
        urlObj: Routes.UtilisateursPage(),
        name: "Utilisateurs",
      },
    ]}
  />
)

export const financeNavbar = (): JSX.Element => (
  <Navbar
    links={[
      {
        urlObj: Routes.ChargesPage(),
        name: "Charges",
      },
      {
        urlObj: Routes.ComptesPage(),
        name: "Comptes",
      },
    ]}
  />
)

export default Navbar
