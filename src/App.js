import React, { useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import CameraControls from './CameraControls'
import Sidebar from './components/sidebar/Sidebar'
import useBuildings from './hooks/useBuildings'
import { map } from 'lodash'
import { generateBuildingGeometriesFromData } from './utils'

THREE.Object3D.DefaultUp.set(0, 0, 1)

const App = () => {
  const buildings = useBuildings()

  const buildingGeometries = useMemo(() => {
    return buildings ? generateBuildingGeometriesFromData(buildings) : []
  }, [buildings])

  return (
    <div className='flex'>
      {buildings
        ? (
          <>
            <Sidebar buildings={buildings?.items} />
            <Canvas
              style={{ height: '100vh' }}
              camera={{
                up: [0, 0, 1],
                position: [20000, 20000, 20000],
                near: 1000,
                far: 400000,
                fov: 70
              }}
              onCreated={({ gl }) => {
                gl.setClearColor('#eeeeee')
              }}
            >
              <ambientLight intensity={1.0} />
              <directionalLight intensity={0.2} position={[1, 1, 1]} />
              {map(buildingGeometries, (buildingGeometry, index) => {
                return (
                  <primitive
                    key={index}
                    object={buildingGeometry}
                  />
                )
              })}
              <CameraControls />
            </Canvas>
          </>
          )
        : 'Loading...'}
    </div>
  )
}

export default App
