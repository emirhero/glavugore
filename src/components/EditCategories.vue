<template>
<div>
	<ul>
		<li v-for="category in categories">
			<router-link :to="{name: 'EditCategory', params: {categoryId: category.id}}"> {{ category.name }}</router-link>
			<span>{{ percentChoose }}</span>
			<button @click="removeCategory(category.id)">x</button>
		</li>
	</ul>
	<button @click="addNewField">Dodaj novu</button>
	<form v-if="addingNew"> 
		<input type="text" v-model:value="newCategoryName"/>
		<input type="submit" @click.prevent="addNewCategory"/>
	</form>
</div>
</template>
<script>
import axios from 'axios'
import db from './firebaseInit'

export default {
	name: 'edit-categories',
	data() {
		return {
			categories: [],
			newCategoryName: '',
			addingNew: false
		}
	},
	computed: {
		percentChoose() {
			let percent = Math.random()*100
			return percent.toFixed(2)
		}
	},
	created() {
		/*.get('http://demo2070301.mockable.io/api/categories')
			 .then(response => {
			 	this.categories = response.data.categories
			 	console.log(this.categories)
			 })
			 .catch(error => {
			 	console.log(error)
			 })*/
		this.getCategories()
		
	},
	methods: {
		getCategories() {
			/*db.collection('categories').get()
								   .then(querySnapshot => {
								   		querySnapshot.forEach((doc) => {
								   			this.categories.push({
								   				id: doc.data().id,
								   				name: doc.data().name
								   			})
								   		})
								   })
								   .catch(error => {
								   		console.log('Nešto se sjebalo.')
								   })	*/
			db.ref('/categories').on('value', (snapshot) => {
			console.log(snapshot.val())
			for (var i = Object.keys(snapshot.val()).length - 1; i >= 0; i--) {
				this.categories.push({
					name: Object.values(snapshot.val())[i].name,
					id: Object.keys(snapshot.val())[i]
				})
			}
			console.log(this.categories)
		})

		},
		addNewField() {
			this.addingNew = true
		},
		addNewCategory() {
			/*this.categories.push({
				id: this.generateId(),
				name: this.newCategoryName
			})*/

			/*db.collection('categories').add({
				id: this.generateId(),
				name: this.newCategoryName
			})*/

			db.ref('categories/' + this.generateId()).set({
				name: this.newCategoryName
			})

			this.newCategoryName = ''
			this.addingNew = false
			this.categories = []
			this.getCategories()
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
		removeCategory(id) {
			console.log(id)
			db.ref('categories/' + id).remove()
		}
	}
}
</script>