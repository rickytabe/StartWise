import React, { useState, useEffect } from 'react';
import { FaCheck, FaCrown, FaRocket, FaSeedling, FaStar, FaTimes, FaMobileAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';

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
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'cancelled'>('idle');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('237');
  const [operator, setOperator] = useState<string>('MTN');
  
  // Falling flowers for success modal
  const [flowers, setFlowers] = useState<{id: number, style: React.CSSProperties}[]>([]);

  useEffect(() => {
    if (paymentStatus === 'success') {
      // Create 30 falling flowers with random positions
      const newFlowers = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${Math.floor(Math.random() * 20) + 10}px`,
          opacity: Math.random() * 0.5 + 0.3
        }
      }));
      setFlowers(newFlowers);
    }
  }, [paymentStatus]);

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
    setPaymentStatus('idle');
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
      
      // Handle different payment statuses
      if (data.status === 'success') {
        setPaymentStatus('success');
      } else if (data.status === 'pending') {
        setPaymentStatus('pending');
      } else if (data.status === 'cancelled') {
        setPaymentStatus('cancelled');
      } else {
        throw new Error('Payment failed with unknown status');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setPaymentStatus('cancelled');
    } finally {
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  const closeModals = () => {
    setShowPaymentModal(false);
    setPaymentStatus('idle');
    setSelectedPlan(null);
    setPaymentResponse(null);
    setOperator('MTN');
    setPhoneNumber('237');
  };

  // Payment Status Components
  const PendingPayment = () => (
    <div className="relative bg-blue-600 rounded-2xl shadow-xl w-full max-w-md border border-blue-500/30 mt-40">
      <div className="p-8 text-center">
        <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaClock className="text-5xl text-blue-300" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Pending Confirmation</h2>
        <p className="text-gray-200 mb-6">
          Please check your phone for a withdrawal request of <span className="font-bold">{selectedPlan?.price} XAF</span>.
          Confirm the payment to complete your subscription.
        </p>
        
        <div className="bg-blue-700/50 rounded-lg p-4 mb-6 text-left">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-300">Plan:</div>
            <div className="font-medium text-white">{selectedPlan?.name}</div>
            
            <div className="text-gray-300">Amount:</div>
            <div className="font-medium text-white">{selectedPlan?.price} XAF</div>
            
            <div className="text-gray-300">Operator:</div>
            <div className="font-medium text-white">{operator}</div>
            
            <div className="text-gray-300">Phone:</div>
            <div className="font-medium text-white">+{phoneNumber}</div>
          </div>
        </div>
        
        <button
          onClick={closeModals}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  const CancelledPayment = () => (
    <div className="relative bg-red-600 rounded-2xl shadow-xl w-full max-w-md border border-red-500/30 mt-40">
      <div className="p-8 text-center">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTimes className="text-5xl text-red-300" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h2>
        <p className="text-gray-200 mb-6">
          The payment for <span className="font-bold">{selectedPlan?.name}</span> plan was cancelled.
          Please try again if you wish to complete your subscription.
        </p>
        
        {error && (
          <div className="mt-6 p-4 bg-red-700/50 rounded-md border border-red-500/30">
            <p className="text-red-200">{error}</p>
          </div>
        )}
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={closeModals}
            className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Pricing
          </button>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 min-h-screen py-16 px-4">
      {/* Flower animation styles */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .falling-flower {
          position: fixed;
          top: 0;
          z-index: 100;
          animation: fall 5s linear forwards;
          pointer-events: none;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Start Your Tech Journey with StartWise
          </h1>
          <p className="text-xl text-blue-500 max-w-3xl mx-auto mb-8">
            Join thousands of learners and mentors growing faster with guided support
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center mb-3">
            <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative rounded-full w-14 h-7 bg-gray-200 transition-colors"
            >
              <span 
                className={`absolute top-1 w-5 h-5 rounded-full bg-blue-600 transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-4 font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-400'}`}>
              Yearly
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-8">
            Save up to 15% by paying yearly
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white border rounded-2xl p-8 shadow-lg ${
                plan.popular 
                  ? 'border-blue-300 shadow-blue-200' 
                  : 'border-gray-200'
              } transition-all hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center">
                  <FaStar className="mr-2" /> Most Popular
                </div>
              )}
              
              <div className="mb-6 flex items-center">
                <plan.icon className={`w-8 h-8 mr-3 ${
                  plan.name === 'Starter' ? 'text-green-500' : 
                  plan.name === 'Growth' ? 'text-cyan-500' : 'text-yellow-500'
                }`} />
                <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-5xl font-bold text-gray-800 mb-1">
                  {plan.price} XAF
                  <span className="text-lg text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </p>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.ctaVariant === 'primary' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-blue-200' :
                  plan.ctaVariant === 'dark'
                    ? 'bg-gray-900 text-white hover:bg-black'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-scroll">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative mt-40 border border-blue-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
                <button
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{selectedPlan.name} Plan</h3>
                    <p className="text-gray-600">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{selectedPlan.price} XAF</p>
                    <p className="text-sm text-gray-500">One-time payment</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Telecom Operator
                  </label>
                  <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="MTN">MTN</option>
                    <option value="Orange">Orange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Mobile Money Number
                  </label>
                  <div className="flex">
                    <select
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-white border border-gray-300 text-gray-800 rounded-l-lg p-3 border-r border-gray-300 focus:outline-none"
                    >
                      <option value="237">+237 (CM)</option>
                      <option value="234">+234 (NG)</option>
                      <option value="225">+225 (CI)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="6XXXXXXXX"
                      className="w-full bg-white border-t border-b border-r border-gray-300 text-gray-800 p-3 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={phoneNumber.substring(3)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setPhoneNumber(phoneNumber.substring(0, 3) + value);
                      }}
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your {operator} mobile money number
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center ${
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

              {error && (
                <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-200">
                  <h3 className="text-lg font-medium text-red-600 mb-2">Payment Error</h3>
                  <p className="text-red-500">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Status Modals */}
      {paymentStatus === 'pending' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <PendingPayment />
        </div>
      )}

      {paymentStatus === 'cancelled' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <CancelledPayment />
        </div>
      )}

      {/* Success Modal */}
      {paymentStatus === 'success' && paymentResponse && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Falling flowers */}
          {flowers.map(flower => (
            <div 
              key={flower.id} 
              className="falling-flower text-pink-400"
              style={flower.style}
            >
              {flower.id % 3 === 0 ? '🌸' : flower.id % 3 === 1 ? '🌺' : '🌷'}
            </div>
          ))}

          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl w-full max-w-md border border-blue-500/30 z-10">
            <div className="p-8 text-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-5xl text-green-300" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-blue-100 mb-6">
                Thank you for subscribing to the {selectedPlan?.name} plan. 
                Your payment of {selectedPlan?.price} XAF was successful.
              </p>
              
              <div className="bg-blue-700/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-lg font-medium text-green-300 mb-3">Transaction Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-blue-200">Plan:</div>
                  <div className="font-medium text-white">{selectedPlan?.name}</div>
                  
                  <div className="text-blue-200">Amount:</div>
                  <div className="font-medium text-white">{paymentResponse.amount.toLocaleString()} XAF</div>
                  
                  <div className="text-blue-200">Transaction ID:</div>
                  <div className="font-medium text-white break-all">{paymentResponse.id}</div>
                  
                  <div className="text-blue-200">Operator:</div>
                  <div className="font-medium text-white">{operator}</div>
                  
                  <div className="text-blue-200">Phone:</div>
                  <div className="font-medium text-white">+{paymentResponse.phoneNumber}</div>
                  
                  <div className="text-blue-200">Date:</div>
                  <div className="font-medium text-white">
                    {new Date(paymentResponse.createdAt).toLocaleDateString()} •{' '}
                    {new Date(paymentResponse.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeModals}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors border border-blue-400"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;