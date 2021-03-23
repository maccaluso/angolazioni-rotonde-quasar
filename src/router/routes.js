const routes = [
  {
    path: '/mappa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Map', component: () => import('pages/Map.vue') }
    ]
  },
  {
    path: '/aree',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Areas', component: () => import('pages/CityAreas.vue') },
      { path: '/aree/:slug', name: 'Area', component: () => import('pages/CityArea.vue') },
      { path: '/aree/:slug/:venueslug', name: 'Venue', component: () => import('pages/CityVenue.vue') }
    ]
  },
  {
    path: '/percorsi-nel-verde',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Hykes', component: () => import('pages/Hykes.vue') },
      { path: '/percorsi-nel-verde/:slug', name: 'Hyke', component: () => import('pages/Hyke.vue') },
    ]
  },
  {
    path: '/indicazioni-pratiche',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Hints', component: () => import('pages/Hints.vue') }
    ]
  },
  {
    path: '/il-progetto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'About', component: () => import('pages/About.vue') }
    ]
  },
  {
    path: '/preferiti',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Favorites', component: () => import('pages/Favorites.vue') }
    ]
  },
  { path: '/', redirect: '/mappa' },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
