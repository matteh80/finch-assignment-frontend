import * as THREE from 'three'
import { useUpdate } from 'react-three-fiber'

const PolyLine = ({ polygon }) => {
  const vertices = polygon.points.map(point => [point.x, point.y, point.z])
  const position = new THREE.BufferAttribute(new Float32Array(vertices.flat()), 3)

  const ref = useUpdate(geometry => {
    geometry.setAttribute('position', position)
    geometry.attributes.position.needsUpdate = true
  }, [position])

  return (
    <line>
      <bufferGeometry
        ref={ref}
        attach='geometry'
      >
        <bufferAttribute
          attachObject={['attributes', 'position']}
          {...position}
        />
      </bufferGeometry>
      <lineBasicMaterial attach='material' color='lightgray' />
    </line>
  )
}

export default PolyLine
