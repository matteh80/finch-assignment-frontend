import React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import CameraControls from './CameraControls'
import Sidebar from './components/sidebar/Sidebar'
import useBuildings from './hooks/useBuildings'
import { map } from 'lodash'
import Building from './components/building/Building'
import { useRecoilValue } from 'recoil'
import {
  buildingState as buildingAtom
} from './store/atoms'

THREE.Object3D.DefaultUp.set(0, 0, 1)

const App = () => {
  const buildings = useBuildings()
  const buildingState = useRecoilValue(buildingAtom)

  return (
    <div className='flex max-h-screen overflow-hidden'>
      {buildings
        ? (
          <>
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

              {map(buildings.items, (building, index) => {
                return (
                  <Building
                    key={index}
                    building={building}
                    buildingState={buildingState[index]}
                  />
                )
              })}
              <CameraControls />
            </Canvas>
            <Sidebar buildings={buildings?.items} />
          </>
          )
        : 'Loading...'}
    </div>
  )
}

export default App
