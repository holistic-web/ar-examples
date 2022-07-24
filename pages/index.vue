<template>
  <div id="landingPage">
    <floating-menu v-if="visibleComponent === 'menu'" :menu-items="menuItems" />
    <flapping-birds v-if="visibleComponent === 'flapping-birds'" />
    <tap-to-place v-if="visibleComponent === 'tap-to-place'" />
    <dino-rex v-if="visibleComponent === 'dino-rex'" />
  </div>
</template>

<script>
import eventBus from '../lib/eventBus'

export default {
  name: 'LandingPage',

  data: () => ({
    menuItems: [
      {
        name: 'tap-to-place',
        src: '/cactus/cactus.glb',
        scale: '5 5 5',
      },
      {
        name: 'flapping-birds',
        src: '/bird/bird.gltf',
        scale: '0.005 0.005 0.005',
        animations: ['clip: flap-wings;'],
      },
      {
        name: 'dino-rex',
        src: '/dino/dino.gltf',
        scale: '2 2 2',
        animations: ['clip: idle;'],
      },
    ],
  }),

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

  computed: {
    visibleComponent() {
      if (this.$route.query.show) return this.$route.query.show
      return 'menu'
    },
  },

  mounted() {
    eventBus.$on('menu-item-clicked', this.onMenuItemClick)
  },

  methods: {
    onMenuItemClick(item) {
      this.$router.push({ query: { show: item.name } })
    },
  },
}
</script>

<style lang="scss"></style>
