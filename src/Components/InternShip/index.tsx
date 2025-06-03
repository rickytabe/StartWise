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
        company: 'Nkwa',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPUAAADOCAMAAADR0rQ5AAAAwFBMVEUqi2z///8Agl//0AAbh2YXhmUiiWn/zwANhGIoiWqRva4nhmYnhmgug2bD29L/zQDq8/Dy+PYfiW54sJy0sj19oVPc6eVcoYkAhnExgmay0MV7sZ4Af1o8k3dpqJIvjnCnyb2bwrRPm4HP4ttjpI6LuqlSnIO9186fq0ZYll8AhHOKpU9unFgvjWmXwLHW5uCnrkLBtjXOuyzHtzTdwR/uxhOVqEtLkmO3szivsD94n1ZgmV5TlWGNpU3nxBrXviduZZeoAAAKzUlEQVR4nO2dC3uaShPH2QXWxbZya5AKiHfTJGqSnsQa2/T7f6t3ZkBF43nbnNbSJvN7nkaQRebPXHbZ5TzHMBiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRjmj0NpwLZU3Xb8VnR3uoiGnfFA6p8RrizLcn6ZUafGGgvh+wJphdL+EcMV4BzsqLDZbLb/GtnS95WUOu/2IhDeM/R3LVeDMAyNspnqwk7mGLoFZzetExv7q3AM0dH4qWyZNz3QvRfnELdPMt6ag8CFLHYkhkmi/jLVKhN9u9x2LNmNhD/Y7CtbZ0m/0xvpvVOsJqZDp5At4UaJ0PqLVeOuhDTvkvFKZ70i34to2FKoFgl9eUy1U7BpX90qNrEWnE7Sj2CJjl3d1wMhBmCTzkCH10kGebYQeTXZS9WijRqfqlYWaMqNbcVTe1t4N2XW7baVrFO4FIuDAB4ITyvZh5reTiGplZ2IbtXCjWqRqyOqdZe6A/jnUw7IqGxp6A5swfFhcXYUyt8o8wAZ+fuqDd0XYzsS3qT0hgqxXO3Yqo70U9U6JNEpKhwpyiBgjkGg/c2Bkk59su2eyA46K+l7nuhtIxB69OO+Fi15qFon+P1QqjZ8TOGu2H26PxL7OGxpT3aq8byaAGMOSy9aOt75Ae7L4EleLyhO+3pfdTouRDt0NzDE6bjAH8AWEFZyGCWZrUZYKA9y63eiyRNVwFHV4JMLsdeAVEcp1fduWlWdNDei8VbBUaVK1/ZsuA51Bk6usdxpDAZhG3UB9mYH5VT6lRsB45jh054rkpSwwqiqjgrR2IjyeaqxgvnQxJMWxn4bLmRJo93tdkdUD2sbwqrRQX8MN2IodkFvz0WylwKFam1TsfaqqssaR1KodkusYFNsP5FD1A6/HUa7xK5PNaaesX91zOSt+7XvHxmbQTDofqUq7VRjjdu0CvHOjHKK7SLO7XmlmtWpGurZdD+zoWqPNqplR4z3q91GtSFbT1Qv8E+TBvaodTrFmoZu97HOQSZZ2GCeZVnu16sayqoI99yJPXSpFPrfw2K3VW1o70B1klL40qhNDzeFDB9mhU/nKEznRaocZdXsawhvXyRVaWBb6V8ZCj8/fObaqoZCt6e6D3087vuYMVS+yMGbZtBDUj/up7adTutWDQXXh75qF8dgG42mLNkT/mGBr6g2rMmearhVRVdFR22x2ZSF2/FeaLornY5Xd14b+MSwEH6ynUlxJqJvwQN31xOR8+QhoaLa0OOqahqH0zfY32tyJwaNomEq9X/FJt2O2lUbDj5h+v2BljRxOBDzNOuDP+byqV3F2KwsBBLH1WF1VkGSWBi5Uw5TsBtWOfcA2CNK/Sgb1q8arFF9MM1ftDrTsd2mftjvGUcHT6r6fGyVD5LO9oESv4FHzbIdNXQqpyidTya5VvU/ZBO2HtHcGQwmIDm9affH5g6fj1OZbPwDgFTGmgY1yZI/N0/81+H8SX5gGIZhGIZ58ahfPCEbBMGv/UHj140QYWhdYCWdo7KD+PnG4xnBvXl9/ExVPKfaxTKK/S9z/kceRSypcvn99we+D01eFVM6PXFsgSn4bJ49V/bsagknXpufj55ozekB2u7QhLvdOVxQK3Da2eFXOqGVkfbPP/+oQZJ0/WEYJgpUb95AcHavIgTvUTVEa+nz3RZtBvhR7m2+iM/Ma2gSzILyWNEqLhs6Bk1Epb6Y27h42rPhcjYu+RWTVfT2jtJiTLFQHCJTQ9GZZOEiVNCSvrWKE2jTftZLP8qyUr8jLWX3RNrs9PH+KzXu9DJ7p3q2Oluubs5xd3W5vL45n6EO2Fh9jINrCuTl6ip4WMEXQXB207g9fwjWq/WX1QM2vFzNsPH1spAto2JatOVJnIubWHkT33xQSRMvafdGCjzdE61eopROti9F6JaXKseCR10rm3d6bW2NafJS9SaWBQYPnleXpD+1aY7f9xe4No+zhC1PJPZOdeOuAdzBrklb7swIvpqm2zCvLz6bIC3+bC4/mQ3XNC/j24brmjfxV/M+cN0YfqPxz8WlCT9R5gpkVab0NGrDBwS4nAh/iKulCYa86uJiqgoXIlr0LcMTi6hcQLCnIpcYgtAET2jKJs40wq9ZhcHjZ8nequ6lUvlDLb1IyrTIvlK127gO1G3jPAgajVUQfGpcx8vG3TKePZpXM/NbbKjGt3h9Fl98dO9iiPBzCOdL8z5+D3cEyhq0eVQX6tGc4fWcHEJci3kq+jYGuOqmMu0JiPmphkBo0fRhKpLU0kMQmo6Kt0WcgRDDZgalMMcTWkJrPCC9Thqhwc0nC3M/pjrFNwf8dCC6eZapYpZv4+vYCD6an+KAtpbmbbxqYL6vzZuLW3MZn5tXkLjrq/VjYxaAajgEqqHhtzi+u7u4b5yv1+t785KcLRdR2hWGnnppG2LLSfPJIBQTuymUGogJ2W6JseUo8p9seRTjyupHOKEIJ2STwVjkuic0ZEqeiRAMtkT/OQvfW9WSSircW5/oV1T/A1q/kOpHiFlQfXFjrkHCEnx8Zb6/uLuLg68NCHHXraqO4Y48gM9XDRfzwj3fhLjRiiQaDAHuGBFeENTaop9Oy8llVK0yejEALCsyG5KaFl0yj07IVA4BsRjKdtXg/6oarpVqLVP6jX9TDd69j7Fcfw7iO/cMFCr3TgUX/5S+pggPgitz9c1VUAMw5jc9P4R4E2fEIcr9ng0XhkED+hgCTeN88tbX4D583WNY+JrKtOwLOfXBOsx/OYxyMbJyEe4M/o+qJWTTQMpR//+rnrnu5fLBbSwhccGLAaT2XRBfoa+vzNvZxxhVG/Gj2/gMae+698svn+5L2XJBSx64IDBw8EbrdAqqwbdDf/OeHlQZCxq0pRwXC012a66kVF6UDr1US0h5B3qAIXQEYPBEyvazXP1EtaMW+A7ptKjhOEqBYkR5fRtDDS9VB2so2KaLXZNyTVAGwxKIY6xYwaNpNqiGU6X/Ah/LO2hsvi9VQ4jjW4gQ4n6KK/n+0I8wn2WrWFMyaInE8xXoAUt6RQ3v06ut/sDCoi8WWOtlhHekNLj1rBquQny/1ZlgbDlt+OvI9ng8KHIp+HgGA62HK7B3draGznizBeOOh/szRYPP9RkW5/jL18vZ+gG/OLtfB0s80TDoBGh8dX+5jMsrOnlCK+HFlRX01COV5Mqxx2I7ENXdJozC5GQ8zsrBm2135/Mu9NfKGDfbRmLQIIvWGrDZ4JmvsxSrDXt/re1rokGw+WPsRmKbv0GlTbFfORJUj+0/jDjlAkf5AVeDb7qWqr4fociEiiW7HQc/K+bSkb9z6tr2oFt6VWsMhNVun2gx6Y/mj1jXYxiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYb6P4ziv678JI8E78P828Qr0g8o3b5SazWYkGnXXbdJvwClkb1Q7r0g0otDl5OmXr9tx3r59s8N5Fd4GiVXRb8DxL181it75Grdg13lbt1knZk91uQV/6jbr1GBWv91o3uqv26rTQp4uefcO/pW3oG67Tksp+s27LST6Xd12nRan4ukKL93XVMsqvi636rbrtBz19EtX7bx1jop+0ap3og91123ZSSlUV9R+eAWqncOk/vAaVG9K2QcS/KHi87otOyWVWvZhn/8B16HkNL+xPekAAAAASUVORK5CYII=',
        industry: 'Fin-Tech ',
        location: 'Cameroon (local)',
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
          userLevel={user?.email || 'Not specified'}
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