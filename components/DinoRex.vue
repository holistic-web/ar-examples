<template>
  <default-layout>
    <client-only v-pre>
      <!-- Add the menu component to the scene so it has an effect -->
      <a-scene
        id="DinoRexScene"
        xrextras-loading
        xrextras-runtime-error
        renderer="colorManagement:true"
        vr-mode-ui="enabled: false"
        xrweb
      >
        <!-- We can define assets here to be loaded when A-Frame initializes -->
        <a-assets>
          <!-- Credit to Poly by Google for the model: https://poly.google.com/view/5ZMAz7_ucTn -->
          <a-asset-item id="dinoModel" src="/dino/dino.gltf" />
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

        <a-entity
          id="model"
          gltf-model="#dinoModel"
          character-move
          character-recenter
          character-action
          character-finish-animation
          animation-mixer="clip: idle; loop: repeat"
          class="cantap"
          xrextras-pinch-scale
          scale="1 1 1"
          shadow="receive: false"
          position="0 0 -10"
        />

        <a-plane
          id="ground"
          rotation="-90 0 0"
          width="1000"
          height="1000"
          material="shader: shadow"
          shadow
        />
      </a-scene>
    </client-only>

    <template #controls>
      <img
        id="recenterBtn"
        class="DinoRex__controlButton"
        src="/dino/reset.svg"
      />
      <h3 class="DinoRex__controlText">DRAG HERE TO MOVE</h3>
      <img id="actionBtn" class="DinoRex__controlButton" src="/dino/oh.svg" />
    </template>
  </default-layout>
</template>

<script>
export default {
  name: 'DinoRex',

  mounted() {},
}
</script>

<style lang="scss">
.DinoRex {
  &__controlButton {
    max-height: 50px;
  }

  &__controlText {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
}
</style>
