<template>
  <default-layout>
    <client-only v-pre>
      <!-- Add floating-menu attribute to the scene  -->
      <a-scene
        floating-menu
        xrextras-loading
        xrextras-runtime-error
        renderer="colorManagement:true"
        vr-mode-ui="enabled: false"
        xrweb
      >
        <!-- We can define assets here to be loaded when A-Frame initializes -->
        <a-assets id="menuAssets" />
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
  </default-layout>
</template>

<script>
import eventBus from '../lib/eventBus'
import registerAFrameComponent from '../lib/registerAFrameComponent'

function getFloatingMenuComponent(menuItems, depth, width) {
  return {
    init() {
      const assets = document.getElementById('menuAssets')
      menuItems.forEach((item, i) => {
        // add asset
        const asset = document.createElement('a-asset-item')
        asset.setAttribute('id', `${item.name}-asset`)
        asset.setAttribute('src', item.src)
        assets.appendChild(asset)

        const positionX = (width * (i + 1)) / menuItems.length - width / 2

        // set attributes
        const entity = document.createElement('a-entity')
        const attributes = {
          id: `menu-item-${i}`,
          'gltf-model': `#${item.name}-asset`,
          scale: '0.0001 0.0001 0.0001',
          shadow: { receive: false },
          position: `${positionX} 0 ${depth}`,
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
          eventBus.$emit('menu-item-clicked', item)
        }
        entity.addEventListener('model-loaded', onModelLoaded)
        entity.addEventListener('mousedown', onItemMouseDown)
        entity.addEventListener('mouseup', onItemMouseUp)

        // add the element to the scene
        this.el.sceneEl.appendChild(entity)
      })
    },
  }
}

export default {
  name: 'FloatingMenu',

  props: {
    menuItems: { type: Array, required: true },
    width: { type: Number, default: 10 },
    depth: { type: Number, default: -10 },
  },

  mounted() {
    const floatingMenuComponent = getFloatingMenuComponent(
      this.menuItems,
      this.depth,
      this.width
    )
    registerAFrameComponent('floating-menu', floatingMenuComponent)
  },
}
</script>
