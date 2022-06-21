<template>
  <div class="DefaultLayout">
    <section class="DefaultLayout__header">
      <slot name="header">
        <img
          v-if="showBackButton"
          class="DefaultLayout__icon"
          src="../assets/back-arrow.svg"
          @click="onBackClick"
        />
        <h1 v-text="title" />
      </slot>
    </section>

    <section class="DefaultLayout__content">
      <slot name="default" />
    </section>

    <section class="DefaultLayout__controls">
      <slot name="controls"><p>Tap an icon to to see the demo</p></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    title() {
      if (this.$route.query.show) return this.$route.query.show
      return 'ar-sandbox'
    },
    showBackButton() {
      return !!this.$route.query.show
    },
  },
  methods: {
    onBackClick() {
      this.$router.push({ query: { show: null } })
    },
  },
}
</script>

<style lang="scss">
$textColour: rgb(200, 194, 184);
$backgroundColour: rgb(37, 38, 52);

.DefaultLayout {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;

  &__header,
  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    color: $textColour;
    background-color: $backgroundColour;
    opacity: 0.9;
    z-index: 1;
    width: 100%;
    position: absolute;
    left: 0;
    height: fit-content;
  }

  &__header {
    top: 0;
    border-bottom: 1px solid #e0e0e0;
  }
  &__controls {
    bottom: 0;
    border-top: 1px solid #e0e0e0;
    padding-bottom: 125px;
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }

  &__content {
    z-index: 0;
  }

  a-scene {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
