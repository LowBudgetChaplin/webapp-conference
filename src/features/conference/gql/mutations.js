import { gql } from '@apollo/client'
import Fragments from './fragments'

export const UPDATE_CONFERENCE = gql`
  mutation saveConference($input: ConferenceInput!) {
    saveConference(input: $input) {
      ...conference
      type {
        ...type
      }
      category {
        ...category
      }
      location {
        ...detailedLocation
      }
      speakers {
        ...detailedSpeaker
      }
    }
  }

  ${Fragments.conference}
  ${Fragments.type}
  ${Fragments.category}
  ${Fragments.detailedLocation}
  ${Fragments.detailedSpeaker}
`

export const CHANGE_ATTENDANCE_STATUS_MUTATION = gql`
  mutation changeAttendanceStatus($input: AttendanceInput!) {
    changeAttendanceStatus(input: $input)
  }
`
