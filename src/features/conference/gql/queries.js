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