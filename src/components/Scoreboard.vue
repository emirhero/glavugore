<template>
	<div class="scoreboard">
		<div v-if="gameOn">
			<rankings></rankings>
		</div>
		<div v-if="!gameOn">
			<router-link to="/league">Napravi ligu</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'scoreboard',
	data() {
		return {
			score: null,
			teams: null,
			gameOn: null
		}
	},
	created() {
		this.score = this.$store.state.points
		this.teams = this.$store.state.teams
		this.gameOn = this.$store.state.gameOn
	}
}
</script>

<style scoped>
.scoreboard {
	width: 50%;
	margin: 0 auto;
	padding: 2em;
	background: #556270;
	opacity: 0.75;
	border-radius: 1em;
}
</style>