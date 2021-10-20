import React, { FC, Suspense } from "react"
import { Societe } from "db"
import { BlitzPage, useQuery, useMutation, invalidateQuery } from "@blitzjs/core"
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input } from "@chakra-ui/react"
import { parametresNavbar } from "app/core/components/layout/Navbar"
import { useFormik } from "formik"
import { UpdateSocieteInput } from "app/societe/validation"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import AppLayout from "app/core/components/layout/AppLayout"
import Title from "app/core/components/common/Title"
import societe from "app/societe/queries/societe"
import updateSociete from "app/societe/mutations/updateSociete"

const UpdateSociete: FC<{
  initialData: Societe
}> = ({ initialData }) => {
  const [mutate] = useMutation(updateSociete)
  const { handleCustomError, toast } = useHandleCustomError()

  const initialValues: UpdateSocieteInput = {
    gerant: initialData.gerant,
    adresse: initialData.adresse,
    banque: initialData.banque,
    mobile: initialData.mobile,
    rcs: initialData.rcs,
    stat: initialData.stat,
    nif: initialData.nif,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await mutate(values)
        toast({
          title: "Les informations de la societe ont ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        handleCustomError(err)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl mt={4}>
        <FormLabel>Nif</FormLabel>
        <Input
          required
          placeholder="Nif"
          value={formik.values.nif}
          onChange={formik.handleChange("nif")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Adresse</FormLabel>
        <Input
          required
          placeholder="Adresse"
          value={formik.values.adresse}
          onChange={formik.handleChange("adresse")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Banque</FormLabel>
        <Input
          required
          placeholder="Banque"
          value={formik.values.banque}
          onChange={formik.handleChange("banque")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Tel</FormLabel>
        <Input
          required
          placeholder="Tel"
          value={formik.values.mobile}
          onChange={formik.handleChange("mobile")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Stat</FormLabel>
        <Input
          required
          placeholder="Stat"
          value={formik.values.stat}
          onChange={formik.handleChange("stat")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Rcs</FormLabel>
        <Input
          required
          placeholder="Rcs"
          value={formik.values.rcs}
          onChange={formik.handleChange("rcs")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Nom du gerant</FormLabel>
        <Input
          required
          placeholder="Nom  du gerant"
          value={formik.values.gerant}
          onChange={formik.handleChange("gerant")}
        />
      </FormControl>

      <Button colorScheme="blue" type="submit" disabled={false} mt={4}>
        Enregistrer
      </Button>
    </form>
  )
}

const SocietePageContent: FC = () => {
  const [data] = useQuery(societe, undefined)
  return (
    <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gap={5}>
      <GridItem colSpan={1}>
        <UpdateSociete initialData={data} />
      </GridItem>

      <GridItem colSpan={1}>{/* <UploadSignature url={data.societe.signature} /> */}</GridItem>
    </Grid>
  )
}

const SocietePage: BlitzPage = () => {
  return (
    <AppLayout navbar={parametresNavbar()}>
      <Box padding={5}>
        <Title>Les informations de la societe</Title>
        <Suspense fallback={<div>Chargement des informations de la societe...</div>}>
          <SocietePageContent />
        </Suspense>
      </Box>
    </AppLayout>
  )
}

export default SocietePage
