import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  buildingState as buildingAtom,
  workingState as workingAtom
} from '../store/atoms'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { map } from 'lodash'

const defaultPayload = {
  width: 10000,
  height: 10000,
  roofAngle: 30
}

let initialSetup = true

const useBuildings = () => {
  const [buildings, setBuildings] = useState()
  const [buildingState, setBuildingState] = useRecoilState(buildingAtom)
  const setWorkingState = useSetRecoilState(workingAtom)

  const fetchData = useCallback(() => {
    return axios.post('https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build', buildingState ?? [])
      .then(response => {
        setBuildings(response.data)
        return response.data
      })
  }, [buildingState])

  useEffect(() => {
    !initialSetup && buildingState && fetchData()
  }, [buildingState, fetchData])

  useEffect(() => {
    fetchData().then(buildings => {
      const initialBuildingState = map(buildings.items, () => ({ ...defaultPayload }))

      setBuildingState(initialBuildingState)
      setWorkingState(initialBuildingState)
      initialSetup = false
    })
  }, [])

  return buildings
}

export default useBuildings
