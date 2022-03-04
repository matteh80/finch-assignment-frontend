import { useState } from 'react'
import * as THREE from 'three'

async function loadFont () {
  return new Promise((resolve) => {
    new THREE.FontLoader().load('/OpenSans_Regular.json', resolve)
  }).then((loadedFont) => loadedFont)
}

const useFont = () => {
  const [font, setFont] = useState()

  !font && loadFont().then(setFont)

  return font
}

export default useFont
