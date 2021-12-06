AFRAME.registerComponent('vertical-movement', {
      schema: {
        speed: { default: 0.1 },
        offset: { default: 1 },
      },
  
      init: function () {
  
        this.playerPos = [this.el.getAttribute("position").y]
        this.rise = 0
        this.down = 0
        console.log("position",this.playerPos)
        this.onKeyUp = this.onKeyUp.bind(this);
  
        document.addEventListener("keypress", this.onKeyUp);
  //       document.addEventListener("keydown", this.onKeydown);
  
  
  
  
      },
      update: function () {
  
      },
  
      tick: function (time, dt) {
        let playerPosition = document.getElementById("player").getAttribute("position")
   
        playerPosition.y = lerp(playerPosition.y, this.playerPos, (1 - Math.exp(- 0.005 * dt)))
         
  
   
  
      },
  
      onKeyUp: function (e) {
         if (101 === e.keyCode) {
           this.playerPos +=this.data.speed
   
  
        }
        if (113 === e.keyCode) {
             this.playerPos -=this.data.speed
   
        }
      },
  
      onKeydown: function (e) {
        if (81 === e.keyCode) {
          this.rise = 0
          this.down = 0
  
        }
        if (80 === e.keyCode) {
          this.rise = 0
          this.down = 0
        }
      }
  
  
    });
  
  