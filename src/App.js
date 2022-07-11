import { Box, ChakraProvider, Checkbox, CheckboxGroup, Divider, FormControl, FormLabel, Radio, RadioGroup, SimpleGrid, Switch, Text, theme, VStack } from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { allPrograms } from "./data/allPrograms"
import { artcom } from "./data/artcom"
import { netia } from "./data/netia"
import { useEffect, useState } from "react"
import DataCreator from "./pages/DataCreator"

const getPackages = (provider) => {
  const providerName = provider.name
  const packages = JSON.parse(JSON.stringify(provider.packages))
  packages.forEach(el => {
    el.name = `${providerName} ${el.name}`
    el.extraPackages = provider.extraPackages
  })
  return packages
}

const packages = getPackages(netia).concat(getPackages(artcom))

const App = () => {

  const [firstProvider, setFirstProvider] = useState('0')
  const [secondProvider, setSecondProvider] = useState('0')
  const [firstExtraPackages, setFirstExtraPackages] = useState([])
  const [secondExtraPackages, setSecondExtraPackages] = useState([])

  const [chosenFEP, setChosenFEP] = useState([])
  const [chosenSEP, setChosenSEP] = useState([])

  const [diffrenceFP, setDiffrenceFP] = useState([])
  const [diffrenceSP, setDiffrenceSP] = useState([])

  const [showDataCreator, setShowDataCreator] = useState(false)

  useEffect(() => {
    setFirstExtraPackages(packages[firstProvider].extraPackages)
  }, [firstProvider])

  useEffect(() => {
    setSecondExtraPackages(packages[secondProvider].extraPackages)
  }, [secondProvider])


  useEffect(() => {
    let programsF = []
    let programsS = [] 

    chosenFEP.forEach(idx => programsF = programsF.concat(packages[firstProvider].extraPackages[idx].programs))
    programsF = programsF.concat(packages[firstProvider].programs)
    programsF = [...new Set(programsF)]

    chosenSEP.forEach(idx => programsS = programsS.concat(packages[secondProvider].extraPackages[idx].programs))
    programsS = programsS.concat(packages[secondProvider].programs)
    programsS = [...new Set(programsS)]

    let programsFDif = programsF.filter(el => !programsS.includes(el))
    let programsSDif = programsS.filter(el => !programsF.includes(el))

    setDiffrenceFP(programsFDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name
      }
    )))

    setDiffrenceSP(programsSDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name
      }
    )))

  }, [firstProvider, secondProvider, chosenFEP, chosenSEP])



  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher m='1'/>
      <Box m='4'>
      <SimpleGrid minChildWidth='320px' spacing='4'>
            <Box borderWidth='1px'
            borderRadius='md'
            boxShadow='sm' 
            p='2'>
              <RadioGroup
              onChange={setFirstProvider}
              value={firstProvider}>
                <VStack align='left'>
                  {packages.map((pck, idx) => (
                    <Radio value={idx.toString()} key={idx}>{pck.name}</Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <Divider my='3' />
              <VStack align='left'>
                {firstExtraPackages.length ? (
                  <CheckboxGroup onChange={setChosenFEP}>
                    {firstExtraPackages.map((pck, idx) => (
                      <Checkbox value={idx.toString()} key={idx}>{pck.name}</Checkbox>
                    ))}
                  </CheckboxGroup>
                ) : (<Text>Brak dodatkowych pakietów</Text>)}
              </VStack>
            </Box>
            <Box borderWidth='1px'
            borderRadius='md'
            boxShadow='sm' 
            p='2'>
              <RadioGroup
              onChange={setSecondProvider}
              value={secondProvider}>
                <VStack align='left'>
                  {packages.map((pck, idx) => (
                    <Radio value={idx.toString()} key={idx}>{pck.name}</Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <Divider my='3' />
              <VStack align='left'>
                {secondExtraPackages.length ? (
                  <CheckboxGroup onChange={setChosenSEP}>
                    {secondExtraPackages.map((pck, idx) => (
                      <Checkbox value={idx.toString()} key={idx}>{pck.name}</Checkbox>
                    ))}
                  </CheckboxGroup>
                ) : (<Text>Brak dodatkowych pakietów</Text>)}
              </VStack>
            </Box>
          </SimpleGrid>
          <SimpleGrid minChildWidth='320px' spacing='4' my='4'>
            <Box borderWidth='1px'
              borderRadius='md'
              boxShadow='sm' 
              p='2'>
                {diffrenceFP.length ? (
                  <>
                    <Text>Dodatkowo w {packages[firstProvider].name}</Text>
                    <Divider my='3' />
                    {diffrenceFP.map(pck => (
                      <Text key={pck.id}>{pck.name}</Text>
                    ))}
                  </>
                ) : (<Text>W tym pakiecie nie ma nic dodatkowego</Text>)}
            </Box>
            <Box borderWidth='1px'
              borderRadius='md'
              boxShadow='sm' 
              p='2'>
                {diffrenceSP.length ? (
                  <>
                    <Text>Dodatkowo w {packages[secondProvider].name}</Text>
                    <Divider my='3' />
                    {diffrenceSP.map(pck => (
                      <Text key={pck.id}>{pck.name}</Text>
                    ))}
                  </>
                ) : (<Text>W tym pakiecie nie ma nic dodatkowego</Text>)}
            </Box>
          </SimpleGrid>
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
