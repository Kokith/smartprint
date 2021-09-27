import React, { FC, memo, useEffect, useState } from "react"
import Link from "next/link"
import { MdDashboard, MdSettings } from "react-icons/md"
import { BsGraphUp } from "react-icons/bs"
import { IconType } from "react-icons/lib"
import { useRouter } from "next/router"
import { VStack, Text, Flex, Icon, Spacer, Box, Spinner } from "@chakra-ui/react"
import {
  FaProductHunt,
  FaCartPlus,
  FaProjectDiagram,
  FaCalculator,
  FaMoneyBillWaveAlt,
  FaUsers,
} from "react-icons/fa"
import { ICON_SIZE } from "../../styles/theme"
import { useIsFetching } from "react-query"

const SidebarMenuItem: FC<{
  title: string
  link: string
  itemIcon: IconType
}> = ({ title, itemIcon, link }) => {
  const router = useRouter()
  const isActive = router.pathname.startsWith(link) ? true : false
  return (
    <Link href={link} passHref={true}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="full"
        bg={isActive ? "secondary" : undefined}
        as="button"
        padding={3}
      >
        <Flex width="75%" alignItems="center">
          <Icon as={itemIcon} color="white" w={ICON_SIZE} h={ICON_SIZE} marginRight={5} />
          <Text color="white" fontWeight="bold" fontSize="1xl">
            {title}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}

const SmartPrintTitle: FC = () => {
  const isFetching = useIsFetching()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timer
    if (isFetching) setIsVisible(true)
    else timer = setTimeout(() => setIsVisible(false), 1500)

    return () => clearTimeout(timer)
  }, [isFetching])

  return (
    <Flex
      w="full"
      paddingInline="8"
      marginBottom={10}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color="white" fontSize="3xl" fontWeight="bold" marginRight="1.5">
        SmartPrint
      </Text>
      <Spinner color="white" speed="0.8s" hidden={!isVisible} />
    </Flex>
  )
}
const MemoizedSmartPrintTitle = memo(SmartPrintTitle)

const Sidebar: FC = () => {
  return (
    <VStack height="full" width="15%" position="fixed" bg="primary">
      <MemoizedSmartPrintTitle />
      <SidebarMenuItem title="Dashboard" itemIcon={MdDashboard} link="/dashboard" />
      <SidebarMenuItem title="Stock" itemIcon={FaProductHunt} link="/stock" />
      <SidebarMenuItem title="Fournisseurs" itemIcon={FaCartPlus} link="/fournisseurs" />
      <SidebarMenuItem title="Projets" itemIcon={FaProjectDiagram} link="/projets" />
      <SidebarMenuItem title="Devis" itemIcon={FaCalculator} link="/devis" />
      <SidebarMenuItem title="Clients" itemIcon={FaUsers} link="/clients" />
      <SidebarMenuItem title="Finances" itemIcon={BsGraphUp} link="/finance/charges" />
      <SidebarMenuItem title="Factures" itemIcon={FaMoneyBillWaveAlt} link="/factures" />
      <Spacer />
      <SidebarMenuItem title="Parametres" itemIcon={MdSettings} link="/parametres/mon-compte" />
    </VStack>
  )
}

interface AppLayoutProps {
  navbar: JSX.Element
}

const AppLayout: FC<AppLayoutProps> = ({ children, navbar: Navbar }) => {
  return (
    <Flex minH="100vh">
      <Box w="15%">
        <Sidebar />
      </Box>

      <Box w="85%" display="flex" flexDirection="column">
        <Box width="85%" h={75} top={0} position="fixed" zIndex={1000}>
          {Navbar}
        </Box>
        <Box width="full" marginTop="75" flexGrow={1} overflow="scroll">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default AppLayout
