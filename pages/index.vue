<template>
  <!-- <TapToPlace /> -->
  <!-- <FlyingBird /> -->
  <landing-page />
</template>

<script>
export default {
  name: 'HomePage',

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
}
</script>

<style lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
}

button {
  position: absolute;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  background-color: #7611b6;
  color: white;
  max-width: 100%;
  font-size: 1.5rem;
  border: none;
  border-radius: 20px;
  padding: 10px 15px 10px 15px;
  font-family: Helvetica, sans-serif;
}
</style>
