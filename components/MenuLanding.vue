<template>
  <client-only>
    <!-- Add the menu component to the scene so it has an effect -->
    <a-scene
      v-pre
      bird
      landing-page
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement:true"
      vr-mode-ui="enabled: false"
      xrweb="
  allowedDevices: any;
  defaultEnvironmentFogIntensity: 0.5;
  defaultEnvironmentFloorTexture: #groundTex;
  defaultEnvironmentFloorColor: #FFF;
  defaultEnvironmentSkyBottomColor: #B4C4CC;
  defaultEnvironmentSkyTopColor: #5ac8fa;
  defaultEnvironmentSkyGradientStrength: 0.5;"
    >
      <!-- We can define assets here to be loaded when A-Frame initializes -->
      <a-assets v-pre>
        <img id="groundTex" src="/sand.jpg" />

        <!-- Menu item assets -->
        <a-asset-item id="cactusModel" v-pre src="/cactus.glb"></a-asset-item>
        <a-asset-item id="birdModel" src="/scene.gltf"></a-asset-item>
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
      >
      </a-camera>
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
      >
      </a-entity>
      <a-light v-pre type="ambient" intensity="0.5"></a-light>
      <!-- Adding the cantap class allows the ground to be clicked -->
      <a-box
        id="ground"
        v-pre
        class="cantap"
        scale="1000 2 1000"
        position="0 -0.99 0"
        material="shader: shadow; transparent: true; opacity: 0.4"
        shadow
      >
      </a-box>

      <!-- actual menu items -->
      <a-entity
        id="menuItem1"
        v-pre
        position="2 0 -20"
        rotation="0 0 0"
        scale="8 8 8"
        gltf-model="#cactusModel"
        :shadow="{ receive: false }"
      ></a-entity>
    </a-scene>
  </client-only>
</template>

<script>
const birdComponent = {
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
      entity.setAttribute('animation-mixer', 'clip: Fly;')
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
  name: 'MenuLanding',
  mounted() {
    this.on8thWallReady()
  },
  methods: {
    on8thWallReady() {
      AFRAME.registerComponent('bird', birdComponent)
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
