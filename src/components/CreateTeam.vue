<template>
	<div class="create-team">
		<input type="text" placeholder="Ime tima" v-model="team.teamName"/>
		<input type="text" placeholder="Igrač 1" v-model="team.player1"/>
		<input type="text" placeholder="Igrač 2" v-model="team.player2"/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			team: {
				teamName: null,
				player1: null,
				player2: null
			}
		}
	}
}
</script>

<style scoped>

</style>