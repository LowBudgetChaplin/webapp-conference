import { append, modify, modifyPath, remove } from 'ramda'
import { emptyString, emptyArray } from 'utils/constants'

export const initialConference = {
  name: emptyString,
  startDate: null,
  endDate: null,
  location: {
    name: emptyString,
    address: emptyString,
    country: null,
    county: null,
    city: null,
    latitude: emptyString,
    longitude: emptyString
  },
  speakers: emptyArray,
  type: null,
  category: null,
  deletedSpeakers: emptyArray
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
    case 'startDate':
    case 'endDate':
    case 'type':
    case 'category':
      return { ...state, [action.type]: action.payload }
    case 'locationName':
      return { ...state, location: { ...state.location, name: action.payload } }
    case 'address':
    case 'country':
    case 'county':
    case 'city':
    case 'latitude':
    case 'longitude':
      return { ...state, location: { ...state.location, [action.type]: action.payload } }
    case 'addSpeaker': {
      const minSpeakerId = Math.min(...state.speakers.map(speaker => speaker.id), 0)
      return modify(
        'speakers',
        append({ id: minSpeakerId - 1, name: emptyString, nationality: emptyString, rating: emptyString, isMainSpeaker: false }),
        state
      )
    }
    case 'speakerName':
      return modifyPath(['speakers', action.index, 'name'], () => action.payload, state)
    case 'nationality':
    case 'rating':
    case 'isMainSpeaker':
      return modifyPath(['speakers', action.index, action.type], () => action.payload, state)
    case 'deleteSpeaker':
      return {
        ...state,
        speakers: remove(action.index, 1, state.speakers),
        deletedSpeakers:
          state.speakers[action.index].id > 0 ? [...state.deletedSpeakers, state.speakers[action.index].id] : state.deletedSpeakers
      }
    case 'resetData':
      return { deletedSpeakers: emptyArray, ...action.payload }
    default:
      return state
  }
}
