import { artcom } from "./data/artcom"
import { netia } from "./data/netia"
import { canalplusTmp } from "./data/canalplusTmp"

export const getPackages = (provider) => {
  const providerName = provider.name
  const packages = JSON.parse(JSON.stringify(provider.packages))
  packages.forEach(el => {
    el.name = `${providerName} ${el.name}`
    el.extraPackages = provider.extraPackages
  })
  return packages
}

export const preparePrograms = () => {
  const netiaAll = getPackages(netia)
  const artcomAll = getPackages(artcom)
  const canalplusTmpAll = getPackages(canalplusTmp)
  return netiaAll.concat(artcomAll).concat(canalplusTmpAll)
}

export const packages = preparePrograms()
