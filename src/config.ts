/* eslint-disable */

const ML_BEST_OF = 'ml_best_of';
const ML_EVENTS = 'ml_events';
const ML_DONORS = 'ml_donors';

export const MailingLists = [
  {
    key: ML_BEST_OF,
    name: 'Best of the Archive',
    interest_id: 'e7594f8604',
    selected_by_default: true,
    public: true,
    short_desc:
      'Useful resources, unique stories, and fun finds from our collections',
  },
  {
    key: ML_EVENTS,
    name: 'Event Notices',
    interest_id: '98cc7bf635',
    selected_by_default: false,
    public: true,
    short_desc: 'Invitations to and news about our events',
  },
  {
    key: ML_DONORS,
    name: 'Donor Communications',
    interest_id: 'ff44b81002',
    selected_by_default: false,
    public: true,
    short_desc: 'Information about how your donations are being used.',
  },
];
