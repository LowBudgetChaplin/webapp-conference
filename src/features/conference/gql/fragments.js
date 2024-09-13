const { gql } = require('@apollo/client')

const Fragments = {
  conference: gql`
    fragment conference on Conference {
      id
      name
      startDate
      endDate
      organizerEmail
    }
  `,

  speaker: gql`
    fragment speaker on Speaker {
      id
      name
      isMainSpeaker
    }
  `,
  detailedSpeaker: gql`
    fragment detailedSpeaker on Speaker {
      id
      name
      nationality
      isMainSpeaker
      rating
      phoneNumber

    }
  `,

  location: gql`
    fragment location on Location {
      city {
        id
        name
      }
      county {
        id
        name
      }
      country {
        id
        name
      }
    }
  `,
  detailedLocation: gql`
    fragment detailedLocation on Location {
      id
      name
      address
      city {
        id
        name
      }
      county {
        id
        name
      }
      country {
        id
        name
      }
      latitude
      longitude
    }
  `,

  type: gql`
    fragment type on Type {
      id
      name
    }
  `,

  category: gql`
    fragment category on Category {
      id
      name
    }
  `,

  status: gql`
    fragment status on Status {
      id
      name
    }
  `
}

export default Fragments
