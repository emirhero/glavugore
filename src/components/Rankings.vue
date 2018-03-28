<template>
	<div>
		<div v-for="(team, index) in orderedTeams" :key="index" :team="team" class="table-item">
			<div>{{ team.color }}</div>
			<div>{{ team.points }}</div>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	name: 'Rankings',
	data() {
		return {
		}
	},
	computed: {
		orderedTeams() {
			let ordered = this.$store.state.teams
			_.orderBy(ordered, ['points'], ['desc'])
			console.log(ordered)
			return ordered
		}
	}
}
</script>

<style scoped>
.table-item {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #2b2b2b;
}
</style>