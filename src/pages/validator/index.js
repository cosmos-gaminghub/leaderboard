import ValidatorList from '@/pages/validator/Index.vue'
import ValidatorDetail from '@/pages/validator/Detail.vue'

export default [
  {
    path: '/',
    component: ValidatorList,
    name: 'validator.index',
  },
  {
    path: '/detail/:id',
    component: ValidatorDetail,
    name: 'validator.detail',
  },
]
