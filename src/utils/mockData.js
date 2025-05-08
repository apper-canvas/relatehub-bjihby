// Mock data for contacts
export const mockContacts = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    status: 'lead',
    notes: 'Met at the tech conference in June. Interested in our enterprise solution.',
    createdAt: new Date('2023-03-15').toISOString()
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    company: 'Global Tech',
    status: 'customer',
    notes: 'Current customer since February. Very satisfied with our services.',
    createdAt: new Date('2023-02-28').toISOString()
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 456-7890',
    company: 'ABC Corp',
    status: 'prospect',
    notes: 'Had a demo call on April 2nd. Considering our premium plan.',
    createdAt: new Date('2023-04-05').toISOString()
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@example.com',
    phone: '(555) 789-0123',
    company: 'Innovate LLC',
    status: 'lead',
    notes: 'Downloaded our whitepaper. Requested more information by email.',
    createdAt: new Date('2023-03-25').toISOString()
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.b@example.com',
    phone: '(555) 321-6547',
    company: 'Tech Solutions',
    status: 'customer',
    notes: 'Upgraded to premium plan last month. Looking to add more user licenses.',
    createdAt: new Date('2023-03-10').toISOString()
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.d@example.com',
    phone: '(555) 246-8109',
    company: 'Davis & Associates',
    status: 'prospect',
    notes: 'Referred by Jane Smith. Scheduled a demo for next week.',
    createdAt: new Date('2023-03-18').toISOString()
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.m@example.com',
    phone: '(555) 753-0198',
    company: 'Miller Consulting',
    status: 'churned',
    notes: 'Former customer. Canceled subscription due to budget cuts.',
    createdAt: new Date('2022-11-05').toISOString()
  }
];

// Mock data for deals
export const mockDeals = [
  {
    id: '1',
    title: 'Enterprise License',
    contactId: '1',
    contactName: 'John Doe',
    company: 'Acme Inc.',
    value: 15000,
    stage: 'discovery',
    probability: 20,
    expectedCloseDate: new Date('2023-06-30').toISOString(),
    notes: 'Need to schedule a follow-up demo with their IT team.',
    createdAt: new Date('2023-03-20').toISOString(),
    updatedAt: new Date('2023-04-01').toISOString()
  },
  {
    id: '2',
    title: 'Premium Subscription Renewal',
    contactId: '2',
    contactName: 'Jane Smith',
    company: 'Global Tech',
    value: 8000,
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: new Date('2023-05-15').toISOString(),
    notes: 'Discussing a 2-year contract with discount.',
    createdAt: new Date('2023-03-01').toISOString(),
    updatedAt: new Date('2023-04-10').toISOString()
  },
  {
    id: '3',
    title: 'Basic Plan - 10 Users',
    contactId: '3',
    contactName: 'Michael Johnson',
    company: 'ABC Corp',
    value: 5000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: new Date('2023-05-30').toISOString(),
    notes: 'Sent proposal on April 6th. Awaiting feedback.',
    createdAt: new Date('2023-04-05').toISOString(),
    updatedAt: new Date('2023-04-07').toISOString()
  },
  {
    id: '4',
    title: 'Custom Integration Project',
    contactId: '5',
    contactName: 'Robert Brown',
    company: 'Tech Solutions',
    value: 12000,
    stage: 'won',
    probability: 100,
    expectedCloseDate: new Date('2023-03-20').toISOString(),
    notes: 'Contract signed. Implementation starts next week.',
    createdAt: new Date('2023-02-15').toISOString(),
    updatedAt: new Date('2023-03-20').toISOString()
  },
  {
    id: '5',
    title: 'Starter Package',
    contactId: '4',
    contactName: 'Sarah Williams',
    company: 'Innovate LLC',
    value: 3000,
    stage: 'discovery',
    probability: 30,
    expectedCloseDate: new Date('2023-06-15').toISOString(),
    notes: 'Scheduled initial consultation for next Monday.',
    createdAt: new Date('2023-03-28').toISOString(),
    updatedAt: new Date('2023-03-28').toISOString()
  },
  {
    id: '6',
    title: 'Professional Services',
    contactId: '6',
    contactName: 'Emily Davis',
    company: 'Davis & Associates',
    value: 9500,
    stage: 'qualification',
    probability: 40,
    expectedCloseDate: new Date('2023-07-01').toISOString(),
    notes: 'Need to confirm budget availability.',
    createdAt: new Date('2023-03-25').toISOString(),
    updatedAt: new Date('2023-04-05').toISOString()
  },
  {
    id: '7',
    title: 'Enterprise Expansion',
    contactId: '1',
    contactName: 'John Doe',
    company: 'Acme Inc.',
    value: 25000,
    stage: 'qualification',
    probability: 25,
    expectedCloseDate: new Date('2023-08-30').toISOString(),
    notes: 'Expansion opportunity for international offices.',
    createdAt: new Date('2023-04-01').toISOString(),
    updatedAt: new Date('2023-04-01').toISOString()
  },
  {
    id: '8',
    title: 'API Integration License',
    contactId: '2',
    contactName: 'Jane Smith',
    company: 'Global Tech',
    value: 6500,
    stage: 'proposal',
    probability: 65,
    expectedCloseDate: new Date('2023-05-20').toISOString(),
    notes: 'Technical requirements finalized. Preparing formal proposal.',
    createdAt: new Date('2023-03-15').toISOString(),
    updatedAt: new Date('2023-04-08').toISOString()
  },
  {
    id: '9',
    title: 'Support Contract Renewal',
    contactId: '5',
    contactName: 'Robert Brown',
    company: 'Tech Solutions',
    value: 4800,
    stage: 'negotiation',
    probability: 90,
    expectedCloseDate: new Date('2023-04-30').toISOString(),
    notes: 'Discussing premium support options.',
    createdAt: new Date('2023-03-10').toISOString(),
    updatedAt: new Date('2023-04-15').toISOString()
  }
];

// Pipeline stages
export const dealStages = [
  { id: 'discovery', name: 'Discovery', color: 'bg-blue-500' },
  { id: 'qualification', name: 'Qualification', color: 'bg-purple-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-orange-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-amber-500' },
  { id: 'won', name: 'Won', color: 'bg-green-500' },
  { id: 'lost', name: 'Lost', color: 'bg-red-500' }
];