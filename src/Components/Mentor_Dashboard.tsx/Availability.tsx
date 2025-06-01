// src/components/AvailabilityPage.jsx
import  { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00 ${i < 4 ? 'AM' : 'PM'}`);

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => ({
      ...prev,
      [`${day}-${time}`]: !prev[`${day}-${time}`]
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Availability</h1>
        <p className="text-gray-600">Set your available time slots</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Set Your Weekly Availability</h2>
          <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center">
            <FaDownload size={16} className="mr-2" /> Sync with Google Calendar
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-16 py-2 text-xs text-gray-500 font-medium">Time</th>
                {days.map(day => (
                  <th key={day} className="py-2 text-xs text-gray-500 font-medium">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="border-t border-gray-200">
                  <td className="py-2 text-xs text-gray-500">{time}</td>
                  {days.map(day => {
                    const slotKey = `${day}-${time}`;
                    const isAvailable = availability[slotKey];
                    return (
                      <td key={day} className="py-2 px-1">
                        <button
                          onClick={() => toggleSlot(day, time)}
                          className={`w-full h-8 rounded-lg ${
                            isAvailable 
                              ? 'bg-black text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {isAvailable ? '✓' : ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;