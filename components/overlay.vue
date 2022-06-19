<template>
  <div id="overlay" style="z-index: 2">
    <div id="header" class="header">{{ projectName }}</div>
    <div id="footer" class="footer">
      <img id="moreInfo" src="../assets/up-arrow.svg" />
      <img id="closeBtn" src="../assets/close.svg" />
      <img id="holisticsTag" src="../assets/holistics.svg" />
      <a :href="previousPage">
        <img id="backBtn" src="../assets/back-arrow.svg" />
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
  mounted() {
    this.upArrow()
    this.closeBtn()
  },
  methods: {
    upArrow() {
      const moreInfo = document.getElementById('moreInfo')
      const footer = document.getElementById('footer')
      const closeBtn = document.getElementById('closeBtn')
      console.log('hi')
      moreInfo.addEventListener('click', function () {
        console.log('hey')
        console.log('clicked')
        footer.style.height = '50vh'
        footer.style.opacity = '.5'
        closeBtn.style.visibility = 'visible'
      })
    },
    closeBtn() {
      const closeBtn = document.getElementById('closeBtn')
      const footer = document.getElementById('footer')
      closeBtn.addEventListener('click', function () {
        footer.style.height = '6vh'
        footer.style.opacity = '1'
      })
    },
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
  transition: 0.3s;

  background-image: url('../assets/galaxy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#moreInfo {
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: 0.5vh;
  max-width: 20vw;
}
#closeBtn {
  visibility: hidden;
  position: absolute;
  z-index: 5;
  right: 1vh;
  top: 1vh;
  max-width: 12vw;
  height: 50px;
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
