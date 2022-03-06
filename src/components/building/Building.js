import { map } from 'lodash'
import Floor from './Floor'
import PolyLine from './PolyLine'

const Building = ({ building }) => {
  return (
    <group>
      {map(building.items, (buildingPart, index) => {
        const floor = buildingPart.tags.type === 'floors'
        return (
          <group key={`buildingPart_${index}`}>
            {floor
              ? map(buildingPart.items, (floorGroup, groupIndex) => map(floorGroup.items,
                  (floorPolygon, floorIndex) => <Floor key={`floor_${groupIndex}_${floorIndex}`} floorPolygon={floorPolygon} />))
              : map(buildingPart.items, (polygon, polyIndex) => <PolyLine key={`polyline_${polyIndex}`} polygon={polygon} />)}
          </group>
        )
      })}
    </group>
  )
}

export default Building
