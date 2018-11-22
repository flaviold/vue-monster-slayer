new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    maxHealth: 100,
    playerLife: 40,
    monsterLife: 1,
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
    attack() {
      let damage = Math.floor(Math.random() * 7) + 2

      this.monsterLife -= damage
      this.battleLog.push({
        bgColor: 'lightblue',
        textColor: 'darkblue',
        message: 'Player hits monster for ' + damage
      })
      this.monsterAttack()
    },
    monsterAttack() {
      let damage = Math.floor(Math.random() * 7) + 2

      this.playerLife -= damage
      this.battleLog.push({
        bgColor: 'lightcoral',
        textColor: 'darkred',
        message: 'Monster hits player for ' + damage
      })
    }
  }
})