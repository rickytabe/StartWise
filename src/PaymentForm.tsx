import React, { useState } from 'react';

interface PaymentResponse {
  status: string;
  amount: number;
  id: string;
  phoneNumber: string;
  createdAt: string;
}

const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [phoneNumber, setPhoneNumber] = useState<string>('237');
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.pay.mynkwa.com/collect', {
        method: 'POST',
        headers: {
          'X-API-Key': import.meta.env.VITE_APP_NKWA_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          phoneNumber,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data: PaymentResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Nkwa Payment Gateway</h1>
          <p className="mt-2 text-sm text-gray-600">Secure mobile money payments</p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Payment Collection</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (XAF)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">XAF</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                  required
                  min="100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-l-md"
                    value={phoneNumber.substring(0, 3)}
                    onChange={(e) => setPhoneNumber(e.target.value + phoneNumber.substring(3))}
                  >
                    <option value="237">+237 (CM)</option>
                    <option value="234">+234 (NG)</option>
                    <option value="225">+225 (CI)</option>
                  </select>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber.substring(3)}
                  onChange={(e) => setPhoneNumber(phoneNumber.substring(0, 3) + e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-24 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="650000000"
                  required
                  pattern="[0-9]{9}"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Format: 650000000 (without country code)</p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Pay Now'}
              </button>
            </div>
          </form>

          {response && (
            <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-3">Payment Successful!</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Payment ID:</div>
                <div className="font-medium">{response.id}</div>
                
                <div className="text-gray-600">Status:</div>
                <div className="font-medium capitalize">{response.status}</div>
                
                <div className="text-gray-600">Amount:</div>
                <div className="font-medium">{response.amount.toLocaleString()} XAF</div>
                
                <div className="text-gray-600">Phone:</div>
                <div className="font-medium">+{response.phoneNumber}</div>
                
                <div className="text-gray-600">Date:</div>
                <div className="font-medium">{new Date(response.createdAt).toLocaleString()}</div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-100">
              <h3 className="text-lg font-medium text-red-800 mb-2">Payment Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;