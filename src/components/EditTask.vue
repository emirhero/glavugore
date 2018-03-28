<template>
	<div v-if="!deleted">
		<h1 v-if="!editing">{{ task.task }}</h1>
		<form v-if="editing">
			<input type="text" v-if="editing" v-model:value="task.task"/>
			<input type="submit" @click.prevent="updateTask"/>
		</form>
		<h2>{{ task.id }}</h2>
		<button @click="deleteTask">x</button>
		<button @click="switchEditing">Edit</button>
	</div>
</template>
<script>
import db from './firebaseInit'
export default {
	name: 'edit-task',
	props: ['task'],
	data() {
		return {
			deleted: false,
			editing: false
		}
	},
	methods: {
		deleteTask() {
			// Add code to remove the task from server
			//this.deleted = true;
			this.$emit('deleteTask', this.task.id)
		},
		updateTask() {
			// Add code to update the task on the server
			this.$emit('updateTask', this.task)
			this.editing = false;

		},
		switchEditing() {
			this.editing = !this.editing
		}
		// Add task function is found in EditCategory.vue
	}
}
</script>

<style scoped>
div {
	padding: 2em 0;
}
</style>