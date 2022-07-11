import { AddIcon, ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Button, Input, Table, TableContainer, Text, Textarea, Thead, Tr, Th, Tbody, Td, IconButton, SimpleGrid, TableCaption, AlertIcon, Alert } from "@chakra-ui/react"
import { useState } from "react"
import { allPrograms } from "../data/allPrograms"


const DataCreator = () => {
  
  const [rawData, setRawData] = useState(JSON.stringify(allPrograms))
  const [data, setData] = useState(allPrograms)

  const [providerRawData, setProviderRawData] = useState([])
  const [providerData, setProviderData] = useState([])

  const [search, setSearch] = useState('')

  const handleAddProgram = e => {
    e.preventDefault()
    const newProgramName = e.target[0].value

    if (data.find(program => program.name.toLowerCase() === newProgramName.toLowerCase())) {
      alert(`Program ${newProgramName} został już dodany`)
      return
    }

    const newProgram = {
      'id': data.length + 1,
      'name': newProgramName
    }

    const newData = [...data, newProgram]
    setData(newData)
    setRawData(JSON.stringify(newData))
    setSearch('')
  }

  const handleChangeProgram = e => {
    e.preventDefault()
    try {
      setData(JSON.parse(e.target[0].value))
    } catch (error) {
      alert(error)
    }
  }

  const handleAddProviderProgram = newProgram => {
    if (providerData.find(program => program.id === newProgram.id)) {
      alert(`Program ${newProgram.name} został już dodany`)
      return
    }

    const newData = [...providerData, newProgram]
    newData.sort((a, b) => a.id - b.id)
    setProviderData(newData)
    setProviderRawData(JSON.stringify(newData.map(el => el.id)))
  }

  const handleDeleteProviderProgram = id => {
    const newData = providerData.filter(program => program.id !== id)
    setProviderData(newData)
    setProviderRawData(JSON.stringify(newData.map(el => el.id)))
  }

  const handleChangeProviderProgram = e => {
    e.preventDefault()
    try {
      let newData = JSON.parse(e.target[0].value)
      newData = newData.map(programId => ({
        'id': programId,
        'name': data.find(program => program.id === programId).name
      }))
  
      setProviderData(newData)
      setProviderRawData(JSON.stringify(newData.map(el => el.id)))
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <Box>
      <Alert status='info' my='4'>
        <AlertIcon />
        Nie można tu edytować programów TV
      </Alert>
      <form onSubmit={handleAddProgram}>
        <Input placeholder='Wyszukaj' onChange={e => setSearch(e.target.value)} value={search} my='4' />
      </form>
      <SimpleGrid minChildWidth='320px' spacing='4'>
        <TableContainer>
          <Table size='sm'>
            <TableCaption>Wszystkie programy</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Program</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
              .filter(program => program.name.toLowerCase().includes(search.toLowerCase()))
              // .sort((a, b) => a.name.localeCompare(b.name))
              .map(program => (
                <Tr key={program.id}>
                  <Td>{program.id}</Td>
                  <Td>{program.name}</Td>
                  <Td><IconButton icon={<ArrowForwardIcon />} size='sm' colorScheme='blue' onClick={() => handleAddProviderProgram(program)} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table size='sm'>
            <TableCaption>Programy dostawcy</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Program</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {providerData
              .filter(program => program.name.toLowerCase().includes(search.toLowerCase()))
              // .sort((a, b) => a.name.localeCompare(b.name))
              .map(program => (
                <Tr key={program.id}>
                  <Td>{program.id}</Td>
                  <Td>{program.name}</Td>
                  <Td><IconButton icon={<ArrowBackIcon />} size='sm' colorScheme='red' onClick={() => handleDeleteProviderProgram(program.id)} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
      <SimpleGrid minChildWidth='320px' spacing='4'>
        <form onSubmit={handleChangeProgram}>
          <Textarea placeholder='Wyszukaj' onChange={e => setRawData(e.target.value)} value={rawData} my='4' />
          <Button colorScheme='green' type='submit'>Zatwierdź zmiany</Button>
        </form>
        <form onSubmit={handleChangeProviderProgram}>
          <Textarea value={providerRawData} onChange={e => setProviderRawData(e.target.value)} my='4' />
          <Button colorScheme='green' type='submit'>Zatwierdź zmiany</Button>
        </form>
      </SimpleGrid>
    </Box>
  )
}

export default DataCreator