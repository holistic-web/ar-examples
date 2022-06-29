export default function (componentName, component) {
  if (!AFRAME.components[componentName]) {
    AFRAME.registerComponent(componentName, component)
  }
}
