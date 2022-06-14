<template>
  <client-only>
    <!-- Add the menu component to the scene so it has an effect -->
    <a-scene
      v-pre
      xrextras-loading
      xrextras-runtime-error
      xrextras-gesture-detector
      xrextras-almost-there
      renderer="colorManagement:true"
      vr-mode-ui="enabled: false"
    >
      <!-- We can define assets here to be loaded when A-Frame initializes -->
      <a-assets v-pre>
        <a-asset-item id="birdModel" src="/scene.gltf"></a-asset-item>
      </a-assets>

      <!-- The raycaster will emit mouse events on scene objects specified with the cantap class -->
      <a-camera
        id="camera"
        position="0 8 8"
        raycaster="objects: .cantap"
        cursor="fuse: false; rayOrigin: mouse;"
      >
      </a-camera>

      <a-entity
        light="
          type: directional;
          intensity: 0.8;
          castShadow: true;
          shadowMapHeight:2048;
          shadowMapWidth:2048;
          shadowCameraTop: 10;
          target: #model;"
        xrextras-attach="target: model; offset: 1 15 3;"
        shadow
      >
      </a-entity>

      <a-light type="ambient" intensity="0.7"></a-light>

      <a-entity
        id="model"
        gltf-model="#birdModel"
        animation-mixer
        class="cantap"
        xrextras-hold-drag
        xrextras-two-finger-rotate
        xrextras-pinch-scale
        scale="0.01 0.01 0.01"
        shadow="receive: false"
      >
      </a-entity>

      <a-plane
        id="ground"
        rotation="-90 0 0"
        width="1000"
        height="1000"
        material="shader: shadow"
        shadow
      >
      </a-plane>
    </a-scene>
  </client-only>
</template>

<script>
export default {
  name: 'FlyingBird',

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

        // 8thWall Web - Replace the app key here with your own app key (only works on authorised domains)
        {
          src: '//apps.8thwall.com/xrweb?appKey=zl9iYLs0UnM13G8kugSsXRboJtbC2OJOZWmGeV4dvmWAKMaq1kwdRIa4PTdy4WvWyR05BG',
        },
      ],
    }
  },
}
</script>
