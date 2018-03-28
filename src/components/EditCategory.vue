<template>
<div>	
		<h1>Kategorija: {{categoryId}}</h1>
		<edit-task v-for="(task,key) in tasks" :task="task" :key="key" @deleteTask="deleteTask" @updateTask="updateTask"></edit-task>
		<button @click="addTaskField">Novi</button>
	<form v-if="newTask">
		<input type="text" v-model:value="newTaskName"/>
		<input type="submit" @click.prevent="addTask"/>
	</form>
</div>
</template>

<script>
import axios from 'axios'
import EditTask from '@/components/EditTask'
import db from './firebaseInit'

export default {
	name: 'editcategory',
	props: ['categoryId'],
	components: {
		'edit-task': EditTask
	},
	data() {
		return {
			tasks: [],
			newTask: false,
			newTaskName: ''
		}
	},
	created() {
		/*axios.get('http://demo2070301.mockable.io/api/questions/' + this.categoryId)
			 .then(response => {
			 	this.tasks = response.data.tasks
			 })
			 .catch(error => {
			 	console.log(error)
			 });*/
		this.getTasks();
	},
	methods: {
		// Remove and update functions are found in EditTask.vue
		getTasks() {
			/*db.collection('categories').doc(categoryId).get() 
									   .then(querySnapshot => {
									   		querySnapshot.forEach(doc => {
									   			this.tasks.push({
									   				id: doc.data().id,
									   				task: doc.data().task
									   			})
									   		})
									   })*/
			db.ref('categories/' + this.categoryId).on('value', snapshot => {
				console.log(snapshot.val())
				this.tasks = snapshot.val().tasks
			})
		},
		addTask() {
			/*this.tasks.push({
								task: this.newTaskName,
								id: this.generateId()
							})*/
			/*db.collection('categories').doc(this.categoryId).set({
				id: this.generateId(),
				task: this.newTaskName
			}).then(console.log('Success!')).catch(err => {console.log(err)})*/

			let taskId = this.generateId()

			db.ref('categories/' + this.categoryId + '/tasks/' + taskId ).set({
				id: taskId,
				task: this.newTaskName
			})	

			this.newTask = false
			this.newTaskName = ''
		},
		addTaskField() {
			this.newTask = true
		},
		generateId() {
			let d = new Date().getTime()
          	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            	let r = (d + Math.random() * 16) % 16 | 0
            	d = Math.floor(d / 16)
            	return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
         	 })
          	return uuid
		},
		deleteTask(taskId) {
			//let taskId = event.target.value
			db.ref('categories/' + this.categoryId + '/tasks/' + taskId).remove()
		},
		updateTask(task) {
			// Ovo ne radi
			db.ref('categories/' + this.categoryId + '/tasks' + task.id).set({
				id: task.id,
				task: task.task
			})
		}
	}
}
</script>