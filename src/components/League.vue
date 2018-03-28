<template>
	<div class="league">
		<h1>Napravi ligu!</h1>
		<button @click="setDummy" class="standard-btn">Set dummy teams</button><br/>
		<div class="create-team" v-for="(team, key) in teams">
			<button @click="deleteTeam(key)" class="delete-btn">x</button>
			<input type="text" placeholder="Ime tima" v-model="team.name" />
			<input type="text" placeholder="Igrač 1" v-model="team.players[0]" />
			<input type="text" placeholder="Igrač 2" v-model="team.players[1]" />
			<p>{{team.color}}</p>
		</div>

		<button @click="addTeam" v-if="!maxPlayers" class="standard-btn">Dodaj tim</button>
		<button @click="setTeams" class="standard-btn">Počni</button>
		<router-link to="/">Početna</router-link>
	</div>
</template>

<script>
function teamModel(color)  {
	return {name: '',
	//player1: '',
	//player2: '',
	color: '',
	points: 0,
	//turn: 'player1',
	players: []}
}
 
const dummyTeams = [
	{	
		name: 'X',
		color: 'blue',
		points: 0,
		players: ['Emco', 'Una']
	},
	{
		name: 'Y',
		color: 'orange',
		points: 0,
		players: ['Amar', 'Adna']
	}
]
export default {
	name: 'league',
	data() {
		return {
			teams: [],
			colors: ['blue', 'orange', 'yellow', 'red', 'purple'],
			maxPlayers: false
		}
	},
	created() {
		// Ovaj if ne radi
		if(this.$store.state.teams.length == 0) {
			let team1 = new teamModel
			team1.color = this.colors[this.teams.length]
			this.teams.push(team1)
		} else {
			this.teams = this.$store.state.teams
		}
	},
	methods: {
		setTeams() {
			console.log(this.teams)
			// Need to add validation!
			this.$store.commit('setTeams', this.teams)
		},
		addTeam() {
				let newTeam = new teamModel
				newTeam.color = this.colors[this.teams.length]
				this.teams.push(newTeam)
		},
		deleteTeam(key) {
			if(this.teams.length > 2) {
				this.teams.splice(key, 1)
			}
		},
		setDummy() {
			this.$store.commit('setTeams', dummyTeams)
		}
	}
}
</script>

<style scoped>
input {
	margin: 1em auto;
}
.create-team {
	margin: 1em 0;
	padding: 2em;
	background: #FF6B6B;
	position: relative;
}
.delete-btn {
	border-radius: 50%;
	border: none;
	background-color: #C44D58;
	width: 3em;
	height: 3em;
	color: #F4F4F4;
	font-weight: bold;
	position: absolute;
	right: 1em;
}
.delete-btn:focus {
	outline: none;
}
</style>