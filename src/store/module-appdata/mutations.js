import { LocalStorage } from 'quasar'

export function TOGGLE_DRAWER (state) { state.drawerOpen = !state.drawerOpen }
export function CLOSE_DRAWER (state) { state.drawerOpen = false }
export function OPEN_DRAWER (state) { state.drawerOpen = true }

export function TOGGLE_FILTER (state, type) { state[type] = !state[type] }

export function SET_MAP_LOADED (state, isLoaded) { state.mapIsLoaded = isLoaded }

export function SET_APP_DATA (state, payload) { state.appData = payload }

export function SET_CURRENT_AREA (state, area) { state.currentArea = area }

export function SET_CURRENT_VENUE (state, venue) { state.currentVenue = venue }

export function SET_CURRENT_HYKE (state, hyke) { state.currentHyke = hyke }

export function SET_FAVORITES (state, favorites) { state.favorites = favorites }

export function ADD_TO_FAVORITES (state) {
  if (state.favorites) {
    state.favorites.push(state.currentVenue)
  } else {
    state.favorites = [state.currentVenue]
  }
}

export function REMOVE_FROM_FAVORITES (state) {
  state.favorites = state.favorites.filter((item) =>{
    return item.id !== state.currentVenue.id
  })
}

export function UPDATE_FAVORITES_STORAGE (state) {
  try {
    LocalStorage.set('favorites', state.favorites)
  } catch (err) {
    console.log(err)
  }
}

export function SET_NAVIGATION_DIRECTION (state, isBack) { state.isNavigatingBack = isBack }

export function SET_LANGUAGE (state, payload) {
  state.language = payload
  localStorage.setItem('lang', payload)
}
