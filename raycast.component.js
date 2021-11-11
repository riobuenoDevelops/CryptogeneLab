let player
let mesh
let meshTargetPosition
let meshTargetRotation
let animationIterator = 0

let meshPos = new THREE.Vector3()
let meshRot = new THREE.Vector3()

let animationState = false
let lockState = false


let targetPos = new THREE.Vector3()

function lerpVectors(v1, v2, alpha) {

  this.x = v1.x + (v2.x - v1.x) * alpha;
  this.y = v1.y + (v2.y - v1.y) * alpha;
  this.z = v1.z + (v2.z - v1.z) * alpha;

  return this;
}



AFRAME.registerComponent('gltf-hover', {
  init: function () {

    player = document.getElementById("player")
    let el = this.el;
    let self = this;
    this.mouseOverObject = null
    self.trees = [];
    document.body.onkeyup = function (e) {

      if (e.key == "Enter") {
        lockState = true;
        console.log("funca: ", e.key)

      }
    }




    el.addEventListener('model-loaded', e => {
      let tree3D = el.getObject3D('mesh');
      if (!tree3D) {
        return;
      }
      //console.log('tree3D', tree3D);
      tree3D.traverse(function (node) {
        if (node.isMesh) {
          console.log(node);
          self.trees.push(node);
        }
      });
    });

    el.addEventListener('raycaster-intersected', e => {

      self.raycaster = e.detail.el;
      let intersection = self.raycaster.components.raycaster.getIntersection(
        el
      );
      console.log('Hover: ', intersection.object.name, self.mouseOverObject,
        intersection.object.name != self.mouseOverObject);
      self.mouseOver = true
    });

    el.addEventListener('raycaster-intersected-cleared', e => {

      self.trees.forEach(function (tree) {
        tree.material.emissive = new THREE.Color(0x000000);
        tree.material.emissiveIntensity = 0.0;
      });
      self.mouseOverObject = null
      self.mouseOver = false
    });
    document.addEventListener('mousemove', e => {
      if (!self.mouseOver) return;

      let intersection = self.raycaster.components.raycaster.getIntersection(
        el
      );
      if (!self.mouseOverObject || self.mouseOverObject.name != intersection.object.name && !lockState  && !animationState) {
        console.log('Hover: ', intersection.object.name, self.mouseOverObject,
          intersection.object.name != self.mouseOverObject);
        // intersection.object.material.emissive = new THREE.Color(0xFF0000);
        // intersection.object.material.emissiveIntensity = 0.5;
        if (intersection.object.name == 'Box000') {
          document.getElementById('e-Egg').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box001') {
          document.getElementById('e-BadChicken').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box002') {
          document.getElementById('e-Bat').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box003') {
          document.getElementById('e-Butterfly').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box004') {
          document.getElementById('e-Cactus').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box005') {
          document.getElementById('e-Ghost').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box006') {
          document.getElementById('e-Gremlin').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box007') {
          document.getElementById('e-Ogre').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box008') {
          document.getElementById('e-Penguin').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box009') {
          document.getElementById('e-RockGuitar').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box010') {
          document.getElementById('e-Vampire').setAttribute('animation-mixer', 'clip:Idle')
        } else if (intersection.object.name == 'Box011') {
          document.getElementById('e-TheThing').setAttribute('animation-mixer', 'clip:Idle')
        }

        if (self.mouseOverObject && !lockState) {
          self.mouseOverObject.material.emissive = new THREE.Color(0x000000);
          self.mouseOverObject.material.emissiveIntensity = 0.0;
          if (self.mouseOverObject.name == 'Box000') {
            document.getElementById('e-Egg').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box001') {
            document.getElementById('e-BadChicken').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box002') {
            document.getElementById('e-Bat').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box003') {
            document.getElementById('e-Butterfly').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box004') {
            document.getElementById('e-Cactus').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box005') {
            document.getElementById('e-Ghost').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box006') {
            document.getElementById('e-Gremlin').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box007') {
            document.getElementById('e-Ogre').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box008') {
            document.getElementById('e-Penguin').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box009') {
            document.getElementById('e-RockGuitar').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box010') {
            document.getElementById('e-Vampire').removeAttribute('animation-mixer')
          } else if (self.mouseOverObject.name == 'Box011') {
            document.getElementById('e-TheThing').removeAttribute('animation-mixer')
          }
        }
        self.mouseOverObject = intersection.object;
      }
    });
    el.addEventListener('click', function () {
      console.log('click over: ', self.mouseOverObject);

      if (self.mouseOverObject.name == 'Box001' && !animationState) {


        animationIterator
        mesh = document.getElementById("e-BadChicken")
        mesh.setAttribute("animation-mixer", "clip:Attack")

        console.log("mesh: ", mesh)
        meshTargetPosition = mesh.getAttribute("position")
        targetPos.copy(meshTargetPosition)

        console.log("working: ")
        meshPos = (mesh.getAttribute("position")).valueOf()
        meshPos.z += 1

        mesh.getAttribute("rotation")
        console.log("🚀 ~ file: raycast.component.js ~ line 146 ~  rotation", mesh.getAttribute("rotation"))
        lockState=true

        animationState = true
        // document.getElementById('player').setAttribute('animation', 'property: position; to: 0 2.05 1; dur: alternate; dur: 2000;')
        // console.log('............');
        // let url = "https:";
        // let win = window.open(url, "_blank");
        // win.focus();
      }
    });
  },


  tick: function (time, dt) {
    // console.log("dt: ", dt)
    // console.log("time: ", time)
    let curPosition = player.getAttribute("position")
    let curRotation = player.getAttribute("rotation")

    let curMeshPosition = document.getElementById("e-BadChicken").getAttribute("position")

    if (animationState) {

      //Camera dolly

      targetPos.copy(meshTargetPosition)
      //  targetPos.z+=0.0
      // targetPos.y -= 2
      targetPos.z += 2
      targetPos.y += 0.1
      curPosition.x = lerp(curPosition.x, targetPos.x, (1 - Math.exp(- 0.005 * dt)))
      curPosition.y = lerp(curPosition.y, targetPos.y, (1 - Math.exp(- 0.001 * dt)))
      curPosition.z = lerp(curPosition.z, targetPos.z, (1 - Math.exp(- 0.005 * dt)))

      meshRot.copy(mesh.getAttribute("rotation"))
      // meshRot.x += 90
      curRotation.x = lerp(curRotation.x, 90, (1 - Math.exp(- 0.005 * dt)))

      player.setAttribute("position", curPosition)
      // player.setAttribute("rotation", curRotation)


      //  pollito animation

      curMeshPosition.z = lerp(curMeshPosition.z, meshPos.z, (1 - Math.exp(- 0.0005 * dt)))
      let meshRotation = document.getElementById("e-BadChicken").getAttribute("rotation")
      // mesh.getAttribute("rotation")
      // meshRotation.y=   (Math.floor(time*0.05))

      // meshRotation.y = lerp(meshRotation.y, (Math.floor(time * 0.01)), (1 - Math.exp(- 0.001 * dt)))
      // meshRotation.x = lerp(meshRotation.x, 90, (1 - Math.exp(- 0.001 * dt)))


      mesh.setAttribute("position", curMeshPosition)
      mesh.setAttribute("rotation", meshRotation)
      console.log("meshrotation: ", meshRotation)

    }



  },




});

function lerp(x, y, t) {

  return (1 - t) * x + t * y;

}