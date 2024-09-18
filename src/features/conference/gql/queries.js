import { gql } from '@apollo/client'
import Fragments from './fragments'

export const CONFERENCE_LIST_QUERY = gql`
  query ConferenceList($filters: ConferenceFilterInput, $userEmail: String!) {
    conferenceList(filters: $filters, userEmail: $userEmail) {
      ...conference
      speakers {
        ...speaker
      }
      location {
        ...location
      }
      type {
        ...type
      }
      category {
        ...category
      }
      status(userEmail: $userEmail) {
        ...status
      }
    }
  }
  ${Fragments.conference}
  ${Fragments.speaker}
  ${Fragments.location}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.status}
`

export const CONFERENCE_QUERY = gql`
  query conference($id: Int!, $isNew: Boolean!) {
    conference(id: $id) @skip(if: $isNew) {
      ...conference
      speakers {
        ...detailedSpeaker
      }
      location {
        ...detailedLocation
      }
      type {
        ...type
      }
      category {
        ...category
      }
    }
    typeList {
      ...type
    }
    categoryList {
      ...category
    }
    cityList {
      id
      name
    }
    countryList {
      id
      name
    }
    countyList {
      id
      name
    }
  }
  ${Fragments.conference}
  ${Fragments.detailedSpeaker}
  ${Fragments.detailedLocation}
  ${Fragments.type}
  ${Fragments.category}
`

export const USER_CONFERENCE_LIST_QUERY = gql`
  query UserConferenceList($userEmail: String!) {
    conferenceList(filters: { status: "Joined" }, userEmail: $userEmail) {
      ...conference
      speakers {
        ...speaker
      }
      location {
        ...location
      }
      type {
        ...type
      }
      category {
        ...category
      }
      status(userEmail: $userEmail) {
        ...status
      }
    }
  }
  ${Fragments.conference}
  ${Fragments.speaker}
  ${Fragments.location}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.status}
`
