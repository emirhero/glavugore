<template>
<div>
<h1>ČIK POGODI</h1>
<div class="gallery">
	<!--ul-->
			<scoreboard></scoreboard>
			<div v-if="loading">Loading...</div>
			<router-link v-if="!loading" v-for="(category, key) in categories" link :to="{name: 'Reader', params: { category: category.id }}" :key="key"><button class="gallery-item"> {{ category.name | capitalize }}</button></router-link>

	<!--/ul-->
</div>
</div>
</template>
<script>
import axios from 'axios'
import db from './firebaseInit.js'
import Scoreboard from '@/components/scoreboard'

export default {
	data() {
		return {
			categories: [],
			loading: true
		}
	},
	filters: {
		capitalize(value) {
			if(!value) return ''
			value = value.toString()
			return value.toUpperCase()
		}
	},
	created() {
		/*axios.get('http://demo2070301.mockable.io/api/categories')
			 .then(response => {
			 	this.categories = response.data.categories
			 })
			 .catch(error => {
			 	console.log(error)
			 })*/
		db.ref('/categories').once('value').then(snapshot => {
			console.log(snapshot.val())
			for (var i = Object.keys(snapshot.val()).length - 1; i >= 0; i--) {
				this.categories.push({
					name: Object.values(snapshot.val())[i].name,
					id: Object.keys(snapshot.val())[i]
				})
			}
			this.loading = false
		})

	},
	components: {
		'scoreboard': Scoreboard
	}
}
</script>
<style scoped>
.gallery {
}
.gallery-item {
	display: block;
	width: 90%;
	padding: 1em;
	margin: 1em auto ;
	background-color: #FF6B6B;
	border: none;
	color: inherit;
	font-weight: bold;
}
</style>