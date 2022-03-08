import { useRecoilState } from 'recoil'
import { buildingState as buildingAtom, workingState as workingAtom } from '../../store/atoms'
import { difference, isEmpty, map } from 'lodash'
import BuildingValues from './BuildingValues'

const Sidebar = ({ buildings }) => {
  const [buildingState, setBuildingState] = useRecoilState(buildingAtom)
  const [workingState, setWorkingState] = useRecoilState(workingAtom)

  const handleUpdateClick = () => {
    setBuildingState(workingState)
  }

  const handleResetClick = () => {
    setWorkingState(buildingState)
  }

  return (
    <div className='w-96 shadow-lg p-4 bg-gray-200 overflow-scroll'>
      <div className='flex flex-col space-y-4'>
        {map(workingState, (building, index) => (
          <BuildingValues key={index} building={buildings[index]} index={index} />
        ))}
        <button className='px-6 py-2 rounded bg-slate-400 hover:bg-slate-500 text-slate-100' onClick={handleUpdateClick}>Uppdatera</button>
        {!isEmpty(difference(workingState, buildingState)) && (
          <button className='px-6 py-2 rounded bg-slate-400 hover:bg-slate-500 text-slate-100' onClick={handleResetClick}>Återställ</button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
