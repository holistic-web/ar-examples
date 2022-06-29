<template>
  <default-layout>
    <client-only v-pre>
      <!-- Add the menu component to the scene so it has an effect -->
      <a-scene
        id="FlappingBirdsScene"
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

    <template #controls>
      <label for="controls__count"
        >Number of birds: <b>{{ count }}</b></label
      >
      <b-form-input
        id="controls__count"
        v-model="count"
        type="range"
        min="1"
        max="20"
      ></b-form-input>
    </template>
  </default-layout>
</template>

<script>
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export default {
  name: 'FlappingBirds',

  data: () => ({
    count: 5,
    birdElements: [],
  }),

  watch: {
    count: 'render',
  },

  mounted() {
    this.render()
  },

  methods: {
    clearAll() {
      this.birdElements.forEach((el) => {
        el.parentNode.removeChild(el)
      })
      this.birdElements = []
    },
    render() {
      if (this.birdElements.length !== this.count) this.clearAll()
      if (!process.client) return
      const sceneEl = document.getElementById('FlappingBirdsScene')
      for (let i = 0; i < this.count; i++) {
        const entity = document.createElement('a-entity')
        const randomYRotation = Math.random() * 360
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
        sceneEl.appendChild(entity)
        this.birdElements.push(entity)
      }
    },
  },
}
</script>
