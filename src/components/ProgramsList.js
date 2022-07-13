import { Box, Divider, Text } from "@chakra-ui/react"

const ProgramsList = ({programs, children}) => {
  return (
    <Box borderWidth='1px'
      borderRadius='md'
      boxShadow='sm' 
      p='2'
      b>
      <Text>{children}</Text>
      <Divider my='3' />
      {programs.map(prog => (
        <Text key={prog.id} color={prog.color}>{prog.name}</Text>
      ))}
    </Box>
  )
}

export default ProgramsList