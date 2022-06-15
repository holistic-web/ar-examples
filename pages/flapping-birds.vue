<template>
  <client-only>
    <!-- Add the menu component to the scene so it has an effect -->
    <a-scene
      v-pre
      flapping-birds
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement:true"
      vr-mode-ui="enabled: false"
      xrweb
    >
      <!-- We can define assets here to be loaded when A-Frame initializes -->
      <a-assets v-pre>
        <a-asset-item id="birdModel" src="/bird.gltf" />
      </a-assets>

      <!-- The raycaster will emit mouse events on scene objects specified with the cantap class -->
      <a-camera
        id="camera"
        v-pre
        position="0 8 0"
        raycaster="objects: .cantap"
        cursor="
    fuse: false;
    rayOrigin: mouse;"
      />
      <a-entity
        v-pre
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
      <a-light v-pre type="ambient" intensity="0.5" />
    </a-scene>
  </client-only>
</template>

<script>
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
  head() {
    return {
      // Scripts required by the 8th Wall Framework
      script: [
        // slightly modified version of A-Frame, which fixes some polish concerns
        { src: '//cdn.8thwall.com/web/aframe/8frame-1.1.0.min.js' },
        {
          src: '//cdn.8thwall.com/web/aframe/aframe-physics-system-4.0.1.min.js',
        },
        // XR Extras - provides utilities like load screen, almost there, and error handling.
        // See github.com/8thwall/web/tree/master/xrextras
        { src: '//cdn.8thwall.com/web/xrextras/xrextras.js' },
        // Add extras from aframe for animations
        { src: '//cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js' },
        // 8thWall Web - Replace the app key here with your own app key (only works on authorised domains)
        {
          src: '//apps.8thwall.com/xrweb?appKey=zl9iYLs0UnM13G8kugSsXRboJtbC2OJOZWmGeV4dvmWAKMaq1kwdRIa4PTdy4WvWyR05BG',
        },
      ],
    }
  },
  mounted() {
    this.on8thWallReady()
  },
  methods: {
    on8thWallReady() {
      AFRAME.registerComponent('flapping-birds', flappingBirdsComponent)
    },
  },
}
</script>

<style lang="scss">
a-scene {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
