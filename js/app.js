new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    maxHealth: 100,
    playerHealth: 100,
    monsterHealth: 100,
    battleLog: []
  },
  computed: {
    playerBarStyle() {
      let percent = ((this.playerHealth / this.maxHealth) * 100)
      return {
        width: (percent > 0 ? percent : 0) + '%'
      }
    },
    monsterBarStyle() {
      let percent = ((this.monsterHealth / this.maxHealth) * 100)
      return {
        width: (percent > 0 ? percent : 0) + '%'
      }
    }
  },
  methods: {
    newGameStart() {
      this.playerHealth = this.maxHealth
      this.monsterHealth = this.maxHealth

      this.battleLog = []

      this.gameStarted = true
    },
    checkGameOver() {
      if (this.playerHealth <= 0) {
        this.gameOver("Monster")
        return true
      }
      if (this.monsterHealth <= 0) {
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
      let damage = Math.floor(Math.random() * 10)

      this.monsterHealth = Math.max(this.monsterHealth - damage, 0)
      this.battleLog.unshift({
        player: true,
        message: 'Player hits monster for ' + damage
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    specialAttack() {
      let damage = Math.floor(Math.random() * 18)

      this.monsterHealth = Math.max(this.monsterHealth - damage, 0)
      this.battleLog.unshift({
        player: true,
        message: 'Player special attack the monster for ' + damage
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    heal() {
      let healing = Math.floor(Math.random() * 18)

      this.playerHealth = Math.min(this.playerHealth + healing, this.maxHealth)

      this.battleLog.unshift({
        player: true,
        message: 'Player heals for ' + healing
      })
      if (!this.checkGameOver()) {
        this.monsterAttack()
      }
    },
    monsterAttack() {
      let damage = Math.floor(Math.random() * 10)

      this.playerHealth = Math.max(this.playerHealth - damage, 0)
      this.battleLog.unshift({
        player: false,
        message: 'Monster hits player for ' + damage
      })
      this.checkGameOver()
    }
  }
})