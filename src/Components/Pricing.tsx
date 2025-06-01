import React, { useState } from 'react';
import { FaCheck, FaCrown, FaRocket, FaSeedling, FaStar, FaTimes, FaMobileAlt } from 'react-icons/fa';

// Payment response interface
interface PaymentResponse {
  status: string;
  amount: number;
  id: string;
  phoneNumber: string;
  createdAt: string;
  fee?: number;
  description?: string;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('237');

  // Pricing data based on billing cycle
  const plans = [
    {
      name: "Starter",
      icon: FaSeedling,
      price: billingCycle === 'monthly' ? 4999 : 3999,
      description: "For beginner learners or new mentors testing the platform",
      features: [
        "1 mentorship session/month",
        "Access to 1 mentor profile",
        "Access to StartWise AI Assistant",
        "Custom learning roadmap",
        "Email support (first 30 days only)"
      ],
      ctaVariant: "secondary"
    },
    {
      name: "Growth",
      icon: FaRocket,
      price: billingCycle === 'monthly' ? 15999 : 10999,
      description: "For intermediate learners and active mentors",
      features: [
        "3 sessions/month",
        "Connect with up to 3 mentors",
        "Full access to AI Assistant",
        "Custom progress tracker",
        "Priority Email Support (24/7)"
      ],
      popular: true,
      ctaVariant: "primary"
    },
    {
      name: "Pro",
      icon: FaCrown,
      price: billingCycle === 'monthly' ? 29999 : 20999,
      description: "For pro learners preparing for internships or mentors managing mentee cohorts",
      features: [
        "Unlimited sessions",
        "Access all mentor tiers",
        "AI Assistant + Internship Tracker",
        "Access to private mentor cohorts",
        "Dedicated 24/7 Support"
      ],
      ctaVariant: "dark"
    }
  ];

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentResponse(null);
    setError(null);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
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
          amount: selectedPlan.price,
          phoneNumber: phoneNumber,
          description: `StartWise ${selectedPlan.name} Plan`
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data: PaymentResponse = await res.json();
      setPaymentResponse(data);
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setPaymentResponse(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 text-white min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-500">
            Boost Your Tech Journey with StartWise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of learners and mentors growing faster with guided support
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center mb-3">
            <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-teal-300' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative rounded-full w-14 h-7 bg-gray-700 transition-colors"
            >
              <span 
                className={`absolute top-1 w-5 h-5 rounded-full bg-teal-500 transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-4 font-medium ${billingCycle === 'yearly' ? 'text-teal-300' : 'text-gray-400'}`}>
              Yearly
            </span>
          </div>
          <p className="text-sm text-teal-400 mb-8">
            Save up to 15% by paying yearly
          </p>
          
          <a 
            href="#" 
            className="inline-flex items-center text-teal-300 hover:text-teal-200 transition-colors group"
          >
            View full plan comparison
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, ) => (
            <div 
              key={plan.name}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-teal-500/50 shadow-xl shadow-teal-900/20' 
                  : 'border-gray-700'
              } transition-all hover:border-teal-400/30`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center">
                  <FaStar className="mr-2" /> Most Popular
                </div>
              )}
              
              <div className="mb-6 flex items-center">
                <plan.icon className={`w-8 h-8 mr-3 ${
                  plan.name === 'Starter' ? 'text-green-400' : 
                  plan.name === 'Growth' ? 'text-cyan-400' : 'text-yellow-400'
                }`} />
                <h2 className="text-2xl font-bold">{plan.name}</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-5xl font-bold mb-1">
                  {plan.price} XAF
                  <span className="text-lg text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </p>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.ctaVariant === 'primary' 
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg shadow-cyan-500/20' :
                  plan.ctaVariant === 'dark'
                    ? 'bg-gray-900 hover:bg-gray-800 border border-teal-500/30 hover:border-teal-400/50'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-scroll">
          <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md relative mt-15 border border-teal-500/30">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
                <button
                  onClick={closePaymentModal}
                  className="p-2 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-teal-900/20 rounded-lg border border-teal-500/30">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-teal-300">{selectedPlan.name} Plan</h3>
                    <p className="text-gray-300">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{selectedPlan.price} XAF</p>
                    <p className="text-sm text-gray-400">One-time payment</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Mobile Money Number
                  </label>
                  <div className="flex">
                    <select
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-gray-700 text-white rounded-l-lg p-3 border-r border-gray-600 focus:outline-none"
                    >
                      <option value="237">+237 (CM)</option>
                      <option value="234">+234 (NG)</option>
                      <option value="225">+225 (CI)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="6XXXXXXXX"
                      className="w-full bg-gray-700 text-white p-3 rounded-r-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      value={phoneNumber.substring(3)}
                      onChange={(e) => {
                        // Allow only numbers and limit to 9 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setPhoneNumber(phoneNumber.substring(0, 3) + value);
                      }}
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Enter your MTN or Orange mobile money number
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closePaymentModal}
                    className="px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors flex items-center ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg 
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaMobileAlt className="mr-2" /> Pay {selectedPlan.price} XAF
                      </>
                    )}
                  </button>
                </div>
              </form>

              {paymentResponse && (
                <div className="mt-6 p-4 bg-green-900/20 rounded-md border border-green-500/30">
                  <h3 className="text-lg font-medium text-green-400 mb-3">Payment Successful!</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                    <div>Payment ID:</div>
                    <div className="font-medium break-all">{paymentResponse.id}</div>
                    
                    <div>Status:</div>
                    <div className="font-medium capitalize text-green-400">{paymentResponse.status}</div>
                    
                    <div>Amount:</div>
                    <div className="font-medium">{paymentResponse.amount.toLocaleString()} XAF</div>
                    
                    <div>Fee:</div>
                    <div className="font-medium">{(paymentResponse.fee || 0).toLocaleString()} XAF</div>
                    
                    <div>Phone:</div>
                    <div className="font-medium">+{paymentResponse.phoneNumber}</div>
                    
                    <div>Date:</div>
                    <div className="font-medium">
                      {new Date(paymentResponse.createdAt).toLocaleDateString()} •{' '}
                      {new Date(paymentResponse.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-900/20 rounded-md border border-red-500/30">
                  <h3 className="text-lg font-medium text-red-400 mb-2">Payment Error</h3>
                  <p className="text-red-300">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;