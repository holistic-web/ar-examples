<template>
  <div id="landingPage">
    <floating-menu v-if="isMenuVisible" :menu-items="menuItems" />

    <flapping-birds v-if="$route.query.show === 'flapping-birds'" />
    <tap-to-place v-if="$route.query.show === 'tap-to-place'" />
  </div>
</template>

<script>
import eventBus from '../lib/eventBus'
import flappingBirds from '../components/FlappingBirds.vue'

export default {
  name: 'LandingPage',
  components: { flappingBirds },

  data: () => ({
    shownComponent: null,

    menuItems: [
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
    isMenuVisible() {
      return !this.$route.query.show
    },
  },

  mounted() {
    eventBus.$on('menu-item-clicked', this.onMenuItemClicked)
  },

  methods: {
    onMenuItemClicked(item) {
      this.$router.push({ query: { show: item.name } })
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
