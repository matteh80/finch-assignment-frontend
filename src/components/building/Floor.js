import * as THREE from 'three'
import { Earcut } from 'three/src/extras/Earcut'
import { map } from 'lodash'
import { forwardRef, useCallback, useState } from 'react'
import { useUpdate } from 'react-three-fiber'
import { floorData as floorAtom } from '../../store/atoms'
import { useRecoilState } from 'recoil'

const Floor = forwardRef(({ floorPolygon, userData }, ref) => {
  const [mouseOver, setMouseOver] = useState(false)
  const [floorData, setFloorData] = useRecoilState(floorAtom)

  const handleMouseOver = useCallback((e, value) => {
    e.stopPropagation()
    setMouseOver(value)

    const data = {
      uuid: e.eventObject.uuid,
      ...e.eventObject.userData
    }

    if (!value && floorData?.uuid === e.eventObject.uuid) {
      setFloorData(null)
    }

    if (value) {
      setFloorData(data)
    }
  }, [floorData, setFloorData])

  const vertices = floorPolygon.points.map(point => [point.x, point.y, point.z])
  const triangleIndices = Earcut.triangulate(vertices.flat(Infinity), undefined, 3)
  const mapped = map(triangleIndices, index => vertices[index])
  const position = new THREE.BufferAttribute(new Float32Array(mapped.flat()), 3)

  const bufferGeometryRef = useUpdate(geometry => {
    geometry.setAttribute('position', position)
    geometry.attributes.position.needsUpdate = true
  }, [position])

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => handleMouseOver(e, true)}
      onPointerOut={(e) => handleMouseOver(e, false)}
      userData={userData}
    >
      <bufferGeometry
        ref={bufferGeometryRef}
        attach='geometry'
        onUpdate={self => {
          self.computeVertexNormals()
          self.computeFaceNormals()
        }}
      >
        <bufferAttribute
          attachObject={['attributes', 'position']}
          {...position}
        />
      </bufferGeometry>

      <meshStandardMaterial
        attach='material'
        transparent
        opacity={0.75}
        color={mouseOver ? 'blue' : 'gray'}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
})

export default Floor
