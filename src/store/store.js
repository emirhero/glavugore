import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	teams: [],
	gameOn: false,
	teamTurn: null,
	roundIndex: 0,
	teamIndex: 0,
	playerIndex: 0
}

const mutations = {
	setTeams(state, teams) {
		state.teams = teams
		state.gameOn = true
		//state.turnIndex = 0
	},
	/*updateTeamTurn(state) {
		if(state.teamTurn <= teams.length) {
			state.teamTurn++
		} else {
			state.teamTurn = 0
		}
	},
	updatePlayerTurn(state, teamIndex) {
		if(state.teams[teamIndex].turn == 'player1') {
			state.teams[teamIndex].turn == 'player2'
		} else {
			state.teams[teamIndex].turn == 'player1'
		}
	},*/
	updateTeamPoints(state, points) {
		let teamPoints = state.teams[state.teamIndex].points
		console.log(teamPoints + ' + ' + points)
		state.teams[state.teamIndex].points = state.teams[state.teamIndex].points + points
	},
	playDone(state) {
		state.teamIndex++
		if(state.teamIndex > state.teams.length - 1) {
			state.teamIndex = 0
			state.roundIndex++
			state.playerIndex++
			if(state.playerIndex > 1) {
				state.playerIndex = 0
			}
		}
		if(state.roundIndex >= 2) {
			alert('Game Done.')
		}
		console.log('Round: ' + state.roundIndex)
		console.log('Team: ' + state.teamIndex)
		console.log('Player: ' + state.playerIndex)
	}
}

const getters = {
	currentlyPlaying: state => {
		//console.log(state.teams[state.teamIndex])
		let team = state.teams[state.teamIndex]
		let teamColor =  team.color
		let guessing = team.players[state.playerIndex]
		let complementary
		if(state.playerIndex == 0) {
			complementary = 1
		} else {
			complementary = 0
		}
		let explaining = team.players[complementary]
		console.log('Objasnjava' + explaining + ' a pogadja ' + guessing)
		console.log('Complementary ' + complementary)
		let result = {
			team,
			teamColor,
			guessing,
			explaining
		}
		console.log('getter kaze ' + Object.values(result))
		return {
			team,
			teamColor,
			guessing,
			explaining
		}
	}
}

export default new Vuex.Store({
	state,
	mutations,
	getters
})