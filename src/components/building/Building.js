import _, { find, map, meanBy } from 'lodash'
import Floor from './Floor'
import PolyLine from './PolyLine'
import { useMemo, useRef } from 'react'
import useFont from '../../hooks/useFont'
import { useUpdate } from 'react-three-fiber'

const Building = ({ building, buildingState }) => {
  const buildingRef = useRef()
  const groupRef = useRef()

  const font = useFont()

  const buildingCenter = useMemo(() => {
    if (groupRef.current) {
      // const bbox = new THREE.Box3().setFromObject(groupRef.current)
      // const bboxCenter = bbox.getCenter(new THREE.Vector3())

      const floors = find(building.items, item => item.tags.type === 'floors')
      const points = _(floors.items).flatMap(item => item.items).flatMap('points').value()
      return [meanBy(points, 'x'), meanBy(points, 'y'), buildingState.height ?? meanBy(points, 'z')]
    }

    return null
  }, [building, groupRef.current])

  const bufferGeometryRef = useUpdate(geometry => {
    geometry.position.z = buildingState.height + 1000
  }, [building])

  const BuildingName = () => {
    return font && buildingCenter
      ? (
        <mesh ref={bufferGeometryRef} position={buildingCenter} rotation={[Math.PI / 2, 0, 0]}>
          <textGeometry attach='geometry' args={[building.tags.name, { font, size: 3000, height: 500 }]} />
          <meshStandardMaterial attach='material' color='blue' />
        </mesh>
        )
      : null
  }

  return (
    <group ref={groupRef}>
      <BuildingName />
      {map(building.items, (buildingPart, index) => {
        const floor = buildingPart.tags.type === 'floors'
        return (
          <group key={`buildingPart_${index}`}>
            {floor
              ? map(buildingPart.items, (floorGroup, groupIndex) => map(floorGroup.items,
                  (floorPolygon, floorIndex) => <Floor ref={buildingRef} key={`floor_${groupIndex}_${floorIndex}`} floorPolygon={floorPolygon} userData={{ ...floorGroup.tags }} />))
              : map(buildingPart.items, (polygon, polyIndex) => <PolyLine key={`polyline_${polyIndex}`} polygon={polygon} />)}
          </group>
        )
      })}
    </group>
  )
}

export default Building
