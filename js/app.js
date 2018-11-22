new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    maxHealth: 100,
    playerLife: 100,
    monsterLife: 100,
    battleLog: []
  },
  computed: {
    playerBarStyle() {
      let percent = ((this.playerLife / this.maxHealth) * 100)
      return {
        width: (percent > 0 ? percent : 0) + '%'
      }
    },
    monsterBarStyle() {
      let percent = ((this.monsterLife / this.maxHealth) * 100)
      return {
        width: (percent > 0 ? percent : 0) + '%'
      }
    }
  },
  methods: {
    newGameStart() {
      this.playerLife = this.maxHealth
      this.monsterLife = this.maxHealth

      this.battleLog = []

      this.gameStarted = true
    },
    checkGameOver() {
      if (this.playerLife <= 0) {
        this.gameOver("Monster")
        return true
      }
      if (this.monsterLife <= 0) {
        this.gameOver("Player")
        return true
      }
    },
    gameOver(winner) {
      if (confirm(winner + " wins! Do you want to start a new game?")) {
        this.newGameStart()
        return
      }

      this.gameStarted = false
    },
    attack() {
      let damage = Math.floor(Math.random() * 7) + 2

      this.monsterLife -= damage
      this.battleLog.push({
        bgColor: 'lightblue',
        textColor: 'darkblue',
        message: 'Player hits monster for ' + damage
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    specialAttack() {
      let damage = Math.floor(Math.random() * 14) + 4

      this.monsterLife -= damage
      this.battleLog.push({
        bgColor: 'lightblue',
        textColor: 'darkblue',
        message: 'Player special attack the monster for ' + damage
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    heal() {
      let healing = Math.floor(Math.random() * 14) + 4

      this.playerLife += healing

      this.playerLife = this.playerLife < this.maxHealth ? this.playerLife : this.maxHealth

      this.battleLog.push({
        bgColor: 'lightgreen',
        textColor: 'darkgreen',
        message: 'Player heals for ' + healing
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    monsterAttack() {
      let damage = Math.floor(Math.random() * 7) + 2

      this.playerLife -= damage
      this.battleLog.push({
        bgColor: 'lightcoral',
        textColor: 'darkred',
        message: 'Monster hits player for ' + damage
      })
      this.checkGameOver()
    }
  }
})