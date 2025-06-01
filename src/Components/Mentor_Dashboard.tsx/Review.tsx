
import { FaStar } from 'react-icons/fa';

const ReviewsPage = () => {
  const reviews = [
    { id: 1, name: 'Alex Johnson', rating: 5, comment: 'Amazing mentor! Explained complex topics in a simple way.', date: 'Jun 5, 2023' },
    { id: 2, name: 'Samira Khan', rating: 5, comment: 'Very patient and knowledgeable. Highly recommend!', date: 'Jun 3, 2023' },
    { id: 3, name: 'Michael Chen', rating: 4, comment: 'Great insights on design systems. Learned a lot in one session.', date: 'May 28, 2023' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        <p className="text-gray-600">Feedback from your mentees</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Mentee Reviews</h2>
          <div className="flex items-center">
            <FaStar className="text-amber-400 fill-amber-400" size={20} />
            <span className="text-lg font-bold ml-1">4.8</span>
            <span className="text-gray-500 ml-1">/5.0</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  <h3 className="font-medium text-gray-800 ml-2">{review.name}</h3>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      size={14} 
                      className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} ml-0.5`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;