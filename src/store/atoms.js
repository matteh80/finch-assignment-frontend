import { atom } from 'recoil'

export const buildingState = atom({
  key: 'building',
  default: []
})

export const workingState = atom({
  key: 'working',
  default: []
})
