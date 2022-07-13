import { Box, Checkbox, CheckboxGroup, Divider, Heading, Radio, RadioGroup, VStack } from "@chakra-ui/react"
import { useState } from "react"

const PackageSelection = ({packages, updateSelect, selectedName, children}) => {

  const [selectedPackageIdx, setSelectedPackageIdx] = useState('')
  const [extraPackages, setExtraPackages] = useState([])
  const [selectedExtraPackagesIdx, setSelectedExtraPackagesIdx] = useState([])

  const handleSetPackage = packageIdx => {
    setSelectedPackageIdx(packageIdx)
    setExtraPackages(packages[packageIdx].extraPackages)
    selectedName(packages[packageIdx].name)
    let programs = []
    selectedExtraPackagesIdx.forEach(idx => programs = programs.concat(packages[packageIdx].extraPackages[idx].programs))
    programs = programs.concat(packages[packageIdx].programs)
    programs = [...new Set(programs)]
    updateSelect(programs)
  }

  const handleSetExtraPackage = list => {
    setSelectedExtraPackagesIdx(list)
    let programs = []
    list.forEach(idx => programs = programs.concat(packages[selectedPackageIdx].extraPackages[idx].programs))
    programs = programs.concat(packages[selectedPackageIdx].programs)
    programs = [...new Set(programs)]
    updateSelect(programs)
  }

  return (
    <Box borderWidth='1px'
    borderRadius='md'
    boxShadow='sm' 
    p='2'>
      <Heading as='h1' size='sm' mb='4'>{children}</Heading>
      <RadioGroup
      onChange={handleSetPackage}
      value={selectedPackageIdx}>
        <VStack align='left'>
          {packages.map((pck, idx) => (
            <Radio value={idx.toString()} key={idx}>{pck.name}</Radio>
          ))}
        </VStack>
      </RadioGroup>
      {!!extraPackages.length && (
        <>
          <Divider my='3' />
          <CheckboxGroup onChange={handleSetExtraPackage}>
            <VStack align='left'>
            {extraPackages.map((pck, idx) => (
              <Checkbox value={idx.toString()} key={idx}>{pck.name}</Checkbox>
            ))}
            </VStack>
          </CheckboxGroup>
        </>
      )}
    </Box>
  )
}

export default PackageSelection