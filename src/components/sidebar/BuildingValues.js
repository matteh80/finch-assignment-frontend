import Range from './Range'
import { useRecoilState } from 'recoil'
import { workingState as workingAtom } from '../../store/atoms'
import produce from 'immer'
import Input from './Input'
import { useMemo } from 'react'

const BuildingValues = ({ building, index }) => {
  const [workingState, setWorkingState] = useRecoilState(workingAtom)

  const values = useMemo(() => workingState[index], [workingState])

  const handleChange = (e) => {
    const newState = produce(workingState, draft => {
      draft[index][e.target.name] = +e.target.value
    })

    setWorkingState(newState)
  }

  return (
    <div className='flex flex-col space-y-2 border-slate-600'>
      <div>
        <div className='text-lg uppercase font-bold'>{`Building ${building?.tags.name}`}</div>
        <div className='text-sm'>{`Area: ${building?.tags.area}`}</div>
      </div>
      <Input
        id={`${building?.tags.name}_height`}
        name='height'
        label='Height'
        value={values?.height}
        onChange={handleChange}
      />
      <Input
        id={`${building?.tags.name}_width`}
        name='width'
        label='Width'
        value={values?.width}
        onChange={handleChange}
      />
      <Range
        id={`${building?.tags.name}_roofAngle`}
        name='roofAngle'
        label='Roof angle'
        min={0}
        max={90}
        value={values?.roofAngle}
        onChange={handleChange}
      />
    </div>
  )
}

export default BuildingValues
