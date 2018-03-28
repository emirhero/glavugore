<template>
<div class="wrapper">
	<div class="tv-only"><h6>*ovdje staneš*</h6></div>
	<div class="play-area">
	<div class="left">
		<button @keyup.up.prevent="next"   @click="next" v-if="playing && !deviceHasOrientation" class="game-btn"><icon name="angle-left" scale="3" class="white"></icon></button>
	</div>

	<div class="center">
		<div v-if="leagueOn" class="grid-center">
			{{ currentlyPlaying.teamColor }} igraju!
			{{ currentlyPlaying.explaining }} objašnjava,
			{{ currentlyPlaying.guessing }} pogađa!
		</div>
	
		<div v-if="loading" class="grid-center">
			Učitavanje...
		</div>
	
		<div v-if="showingIntro" class="grid-center">
			<h1>{{display}}</h1>
		</div>
	
		<div v-if="playing" class="grid-center"> 
		 <h1>{{display}}</h1> <br/> <br/>
		 <br/>
		 {{ secondsLeft }}
		</div>
	
		<div v-if="stopped" class="grid-center">
			<h1>{{display}}</h1>
			<router-link to="/" v-if="stopped">Vrati se na početnu</router-link>
		</div>
	</div>

	<div class="right">
		<button @keyup.down.prevent="skip" @click="skip" v-if="playing && !deviceHasOrientation" class="game-btn"><icon name="angle-right" scale="3" class="white"></icon></button>
	</div>
	</div>
</div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import db from './firebaseInit.js'

var timer 

export default {
	name: 'reader',
	// Prop treba biti categoryId
	props: ['category'],
	data() {
		return {
			loading: true,
			showingIntro: false,
			count: 0,
			display: null,
			tasks: [],
			correct: [],
			timeNow: null, // postavlja inicijalnu vrijednost vremena
			timeAvailable: null,
			stopped: false,
			playing: false,

			leagueOn: false,
			currentlyPlaying: null,
			pointsAwarded: 0,

			deviceHasOrientation: false,
			gamma: null
		}
	},
	computed: {
		secondsLeft() {
			while(this.playing) {
				if ((this.timeAvailable - this.timeNow) > 0) {
						return (this.timeAvailable - this.timeNow) 
					} else {
						this.timesUp()
				}
			}
		}
	},

		/*secondsLeft() {
			if(this.playing) {
				if ((this.timeAvailable - this.timeNow) > 0) {
					return (this.timeAvailable - this.timeNow) 
				} else {
					this.timesUp()
				}
			}
		},
		introText() {
			let intro = ['Priprema', 'Pozor', 'Sad']
			let i = 0

			window.addEventListener('load', () => {
				let interval = setInterval(() => {
					this.display = intro[i]
					i++
					if(i > 3) {
						clearInterval(interval)
					}
				}, 1000)
				//this.introShowing = false
				//this.setup()
			})
		}
	},*/
	created() {
		// Prop treba biti categoryId
		/*axios.get('http://demo2070301.mockable.io/api/questions/' + this.category)
			 .then(response => {
			 	console.log(response.data.tasks);
			 	this.tasks = response.data.tasks;
			 	this.setup();
			 })
			 .catch(error => {
			 	console.log(error)
			 });*/

		let ref = db.ref('categories/' + this.category)
		ref.once('value').then((snapshot) => {
			/*console.log(snapshot.val())
			this.tasks = Object.values(snapshot.val())
			console.log(this.tasks[0].task)*/	

			this.tasks = Object.values(snapshot.val().tasks)

			this.loading = false
			this.showIntro()
		})

		if(this.$store.state.gameOn) {
			this.leagueOn = true
			this.currentlyPlaying = this.$store.getters.currentlyPlaying
			//console.log('League On?' + this.leagueOn)
			//console.log('Trenutno igraju' + this.currentlyPlaying)
		}

		// Checks if your device can detect orientation
		window.addEventListener("deviceorientation", (event) => {
			if(event.gamma) {
				this.deviceHasOrientation = true
				this.gamma = event.gamma
				console.log(this.gamma)
			}
		})
	}/*,
	mounted() {
		console.log('mounted() says' + this.tasks)
		let intro = ['Priprema', 'Pozor', 'Sad']
		let i = 0
		window.addEventListener('load', () => {
			let interval = setInterval(() => {
				this.display = intro[i]
				i++
				if(i > 3) {
					clearInterval(interval)
					//console.log(this.tasks)
				}
			}, 1000)
			this.setup()
		})
	}*/,
	methods: {
		showIntro() {
			this.showingIntro = true
			this.pushIntro('Priprema')
			_.delay(this.pushIntro, 1000, 'Pozor')
			_.delay(this.pushIntro, 2000, 'Sad')
			_.delay(this.startGame, 3000)
		},
		pushIntro(text) {
			this.display = text
		},
		startGame() {
			this.showingIntro = false
			this.playing = true
			this.display = this.tasks[0].task

			this.timeNow = Math.trunc((new Date()).getTime() / 1000)
			this.timeAvailable = this.timeNow + 10
			console.log(this.timeNow, this.timeAvailable)
			timer = window.setInterval(() => {
				this.timeNow = Math.trunc((new Date()).getTime() / 1000)
			}, 1000);

			// https://vuejsdevelopers.com/2017/05/01/vue-js-cant-help-head-body/
			/*let skip = this.skip.call()
			let next = this.next.call()
			var self = this*/

			document.addEventListener('keyup', (event) => {
				if(event.keyCode==37) {
					this.skip()
				}
			})

			document.addEventListener('keyup', (event) => {
				if(event.keyCode==39) {
					this.next()
				}
			})

			if(this.gamma) {
				if(this.gamma < -80) {
					this.next()
				}
				else if(this.gamma > 80) {
					this.skip()
				}
			}
		},
		/*wait(ms) {
			let start = new Date().getTime()
			let end = start
			while(end < start + ms) {
				end = new Date().getTime()
			}
		},*/
		/*displayCountdown(message) {
			this.display = message
		},
		setup() {
			this.playing = true
			this.display = this.tasks[0].task
			this.timeNow = Math.trunc((new Date()).getTime() / 1000)
			this.timeAvailable = Math.trunc(((new Date()).getTime() / 1000) + 10)
			window.setInterval(() => {
			this.timeNow = Math.trunc((new Date()).getTime() / 1000)
		}, 1000);
		},*/
		timesUp() {
			this.playing = false
			clearInterval(timer)
			this.display = 'Vrijeme isteklo! Pogodio si: ' + this.correct.length;
			this.stopped = true;
			
			if(this.leagueOn) {
				this.$store.commit('updateTeamPoints', this.pointsAwarded)
				/*this.$store.commit('updateTeamTurn')
				this.$store.commit('udpatePlayerTurn', this.teamIndex)*/
				this.$store.commit('playDone')
			}
		},
		next(event) {
			this.correct.push(this.tasks[this.count]);
			this.count = this.count + 1;
			this.display = this.tasks[this.count].task;
			this.pointsAwarded += 1
		},
		skip(event) {
			// Possible model
			this.display = 'Po ušima!'
			_.delay(this.switchTask, 500)
		},
		switchTask() {
			this.count = this.count + 1;
			this.display = this.tasks[this.count].task;
		}
	}
}
</script>

<style scoped> 
@media screen and (min-width: 320px) and (max-width: 767px) and (orientation: portrait) {
  .wrapper {
    transform: rotate(-90deg);
    transform-origin: left top;
    width: 100vh;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }
}

@media only screen and (min-width: 1800px) {
    .tv-only {
    	display: block;
    }
}
.wrapper {
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	/*grid-template-columns: 1fr;
	grid-template-rows: 1fr 3fr 1fr;*/
	width: 100vw;
	height: 100vh;
	align-items: stretch;
	/*justify-content: space-evenly;*/
	overflow: hidden;
}
/*.play-area {
	width: 100%;/*
	height: 100%;*//*
	display: flex;
	align-items: stretch;
	justify-content: space-between;
}*/
.tv-only {
	display: none;
	width: 100%;
	height: 100%;
	background: #556270;
}
.game-btn {
	width: 100%;
	height: 100%;
	background: #556270;
	border: none;
}
.play-area {
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: 1;
	grid-template-columns: 1fr 3fr 1fr;
	justify-content: center;
	/*align-content: center;*/
}
.center {
	display: grid;
	width: 100%;
	height: 100%;
	grid-template-rows: 1fr 2fr 1fr;
	grid-template-columns: 1;
	justify-content: center;
	align-content: center;
}
.grid-center {
	grid-column: 1;
	grid-row: 2;
}
.white {
	color: #f4f4f4;
}
</style>