import React, { FC } from "react"
import { Box, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"

const DefaultSearch: FC<{ name: string; filter: string; onChange: (value: string) => void }> = ({
  name,
  filter,
  onChange,
}) => {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={MdSearch} />
        </InputLeftElement>
        <Input
          value={filter}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder={`Rechercher ${name.toLowerCase()}`}
          variant="filled"
        />
      </InputGroup>
    </Box>
  )
}

export default DefaultSearch
