import { Box, ChakraProvider, SimpleGrid, Text, theme } from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import TvProviderCard from "./components/TvProviderCard"
import { allPrograms } from "./data/allPrograms"
import { artcom } from "./data/artcom"
import { netia } from "./data/netia"
import { useState } from "react"

const App = () => {

  const [packageNetia, setPackageNetia] = useState(-1)
  const [extraPackageNetia, setExtraPackageNetia] = useState([])
  const handlePackageChangeNetia = idx => setPackageNetia(idx)
  const handleExtraPackageChangeNetia = idx => setExtraPackageNetia(idx)

  const [packageArtcom, setPackageArtcom] = useState(-1)
  const [extraPackageArtcom, setExtraPackageArtcom] = useState([])
  const handlePackageChangeArtcom = idx => setPackageArtcom(idx)
  const handleExtraPackageChangeArtcom = idx => setExtraPackageArtcom(idx)

  let netiaProgramsDif
  let netiaExtraPrograms 
  let artcomProgramsDif
  let netiaPrograms
  let artcomPrograms
  let diffrence
  let diffrence2

  if (packageNetia !== -1 && packageArtcom !== -1)
  {
    netiaExtraPrograms = []
    extraPackageNetia.forEach(idx => netiaExtraPrograms = netiaExtraPrograms.concat(netia.extraPackages[idx].programs))
    netiaPrograms = netia.packages[packageNetia].programs.concat(netiaExtraPrograms)
    artcomPrograms = artcom.packages[packageArtcom].programs
    netiaProgramsDif = netiaPrograms.filter(el => !artcom.packages[packageArtcom].programs.includes(el))
    artcomProgramsDif = artcomPrograms.filter(el => !netia.packages[packageNetia].programs.includes(el))
    diffrence = artcomProgramsDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name
      }
    ))
    diffrence2 = netiaProgramsDif.map(programId => (
      {
        "id": programId,
        "name": allPrograms.find(el => el.id === programId).name
      }
    ))
  }
  

  

  

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher m='1'/>
      <Box>
        <SimpleGrid minChildWidth='320px' spacing='40px'>
          <TvProviderCard provider={netia}
            changePackage={(idx) => handlePackageChangeNetia(idx)}
            changeExtraPackage={(idx) => handleExtraPackageChangeNetia(idx)}/>
          <TvProviderCard provider={artcom}
            changePackage={(idx) => handlePackageChangeArtcom(idx)}
            changeExtraPackage={(idx) => handleExtraPackageChangeArtcom(idx)}/>
            
        </SimpleGrid>
        W Artcom dodatkowo: 
        {!!diffrence ? diffrence.map(el => <Text key={el.id}>{el.name}</Text>) : ("Nie ma różnicy")}
        <hr />
        W Netia dodatkowo: 
        {!!diffrence2 ? diffrence2.map(el => <Text key={el.id}>{el.name}</Text>) : ("Nie ma różnicy")}
        ----
        {extraPackageNetia} {extraPackageArtcom}
        
      </Box>
    </ChakraProvider>
  )
}

export default App
