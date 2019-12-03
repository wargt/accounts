import AccountsPage from '@/pages/accounts'
import OperationDatesPage from '@/pages/operation-dates'
import EntriesPage from '@/pages/entries'

export default [
  {
    path: '/',
    component: AccountsPage,
    meta: {
      title: 'Счета'
    }
  },
  {
    path: '/operation-dates',
    component: OperationDatesPage,
    meta: {
      title: 'Операционные дни'
    }
  },
  {
    path: '/entries',
    component: EntriesPage,
    meta: {
      title: 'Операции'
    }
  },
]
