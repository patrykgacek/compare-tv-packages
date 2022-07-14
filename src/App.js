import { Box, ChakraProvider, FormControl, FormLabel, Heading, HStack, SimpleGrid, Switch, theme, } from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { allPrograms } from "./data/allPrograms"
import { useState } from "react"
import DataCreator from "./pages/DataCreator"
import PackageSelection from "./components/PackageSelection"
import ProgramsList from "./components/ProgramsList"
import { packages } from "./functions"

const App = () => {
  const [diffrenceFP, setDiffrenceFP] = useState([])
  const [diffrenceSP, setDiffrenceSP] = useState([])

  const [comparisonFP, setComparisonFP] = useState([])
  const [comparisonSP, setComparisonSP] = useState([])

  const [showDataCreator, setShowDataCreator] = useState(false)

  const [programsFirst, setProgramsFirst] = useState([])
  const [programsSecond, setProgramsSecond] = useState([])

  const [nameFirst, setNameFirst] = useState('')
  const [nameSecond, setNameSecond] = useState('')

  const updateSelectFirst = programs => {
    setProgramsFirst(programs)
    recalculate(programs, programsSecond)
  }

  const updateSelectSecond = programs => {
    setProgramsSecond(programs)
    recalculate(programsFirst, programs)
  }

  const recalculate = (programsF, programsS) => {
    let programsFDif = programsF.filter(el => !programsS.includes(el))
    let programsSDif = programsS.filter(el => !programsF.includes(el))

    setDiffrenceFP(programsFDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name,
        "color": ''
      }
    )).sort((a, b) => a.name.localeCompare(b.name)))

    setDiffrenceSP(programsSDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name,
        "color": ''
      }
    )).sort((a, b) => a.name.localeCompare(b.name)))


    const programsIntersection = allPrograms
      .filter(program => programsF.includes(program.id) && programsS.includes(program.id))
      .map(program => ({
        "id": program.id,
        "name": program.name,
        "color": ''
      }))

    setComparisonFP(programsIntersection
      .concat(programsFDif.map(programId => (
        {
          "id": programId,
          "name": allPrograms.find(el => el.id === programId).name,
          "color": 'green.400'
        }
      )))
      .concat(programsSDif.map(programId => (
        {
          "id": programId,
          "name": allPrograms.find(el => el.id === programId).name,
          "color": 'red.400'
        }
      )))
      .sort((a, b) => a.name.localeCompare(b.name))
    )

    setComparisonSP(programsIntersection
      .concat(programsFDif.map(programId => (
        {
          "id": programId,
          "name": allPrograms.find(el => el.id === programId).name,
          "color": 'red.400'
        }
      )))
      .concat(programsSDif.map(programId => (
        {
          "id": programId,
          "name": allPrograms.find(el => el.id === programId).name,
          "color": 'green.400'
        }
      )))
      .sort((a, b) => a.name.localeCompare(b.name))
    )
  }


  return (
    <ChakraProvider theme={theme}>
      <HStack>
        <ColorModeSwitcher m='1'/>
        <Heading as='h1' size='md'>Porównywarka pakietów telewizyjnych</Heading>
      </HStack>
      <Box m='4'>
          <SimpleGrid minChildWidth='280px' spacing='4'>
            <PackageSelection packages={packages} updateSelect={updateSelectFirst} selectedName={setNameFirst}>Pierwszy pakiet</PackageSelection>
            <PackageSelection packages={packages} updateSelect={updateSelectSecond}  selectedName={setNameSecond}>Drugi pakiet</PackageSelection>
          </SimpleGrid>
          {!!nameSecond && !!nameFirst && (
            <>
            <SimpleGrid minChildWidth='280px' spacing='4' my='4'>
              <SimpleGrid minChildWidth='120px' spacing='4'>
                <ProgramsList programs={diffrenceFP}>Dodatkowo w pierwszym pakiecie</ProgramsList>
                <ProgramsList programs={diffrenceSP}>Dodatkowo w drugim pakiecie</ProgramsList>
              </SimpleGrid>
              <SimpleGrid minChildWidth='120px' spacing='4'>
                <ProgramsList programs={comparisonFP}>Programy w pierwszym pakiecie</ProgramsList>
                <ProgramsList programs={comparisonSP}>Programy w drugim pakiecie</ProgramsList>
              </SimpleGrid>
            </SimpleGrid>
            </>
          )}
          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='toggle-creator' mb='0'>
              Pokaż kreator programów (opcja programistyczna)
            </FormLabel>
            <Switch id='toggle-creator' onChange={e => setShowDataCreator(e.target.checked)} isChecked={showDataCreator} />
          </FormControl>
          {showDataCreator && <DataCreator />}
      </Box>
    </ChakraProvider>
  )
}

export default App
