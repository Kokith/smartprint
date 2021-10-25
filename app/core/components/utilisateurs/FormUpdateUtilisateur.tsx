import React, { FC, Fragment } from "react"
import { UpdateUserInput } from "app/user/validation"
import { UserRole } from "db"
import { FormikErrors, FormikTouched } from "formik"
import { FormControl, FormLabel, Input, FormErrorMessage, Select } from "@chakra-ui/react"

const FormUpdateUser: FC<{
  values: UpdateUserInput
  errors: FormikErrors<UpdateUserInput>
  touched: FormikTouched<UpdateUserInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, errors, touched, onChange }) => {
  const isInvalid = (key: keyof UpdateUserInput): boolean =>
    errors[key] && touched[key] ? true : false

  return (
    <Fragment>
      <FormControl isInvalid={isInvalid("nom")}>
        <FormLabel>Nom</FormLabel>
        <Input placeholder="Nom" value={values.nom} onChange={onChange("nom")} />
        {isInvalid("nom") && <FormErrorMessage>{errors.nom}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("email")}>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" value={values.email} onChange={onChange("email")} />
        {isInvalid("email") && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("contact")}>
        <FormLabel>Contact</FormLabel>
        <Input placeholder="Contact" value={values.contact} onChange={onChange("contact")} />
        {isInvalid("contact") && <FormErrorMessage>{errors.contact}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("role")}>
        <FormLabel>Role</FormLabel>
        <Select placeholder="Role utilisateur" value={values.role} onChange={onChange("role")}>
          <option value={UserRole.USER}>{UserRole.USER}</option>
          <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
        </Select>
        {isInvalid("role") && <FormErrorMessage>{errors.role}</FormErrorMessage>}
      </FormControl>
    </Fragment>
  )
}

export default FormUpdateUser
