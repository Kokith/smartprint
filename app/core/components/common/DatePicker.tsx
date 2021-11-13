import React, { FC, forwardRef, ForwardRefExoticComponent, RefAttributes } from "react"
import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import { FaRegCalendarAlt } from "react-icons/fa"
import { AiOutlineCloseCircle } from "react-icons/ai"
import ReactDatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { ICON_SIZE } from "../../styles/theme"

interface Props {
  label?: string
  value: Date
  onChange: (value: Date) => void
  onReset?: () => void
}

const DatePicker: FC<Props> = ({ label, value, onChange, onReset }) => {
  const CustomInput: ForwardRefExoticComponent<RefAttributes<unknown>> = forwardRef(
    //@ts-ignore
    ({ value, onClick }, ref) => {
      return (
        <Button
          onClick={onClick}
          //@ts-ignore
          ref={ref}
          rightIcon={<Icon as={FaRegCalendarAlt} />}
        >
          {value || "selectionner date"}
        </Button>
      )
    }
  )
  CustomInput.displayName = "CustomInput"

  return (
    <Flex flexDirection="column">
      {label && (
        <Text fontWeight="bold" fontSize="md">
          {label}
        </Text>
      )}
      <Flex>
        <ReactDatePicker
          selected={value}
          onChange={(value: Date) => {
            onChange(value)
          }}
          customInput={<CustomInput />}
        />
        {onReset && value && (
          <Button
            variant="ghost"
            marginLeft={3}
            onClick={() => {
              onReset()
            }}
          >
            <Icon as={AiOutlineCloseCircle} width={ICON_SIZE} height={ICON_SIZE} />
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default DatePicker
