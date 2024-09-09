const conferences = [
  {
    id: 5,
    name: 'TotalMed',
    startDate: '2020-09-07 14:00:00.000',
    endDate: '2020-09-07 15:30:00.000',
    organizerEmail: 'user@totalsoft.ro',
    type: { name: 'Remote' },
    category: { name: 'Medical' },
    location: {
      id: 1,
      county: {
        id: 1,
        name: 'Bucharest'
      },
      country: {
        id: 2,
        name: 'Romania'
      },
      city: {
        id: 7,
        name: 'Bucharest'
      }
    },
    speakers: [
      {
        id: 1,
        name: 'Mark Sloan',
        isMainSpeaker: true
      }
    ],
    status: { id: '1', name: 'Joined' }
  },
  {
    id: 6,
    name: 'Introduction in React',
    startDate: '2020-09-07 16:00:00.000',
    endDate: '2020-09-07 17:00:00.000',
    organizerEmail: 'admin@totalsoft.ro',
    type: { name: 'Remote' },
    category: { name: 'IT Software' },
    location: {
      id: 2,
      county: {
        id: 3,
        name: 'Bucharest'
      },
      country: {
        id: 4,
        name: 'Romania'
      },
      city: {
        id: 7,
        name: 'Bucharest'
      }
    },
    speakers: [
      {
        id: 2,
        name: 'Robert Boghian',
        isMainSpeaker: true
      }
    ],
    status: { id: '3', name: 'Attended' }
  },
  {
    id: 1,
    name: 'Introduction in GraphQL',
    startDate: '2020-09-07 17:15:00.000',
    endDate: '2020-09-07 18:00:00.000',
    organizerEmail: 'admin@totalsoft.ro',
    type: { name: 'Remote' },
    category: { name: 'IT Software' },
    location: {
      id: 3,
      county: {
        id: 5,
        name: 'Bucharest'
      },
      country: {
        id: 6,
        name: 'Romania'
      },
      city: {
        id: 7,
        name: 'Bucharest'
      }
    },
    speakers: [
      {
        id: 2,
        name: 'Andra Sava',
        isMainSpeaker: true
      }
    ],
    status: { id: '3', name: 'Attended' }
  },
  {
    id: 2,
    name: 'Introduction in Haskell',
    startDate: '2020-09-08 09:30:00.000',
    endDate: '2020-09-07 12:00:00.000',
    type: { name: 'Remote' },
    category: { name: 'IT Software' },
    organizerEmail: 'user@totalsoft.ro',
    location: {
      id: 4,
      county: {
        id: 7,
        name: 'Bucharest'
      },
      country: {
        id: 8,
        name: 'Romania'
      },
      city: {
        id: 7,
        name: 'Bucharest'
      }
    },
    speakers: [
      {
        id: 2,
        name: 'Dragos Rosca',
        isMainSpeaker: true
      }
    ],
    status: { id: '2', name: 'Withdrawn' }
  }
]

export default conferences
