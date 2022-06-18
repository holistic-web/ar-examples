<template>
  <div id="overlay" style="z-index: 2">
    <div id="header" class="header">{{ projectName }}</div>
    <div id="footer" class="footer">
      <p id="footerTitle">A Holistic Project</p>
      <img id="holisticsTag" src="../assets/holistics.svg" />
      <a :href="previousPage">
        <img id="backBtn" backBtn src="../assets/back-arrow.svg" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayComponent',
  data() {
    return {
      projectName: window.location.pathname.split('/')[1],
      previousPage: window.location.origin,
    }
  },
}
</script>

<style lang="scss">
#footer {
  z-index: 10;
  position: absolute;
  bottom: 0vh;
  height: 6vh;
  width: 100%;

  left: 50%;
  transform: translate(-50%, 0);

  background-image: url('../assets/galaxy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#footerTitle {
  text-align: center;
  color: white;
  font-family: 'Nunito', monospace;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

#holisticsTag {
  position: absolute;
  z-index: 5;
  right: 1vh;
  bottom: 0.5vh;
  max-width: 10vw;
}

#backBtn {
  position: absolute;
  z-index: 5;
  left: 1vh;
  bottom: 0.5vh;
  max-width: 10vw;
}

#header {
  text-align: center;
  color: white;
  font-family: 'Nunito', monospace;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

  z-index: 10;
  position: absolute;
  top: 0vh;
  width: 100%;

  left: 50%;
  transform: translate(-50%, 0);

  background-image: url('../assets/galaxy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
