<template>
  <client-only>
    <!-- Add the tap-place component to the scene so it has an effect -->
    <a-scene
      v-pre
      tap-place
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
        <a-asset-item id="cactusModel" v-pre src="/cactus.glb"></a-asset-item>
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
    </a-scene>
  </client-only>
</template>

<script>
const tapPlaceComponent = {
  schema: {
    min: { default: 6 },
    max: { default: 10 },
  },
  init() {
    console.log('init')
    const ground = document.getElementById('ground')
    ground.background = 'green'
    console.log('ground: ', ground)
    ground.addEventListener('click', (event) => {
      console.log('click')
      // Create new entity for the new object
      const newElement = document.createElement('a-entity')
      // The raycaster gives a location of the touch in the scene
      const touchPoint = event.detail.intersection.point
      newElement.setAttribute('position', touchPoint)
      const randomYRotation = Math.random() * 360
      newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)
      const randomScale = Math.floor(
        Math.random() * (Math.floor(this.data.max) - Math.ceil(this.data.min)) +
          Math.ceil(this.data.min)
      )
      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')
      newElement.setAttribute('shadow', {
        receive: false,
      })
      newElement.setAttribute('gltf-model', '#cactusModel')
      this.el.sceneEl.appendChild(newElement)
      newElement.addEventListener('model-loaded', () => {
        // Once the model is loaded, we are ready to show it popping in using an animation
        newElement.setAttribute('visible', 'true')
        newElement.setAttribute('animation', {
          property: 'scale',
          to: `${randomScale} ${randomScale} ${randomScale}`,
          easing: 'easeOutElastic',
          dur: 800,
        })
      })
    })
  },
}

export default {
  name: 'TapToPlace',
  data: () => ({
    isLoaded: false,
  }),
  mounted() {
    this.on8thWallReady()
  },
  methods: {
    on8thWallReady() {
      AFRAME.registerComponent('tap-place', tapPlaceComponent)
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
