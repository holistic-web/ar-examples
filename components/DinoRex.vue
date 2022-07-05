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
      <img id="recenterBtn" src="/dino/reset.svg" />
      <h3>DRAG HERE TO MOVE (and pinch to scale)</h3>
      <img id="actionBtn" src="/dino/oh.svg" />
    </template>
  </default-layout>
</template>

<script>
import registerAFrameComponent from '../lib/registerAFrameComponent'

const characterMoveComponent = {
  init() {
    this.handleTouch = (e) => {
      this.positionRaw = e.detail.positionRaw
      this.startPositionRaw = this.startPositionRaw || this.positionRaw
    }
    this.clearTouch = (e) => {
      this.startPositionRaw = null
    }
    window.addEventListener('onefingerstart', this.handleTouch)
    window.addEventListener('onefingermove', this.handleTouch)
    window.addEventListener('onefingerend', this.clearTouch)
    const overlay = document.getElementById('overlay')
    this.joystickParent = document.createElement('div')
    this.joystickParent.classList.add(
      'joystick-container',
      'absolute-fill',
      'shadowed'
    )
    this.joystickPosition = document.createElement('div')
    this.joystickPosition.classList.add('joystick', 'position')
    this.joystickParent.appendChild(this.joystickPosition)
    this.joystickOrigin = document.createElement('div')
    this.joystickOrigin.classList.add('joystick', 'origin')
    this.joystickParent.appendChild(this.joystickOrigin)
    overlay.appendChild(this.joystickParent)
    this.camera = document.getElementById('camera')
  },
  tick(time, timeDelta) {
    // const { startPositionRaw, positionRaw, headModel } = this
    const { startPositionRaw, positionRaw } = this
    if (startPositionRaw) {
      const isTablet = window.matchMedia('(min-width: 640px)').matches
      const isDesktop = window.matchMedia('(min-width: 961px)').matches

      const maxRawDistance =
        Math.min(window.innerWidth, window.innerHeight) /
        (isDesktop ? 18 : isTablet ? 17 : 8)
      let rawOffsetX = positionRaw.x - startPositionRaw.x
      let rawOffsetY = positionRaw.y - startPositionRaw.y
      const rawDistance = Math.sqrt(
        Math.pow(rawOffsetX, 2) + Math.pow(rawOffsetY, 2)
      )
      // Normalize to maxRawDistance
      if (rawDistance > maxRawDistance) {
        rawOffsetX *= maxRawDistance / rawDistance
        rawOffsetY *= maxRawDistance / rawDistance
      }
      const widthScale = 100 / window.innerWidth
      const heightScale = 100 / window.innerHeight
      this.joystickParent.classList.add('visible')
      this.joystickOrigin.style.left = `${startPositionRaw.x * widthScale}%`
      this.joystickOrigin.style.top = `${startPositionRaw.y * heightScale}%`
      this.joystickPosition.style.left = `${
        (startPositionRaw.x + rawOffsetX) * widthScale
      }%`
      this.joystickPosition.style.top = `${
        (startPositionRaw.y + rawOffsetY) * heightScale
      }%`
      const offsetX = rawOffsetX / maxRawDistance
      const offsetY = rawOffsetY / maxRawDistance
      const forward = -Math.min(Math.max(-1, offsetY), 1)
      const side = -Math.min(Math.max(-1, offsetX), 1)
      // let dir
      // const moveZ = -forward * 0.4
      // const moveX = -side * 0.4
      // get y rot of camera
      const camY = this.camera.object3D.rotation.y
      let joystickRot = Math.atan2(forward, side)
      joystickRot -= camY
      const speed = 0.0055
      this.el.object3D.position.z -= speed * Math.sin(joystickRot) * timeDelta
      this.el.object3D.position.x -= speed * Math.cos(joystickRot) * timeDelta
      this.el.object3D.rotation.y = -joystickRot - Math.PI / 2
      this.el.setAttribute('animation-mixer', {
        clip: 'run',
        loop: 'repeat',
        crossFadeDuration: 0.4,
      })
    } else if (
      this.el.getAttribute('animation-mixer').clip !== 'bite' &&
      this.el.getAttribute('animation-mixer').clip !== 'roar' &&
      this.el.getAttribute('animation-mixer').clip !== 'attack_tail'
    ) {
      this.el.setAttribute('animation-mixer', {
        clip: 'idle',
        loop: 'repeat',
        crossFadeDuration: 0.4,
      })
      this.joystickParent.classList.remove('visible')
    }
    //  else {
    //   this.el.addEventListener('animation-finished',function() {
    //     this.el.setAttribute('animation-mixer', {
    //       clip: 'idle',
    //       loop: 'repeat',
    //       crossFadeDuration: 0.4,
    //     })          },{once:true});
    // setTimeout(() => {
    //   this.el.removeAttribute('animation-mixer')

    //  }, 3000)
    //  this.joystickParent.classList.remove('visible')
    //  }
  },
  remove() {
    window.removeEventListener('onefingerstart', this.handleTouch)
    window.removeEventListener('onefingermove', this.handleTouch)
    window.removeEventListener('onefingerend', this.clearTouch)
    this.joystickParent.parentNode.removeChild(this.joystickParent)
  },
}

const characterRecenterComponent = {
  init() {
    const recenterBtn = document.getElementById('recenterBtn')
    recenterBtn.addEventListener('click', () => {
      recenterBtn.classList.add('pulse-once')
      setTimeout(() => {
        recenterBtn.classList.remove('pulse-once')
      }, 500)
      this.el.sceneEl.emit('recenter')
      this.el.object3D.position.set(0, 0, 0)
    })
  },
}

const characterActionComponent = {
  init() {
    const actionBtn = document.getElementById('actionBtn')
    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }
    actionBtn.addEventListener('click', () => {
      const index = getRandomInt(3)
      switch (index) {
        case 0:
          this.el.setAttribute('animation-mixer', {
            clip: 'bite',
            loop: 'once',
            timeScale: 1,
          })
          break
        case 1:
          this.el.setAttribute('animation-mixer', {
            clip: 'roar',
            loop: 'once',
            timeScale: 1,
          })
          break
        case 2:
          this.el.setAttribute('animation-mixer', {
            clip: 'attack_tail',
            loop: 'once',
            timeScale: 1,
          })
          break
      }
    })
  },
}

export default {
  name: 'DinoRex',

  mounted() {
    registerAFrameComponent('character-move', characterMoveComponent)
    registerAFrameComponent('character-recenter', characterRecenterComponent)
    registerAFrameComponent('character-action', characterActionComponent)
  },
}
</script>

<style lang="scss">
.joystick-container {
  pointer-events: none;
  opacity: 0;
}
.joystick-container.visible {
  opacity: 1;
}
.joystick {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 10000px;
  z-index: 5;
}
.joystick.position {
  width: 15vmin;
  height: 15vmin;
  border: 2px solid white;
  z-index: 10;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 50%);
}
.joystick.origin {
  width: 40vmin;
  height: 40vmin;
  border: 2px solid white;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 50%);
}
/* DESKTOP AND VR STYLES */
@media (min-width: 320px) {
}
@media (min-width: 481px) {
} /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
@media (min-width: 641px) {
  .joystick.position {
    width: 8vmin;
    height: 8vmin;
    border: 2px solid white;
    z-index: 10;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 50%);
  }

  .joystick.origin {
    width: 20vmin;
    height: 20vmin;
    border: 2px solid white;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 50%);
  }
}
h3 {
  text-align: center;
  color: white;
  font-family: 'Nunito', monospace;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);

  z-index: 10;
  position: absolute;
  bottom: 0vh;
  left: 50%;
  transform: translate(-50%, 0);
}
#recenterBtn {
  position: absolute;
  z-index: 5;
  left: 1vh;
  bottom: 1vh;
  max-width: 12vw;
  rotate: -90deg;
}
.pulse-once {
  animation: pulse-once 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) both;
}
@keyframes pulse-once {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
#actionBtn {
  position: absolute;
  z-index: 5;
  right: 1vh;
  bottom: 1vh;
  max-width: 12vw;
}
.pulse-once {
  animation: pulse-once 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) both;
}
@keyframes pulse-once {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
