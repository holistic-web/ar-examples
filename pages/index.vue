<template>
  <client-only>
    <!-- Add landing-page attribute to the scene  -->
    <a-scene
      v-pre
      landing-page
      xrextras-loading
      xrextras-runtime-error
      renderer="colorManagement:true"
      vr-mode-ui="enabled: false"
      xrweb
    >
      <!-- We can define assets here to be loaded when A-Frame initializes -->
      <a-assets id="menuAssets" v-pre />

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
const MENU_DEPTH = -10
const MENU_WIDTH = 10

const MENU_ITEMS = [
  {
    name: 'tap-to-place',
    src: '/cactus.glb',
    scale: '7 7 7',
  },
  {
    name: 'flapping-birds',
    src: '/bird.gltf',
    scale: '0.01 0.01 0.01',
    animations: ['clip: flap-wings;'],
  },
  {
    name: 'overlay-demo',
    src: '/bird.gltf',
    scale: '0.01 0.01 0.01',
    animations: ['clip: flap-wings;'],
  },
]

const landingPageComponent = {
  init() {
    const assets = document.getElementById('menuAssets')
    MENU_ITEMS.forEach((item, i) => {
      // add asset
      const asset = document.createElement('a-asset-item')
      asset.setAttribute('id', `${item.name}-asset`)
      asset.setAttribute('src', item.src)
      assets.appendChild(asset)

      // set attributes
      const entity = document.createElement('a-entity')
      const attributes = {
        id: `menu-item-${i}`,
        'gltf-model': `#${item.name}-asset`,
        scale: '0.0001 0.0001 0.0001',
        shadow: { receive: false },
        position: `${
          i % 2 === 0 ? -MENU_WIDTH / 2 : MENU_WIDTH / 2
        } 0 ${MENU_DEPTH}`,
        class: 'cantap',
        visible: false,
      }
      Object.keys(attributes).forEach((key) => {
        entity.setAttribute(key, attributes[key])
      })

      // set event handlers
      function onModelLoaded() {
        entity.setAttribute('visible', true)
        entity.setAttribute('animation', {
          property: 'scale',
          duration: 800,
          easing: 'easeOutElastic',
          to: item.scale,
        })
      }
      function onItemMouseDown() {
        if (item.animations) {
          entity.setAttribute('animation-mixer', item.animations.join())
        }
      }
      function onItemMouseUp() {
        entity.removeAttribute('animation-mixer')
        window.location.pathname = `/${item.name}`
      }
      entity.addEventListener('model-loaded', onModelLoaded)
      entity.addEventListener('mousedown', onItemMouseDown)
      entity.addEventListener('mouseup', onItemMouseUp)

      // add the element to the scene
      this.el.sceneEl.appendChild(entity)
    })
  },
}

export default {
  name: 'LandingPage',

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
      AFRAME.registerComponent('landing-page', landingPageComponent)
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
