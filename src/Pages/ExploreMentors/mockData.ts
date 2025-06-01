import { Mentor } from '../../types/mock';

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    title: 'Senior Frontend Engineer at Google',
    skills: ['React', 'TypeScript', 'Next.js'],
    rating: 4.9,
    sessions: 142,
    price: 2500,
    location: 'Yaoundé, Cameroon',
    availability: 'Mon, Wed, Fri',
    isTopMentor: true,
    isNearYou: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    bio: 'Frontend specialist with 8+ years of experience building scalable web applications. I specialize in React ecosystem and performance optimization.',
    languages: ['English', 'French'],
    reviews: [
      { name: 'Samuel T.', date: '2023-05-15', rating: 5, comment: 'Alex helped me debug a complex React issue in minutes.' },
      { name: 'Fatima K.', date: '2023-04-22', rating: 5, comment: 'Best mentor ever! Practical advice for technical interviews.' }
    ],
    availabilitySlots: [
      { day: 'Mon', slots: ['10:00-12:00', '14:00-16:00'] },
      { day: 'Wed', slots: ['09:00-11:00', '15:00-17:00'] }
    ]
  },
];