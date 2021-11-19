AFRAME.registerComponent('cylinder-height', {
  schema: {
    toggle: { default: false },
    keyCode: { default: 32 },
    init: { default: false },
    minHeight: { default: 1 },
    maxHeight: { default: 0 },
  },

  init: function () {
    let data = this.data;
    let el = this.el
    let self = this

    data.toggle = true
    el.addEventListener('model-loaded', e => {
      data.init = true

      document.addEventListener("keyup", function () {
        self.height = self.el.getAttribute("scale")
        // self.height.y += 1
        self.el.setAttribute('scale', self.height)

        if (data.toggle) {
          data.toggle = false

        } else {
          data.toggle = true
        }
      });
    });
  },

  tick: function (time, dt) {



    if (this.data.init) {
      let height = document.getElementById(this.el.id).getAttribute("scale")
      if (this.data.toggle) {
        height.y = lerp(height.y, this.data.minHeight, (1 - Math.exp(- 0.0005 * dt)))

      } else {
        height.y = lerp(height.y, this.data.maxHeight, (1 - Math.exp(- 0.0005 * dt)))
      }

    }
  }

})
