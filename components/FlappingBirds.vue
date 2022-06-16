<template>
  <client-only v-pre>
    <!-- Add the menu component to the scene so it has an effect -->
    <a-scene
      flapping-birds
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement:true"
      vr-mode-ui="enabled: false"
      xrweb
    >
      <!-- We can define assets here to be loaded when A-Frame initializes -->
      <a-assets>
        <a-asset-item id="birdModel" src="/bird.gltf" />
      </a-assets>

      <!-- The raycaster will emit mouse events on scene objects specified with the cantap class -->
      <a-camera
        id="camera"
        position="0 8 0"
        raycaster="objects: .cantap"
        cursor="
    fuse: false;
    rayOrigin: mouse;"
      />
      <a-entity
        light="
    type: directional;
    intensity: 0.8;
    castShadow: true;
    shadowMapHeight:2048;
    shadowMapWidth:2048;
    shadowCameraTop: 40;
    shadowCameraBottom: -40;
    shadowCameraRight: 40;
    shadowCameraLeft: -40;
    target: #camera"
        xrextras-attach="target: camera; offset: 8 15 4"
        position="1 4.3 2.5"
        shadow
      />
      <a-light type="ambient" intensity="0.5" />
    </a-scene>
  </client-only>
</template>

<script>
import registerAFrameComponent from '../lib/registerAFrameComponent'

const flappingBirdsComponent = {
  init() {
    for (let i = 0; i < 5; i++) {
      const entity = document.createElement('a-entity')
      const randomYRotation = Math.random() * 360
      function getRandomInt(max) {
        return Math.floor(Math.random() * max)
      }
      const randomX =
        Math.ceil(Math.random() * 20) * (Math.round(Math.random()) ? 1 : -1)
      entity.setAttribute('id', `bird${i}`)
      entity.setAttribute('gltf-model', '#birdModel')
      entity.setAttribute('animation-mixer', 'clip: flap-wings;')
      entity.setAttribute(
        'position',
        `${randomX} ${getRandomInt(20)} ${getRandomInt(30) * -1}`
      )
      entity.setAttribute('rotation', `0 ${randomYRotation} 0`)
      entity.setAttribute('scale', `0.005 0.005 0.005`)
      entity.setAttribute('shadow', 'receive: false')
      this.el.sceneEl.appendChild(entity)
    }
  },
}
export default {
  name: 'FlappingBirds',

  mounted() {
    registerAFrameComponent('flapping-birds', flappingBirdsComponent)
  },
}
</script>
