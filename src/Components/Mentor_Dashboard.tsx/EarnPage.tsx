

const EarningsPage = () => {
  // Mock data
  const earnings = [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1800 },
    { month: 'Mar', earnings: 1500 },
    { month: 'Apr', earnings: 2200 },
    { month: 'May', earnings: 2000 },
    { month: 'Jun', earnings: 2500 },
  ];

  const transactions = [
    { id: 1, date: 'Jun 10, 2023', amount: 120, mentee: 'Alex Johnson', status: 'Completed' },
    { id: 2, date: 'Jun 5, 2023', amount: 80, mentee: 'Samira Khan', status: 'Completed' },
    { id: 3, date: 'Jun 2, 2023', amount: 100, mentee: 'Michael Chen', status: 'Pending' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
        <p className="text-gray-600">Track your mentorship earnings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings Overview</h2>
          <div className="flex items-end h-48">
            {earnings.map((item, _index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center px-2">
                <div className="text-xs text-gray-500 mb-1">{item.month}</div>
                <div 
                  className="w-3/4 bg-blue-500 rounded-t-lg"
                  style={{ height: `${item.earnings / 25}px` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Total Balance</h2>
          <div className="flex items-center">
            <span className="text-3xl font-bold ml-2"><span>XAF</span> 40,000</span>
          </div>
          <button className="w-full bg-black text-white rounded-lg py-2.5 mt-4 font-medium">
            Withdraw
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-3">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Mentee</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.mentee}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">${transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;