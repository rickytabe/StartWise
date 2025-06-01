export interface Mentor {
    id: string;
    name: string;
    title: string;
    skills: string[];
    rating: number;
    sessions: number;
    price: number;
    location: string;
    availability: string;
    isTopMentor?: boolean;
    isNearYou?: boolean;
    profileImage: string;
    bio?: string;
    languages?: string[];
    reviews?: {
      name: string;
      date: string;
      rating: number;
      comment: string;
    }[];
    availabilitySlots?: {
      day: string;
      slots: string[];
    }[];
  }