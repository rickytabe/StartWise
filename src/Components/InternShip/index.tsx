// Pages/Internship/index.tsx
import  { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Button from '../shared/Button';
import LoadingScreen from '../shared/LoadingScreen';
import InternshipCard from './InternshipCard';
import { Internship } from './types';
import HeroSection from './HeroSection';
import FiltersSection from './FilterSection';
import CameroonFocus from './CameroonFocus';
import ApplicationTips from './ApplicationTips';

const InternshipPage = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: 'all' as 'all' | 'beginner' | 'intermediate' | 'pro',
    location: 'all' as 'all' | 'cameroon' | 'international',
  });
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const mockInternships: Internship[] = [
      {
        id: '1',
        company: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png',
        industry: 'Technology',
        location: 'Global (Remote)',
        roles: ['Software Engineering', 'Product Management', 'UX Design'],
        level: 'pro',
        duration: '3-6 months',
        applicationDeadline: '2023-12-15',
        description: 'Join Google for an immersive internship experience working on cutting-edge technology projects.',
        requirements: ['Strong programming skills', 'Experience with algorithms', 'Currently pursuing a degree'],
        isFeatured: true
      },
      {
        id: '2',
        company: 'MTN Cameroon',
        logo: 'https://i.pinimg.com/736x/7f/eb/02/7feb0256dc66ee941c1a5d4c945ed60b.jpg',
        industry: 'Telecommunications',
        location: 'Yaoundé, Cameroon',
        roles: ['Network Engineering', 'Data Analysis', 'Marketing'],
        level: 'intermediate',
        duration: '4 months',
        applicationDeadline: '2023-11-30',
        description: 'Gain practical experience in the telecommunications industry with Cameroon\'s leading mobile operator.',
        requirements: ['IT or Engineering background', 'Good communication skills', 'Problem-solving abilities'],
        isFeatured: true
      },
      {
        id: '3',
        company: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png',
        industry: 'E-commerce & Cloud',
        location: 'Global (Remote)',
        roles: ['Cloud Solutions', 'Machine Learning', 'Software Development'],
        level: 'pro',
        duration: '3-6 months',
        applicationDeadline: '2023-12-10',
        description: 'Work on real-world projects at Amazon with mentorship from industry experts.',
        requirements: ['Programming experience', 'Cloud knowledge (AWS preferred)', 'Academic excellence'],
        isFeatured: true
      },
      {
        id: '4',
        company: 'Camtel',
        logo: 'https://camtel.cm/wp-content/uploads/2021/04/logo-camtel-1.png',
        industry: 'Telecommunications',
        location: 'Douala, Cameroon',
        roles: ['Telecom Engineering', 'Customer Support', 'IT Infrastructure'],
        level: 'intermediate',
        duration: '3 months',
        applicationDeadline: '2023-11-25',
        description: 'Join Cameroon\'s national telecommunications company for a hands-on internship experience.',
        requirements: ['Engineering or IT background', 'Technical aptitude', 'Teamwork skills'],
        isFeatured: false
      },
      {
        id: '5',
        company: 'Microsoft',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png',
        industry: 'Technology',
        location: 'Global (Remote)',
        roles: ['Software Engineering', 'Data Science', 'Product Design'],
        level: 'pro',
        duration: '3 months',
        applicationDeadline: '2023-12-05',
        description: 'Microsoft internships provide an opportunity to work on meaningful projects with impact.',
        requirements: ['Strong technical skills', 'Innovative thinking', 'Currently enrolled in university'],
        isFeatured: true
      },
      {
        id: '6',
        company: 'Orange Cameroon',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Orange_logo.svg/800px-Orange_logo.svg.png',
        industry: 'Telecommunications',
        location: 'Yaoundé, Cameroon',
        roles: ['Mobile Development', 'Digital Marketing', 'Network Operations'],
        level: 'intermediate',
        duration: '4 months',
        applicationDeadline: '2023-11-28',
        description: 'Gain experience in the fast-paced telecom industry with Orange Cameroon.',
        requirements: ['Technical or business background', 'Adaptability', 'Customer focus'],
        isFeatured: false
      },
      {
        id: '7',
        company: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
        industry: 'Technology',
        location: 'Global (Remote)',
        roles: ['iOS Development', 'Hardware Engineering', 'UI/UX Design'],
        level: 'pro',
        duration: '3-6 months',
        applicationDeadline: '2023-12-12',
        description: 'Apple internships offer the opportunity to contribute to products that delight millions.',
        requirements: ['Exceptional technical skills', 'Creative mindset', 'Academic excellence'],
        isFeatured: true
      },
      {
        id: '8',
        company: 'Afriland First Bank',
        logo: 'https://www.afrilandfirstbank.com/images/logo.png',
        industry: 'Banking & Finance',
        location: 'Douala, Cameroon',
        roles: ['Financial Analysis', 'IT Banking Solutions', 'Customer Relations'],
        level: 'intermediate',
        duration: '3 months',
        applicationDeadline: '2023-11-20',
        description: 'Learn about banking operations at one of Cameroon\'s leading financial institutions.',
        requirements: ['Finance or IT background', 'Analytical skills', 'Professional demeanor'],
        isFeatured: false
      },
      {
        id: '9',
        company: 'Facebook (Meta)',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png',
        industry: 'Technology',
        location: 'Global (Remote)',
        roles: ['Frontend Development', 'Data Engineering', 'AR/VR Development'],
        level: 'pro',
        duration: '3-6 months',
        applicationDeadline: '2023-12-08',
        description: 'Work on projects that connect billions of people around the world at Meta.',
        requirements: ['Strong programming skills', 'Experience with web technologies', 'Innovative thinking'],
        isFeatured: true
      },
      {
        id: '10',
        company: 'CBC Health Services',
        logo: 'https://www.cbchealthservices.org/wp-content/uploads/2020/10/CBC-Logo.png',
        industry: 'Healthcare',
        location: 'Bamenda, Cameroon',
        roles: ['Health Informatics', 'Public Health', 'Medical Technology'],
        level: 'beginner',
        duration: '3 months',
        applicationDeadline: '2023-11-22',
        description: 'Contribute to healthcare innovation at one of Cameroon\'s leading health organizations.',
        requirements: ['Health sciences background', 'Technical aptitude', 'Passion for healthcare'],
        isFeatured: false
      },
      {
        id: '11',
        company: 'Netflix',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/800px-Netflix_2015_logo.svg.png',
        industry: 'Entertainment',
        location: 'Global (Remote)',
        roles: ['Content Analysis', 'Software Engineering', 'Data Science'],
        level: 'pro',
        duration: '3 months',
        applicationDeadline: '2023-12-07',
        description: 'Help shape the future of entertainment through technology at Netflix.',
        requirements: ['Technical expertise', 'Creative problem-solving', 'Passion for entertainment'],
        isFeatured: true
      },
      {
        id: '12',
        company: 'Ringier Cameroon',
        logo: 'https://www.ringier.com/sites/default/files/2020-03/ringier-logo.svg',
        industry: 'Media & Publishing',
        location: 'Douala, Cameroon',
        roles: ['Digital Journalism', 'Content Creation', 'Digital Marketing'],
        level: 'beginner',
        duration: '3 months',
        applicationDeadline: '2023-11-18',
        description: 'Gain experience in digital media at one of Cameroon\'s leading publishing companies.',
        requirements: ['Communication or journalism background', 'Writing skills', 'Digital literacy'],
        isFeatured: false
      },
    ];

    setTimeout(() => {
      setInternships(mockInternships);
      setFilteredInternships(mockInternships);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...internships];
    
    if (searchTerm) {
      result = result.filter(internship => 
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        internship.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.level !== 'all') {
      result = result.filter(internship => internship.level === filters.level);
    }
    
    if (filters.location !== 'all') {
      if (filters.location === 'cameroon') {
        result = result.filter(internship => internship.location.includes('Cameroon'));
      } else {
        result = result.filter(internship => !internship.location.includes('Cameroon'));
      }
    }
    
    if (activeCategory !== 'all') {
      result = result.filter(internship => internship.industry === activeCategory);
    }
    
    setFilteredInternships(result);
  }, [searchTerm, filters, activeCategory, internships]);

  const industries = Array.from(new Set(internships.map(i => i.industry)));

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FiltersSection 
          filters={filters}
          setFilters={setFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          industries={industries}
          filteredCount={filteredInternships.length}
          totalCount={internships.length}
          userLevel={user?.role?.createdAt || 'Not specified'}
        />
        
        {filteredInternships.filter(i => i.isFeatured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaStar className="text-yellow-500 mr-2" /> Featured Internships
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships
                .filter(i => i.isFeatured)
                .map(internship => (
                  <InternshipCard 
                    key={internship.id} 
                    internship={internship} 
                  />
                ))}
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold mb-6">All Opportunities</h2>
          
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map(internship => (
                <InternshipCard 
                  key={internship.id} 
                  internship={internship} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-4">No internships match your filters</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or resetting your filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ level: 'all', location: 'all' });
                  setActiveCategory('all');
                }}
                variant="primary"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
        
        <CameroonFocus />
        <ApplicationTips />
      </div>
    </div>
  );
};

export default InternshipPage;