import { Box, Flex, Heading, Text, useCheckbox, useRadio, useRadioGroup, Wrap, WrapItem, chakra, useCheckboxGroup } from "@chakra-ui/react"

const TvProviderCard = ({provider, changePackage, changeExtraPackage, ...rest}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: '-1',
    onChange: changePackage,
  })

  const group = getRootProps()
  const value = '-1'
  const radioClean = getRadioProps({value})


  const { value2, getCheckboxProps } = useCheckboxGroup({
    onChange: changeExtraPackage,
  })


  return (
    <Flex borderWidth='1px'
    borderRadius='md'
    boxShadow='sm' padding='16px' {...rest} >
      <Box>
        <Heading as='h1' size='md' mb='2'>{provider.name}</Heading>
        <Heading as='h2' size='sm'>Pakiety</Heading>
        <Wrap {...group} py='2'>
          {!!provider.packages && provider.packages.map((name, value) => {
            value = value.toString()
            name = name.name
            const radio = getRadioProps({ value })
            return (
              <WrapItem key={name}>
                <RadioCard  {...radio}>
                  {name}
                </RadioCard>
              </WrapItem>
            )
          })}
          <RadioCard {...radioClean}>
            brak
          </RadioCard>
        </Wrap>
        <Heading as='h2' size='sm'>Dodatki</Heading>
        <Wrap py='2'>
          {!!provider.extraPackages ? provider.extraPackages.map((name, value) => {
            value = value.toString()
            name = name.name
            const checkbox = getCheckboxProps({ value })
            return (
              <WrapItem key={name}>
                <CheckboxCard key={value} {...checkbox}>{name}</CheckboxCard>
              </WrapItem>
            )
          }) : <Text>Brak dodatkowych pakietów</Text>}
        </Wrap>
      </Box>
    </Flex>
  )
}

const RadioCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='sm'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  )
}


const CheckboxCard = props => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props)

  return (
    <chakra.label
      borderWidth='1px'
      borderRadius='md'
      boxShadow='sm'
      rounded='lg'
      px={2}
      py={1}
      cursor='pointer'
      sx={state.isChecked && ({
        bg: 'teal.600',
        color: 'white',
        borderColor: 'teal.600',
      })}
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Text {...getLabelProps()} {...getCheckboxProps()}>{props.children}</Text>
    </chakra.label>
  )
}

export default TvProviderCard
