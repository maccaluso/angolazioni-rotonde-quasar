export function accessToken (state) { return state.accessToken }

export function mapStyle (state) { return state.mapStyle }

export function mapIsLoaded (state) { return state.mapIsLoaded }

export function drawerOpen (state) { return state.drawerOpen }

export function placesFilter (state) { return state.placesFilter }
export function hospitalityFilter (state) { return state.hospitalityFilter }
export function shoppingFilter (state) { return state.shoppingFilter }
export function foodFilter (state) { return state.foodFilter }
export function parksFilter (state) { return state.parksFilter }
export function parkingsFilter (state) { return state.parkingsFilter }
export function servicesFilter (state) { return state.servicesFilter }

export function appData (state) { return state.appData }

export function mapMarkers (state) {
  const markers = []

  // console.log(state.appData)
  state.appData.aree.map((area) => {
    area.venues.map((venueType) => {
      if (venueType.data) {
        venueType.data.map((venue) => {
          if (typeof venue.map === 'object' && venue.map.lng && venue.map.lat) {
            markers.push({
              area: area.name,
              areaID: area.id,
              areaSlug: area.slug,
              type: venueType.title,
              ...venue
            })
          } else {
            // console.log(venue.id, venue.title)
          }
        })
      }
    })
  })

  // console.log(markers)
  return markers
}

export function area (state) {
  return (areaSlug) => {
    // console.log(areaSlug)
    return state.appData.aree.find((item) => {
      return item.slug === areaSlug
    })
  }
}

export function currentArea (state) { return state.currentArea }

export function currentVenue (state) { return state.currentVenue }

export function currentHyke (state) { return state.currentHyke }

export function favorites (state) { return state.favorites }
export function isFavorite (state) {
  if (state.favorites && state.favorites !== 'null' && state.currentVenue) {
    return state.favorites.find((item) => { return item.id === state.currentVenue.id })
  } else {
    return false
  }
}

export function isNavigatingBack (state) { return state.isNavigatingBack }

export function language (state) { return state.language }
