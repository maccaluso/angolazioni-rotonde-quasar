import axios from 'axios'

export function getAppData ({}, payload) {
  return axios.get('https://angolazionirotonde.it/wp-json/app-data/all?lang=' + payload)
}

export function setContentFromRoute ({ state, commit }, params) {
  if (params.slug) {
    state.appData.aree.map((item) => {
      if (item.slug === params.slug) {
        commit('SET_CURRENT_AREA', item)
      }
    })

    state.appData.percorsi.map((item) => {
      if (item.slug === params.slug) {
        commit('SET_CURRENT_HYKE', item)
      }
    })
  }

  if (params.venueslug) {
    let type

    state.currentArea.venues.map((item) => {
      if (item.data) {
        type = item.title
        item.data.map((subitem) => {
          if (subitem.slug === params.venueslug) {
            commit('SET_CURRENT_VENUE', { ...subitem, type})
          }
        })
      }
    })
  }
}