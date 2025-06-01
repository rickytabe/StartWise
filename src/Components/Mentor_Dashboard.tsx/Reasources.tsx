
import { FaPlus, FaFileAlt, FaLink } from 'react-icons/fa';

const ResourcesPage = () => {
  const resources = [
    { id: 1, title: 'JavaScript Best Practices', type: 'PDF', category: 'Frontend', date: 'Jun 1, 2023' },
    { id: 2, title: 'Node.js Security Guide', type: 'PDF', category: 'Backend', date: 'May 28, 2023' },
    { id: 3, title: 'React Design Patterns', type: 'GitHub', category: 'Frontend', date: 'May 22, 2023' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
        <p className="text-gray-600">Share learning materials with your mentees</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Shared Resources</h2>
          <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center">
            <FaPlus size={16} className="mr-2" /> Add Resource
          </button>
        </div>
        
        <div className="space-y-4">
          {resources.map(resource => (
            <div key={resource.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${
                  resource.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {resource.type === 'PDF' ? (
                    <FaFileAlt className="text-red-600" size={20} />
                  ) : (
                    <FaLink className="text-blue-600" size={20} />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-gray-800">{resource.title}</h3>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                    <span className="text-xs text-gray-500">{resource.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;