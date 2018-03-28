import Vue from 'vue'
import Router from 'vue-router'
import Reader from '@/components/Reader'
import Gallery from '@/components/Gallery'
import EditCategories from '@/components/EditCategories'
import EditCategory from '@/components/EditCategory'
import League from '@/components/League'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
  		name: 'Gallery',
  		component: Gallery
  	},
    {
      path: '/reader/:category',
      props: true,
      name: 'Reader',
      component: Reader
    },
    {
    	path :'/categories/',
    	name: 'EditCategories',
    	component: EditCategories
    },
    {
    	path: '/categories/:categoryId',
    	props: true,
    	name: 'EditCategory',
    	component: EditCategory
    },
    {
      path: '/league',
      name: 'League',
      component: League
    }
  ]
})
