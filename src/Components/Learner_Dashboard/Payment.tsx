import React, { useState, useEffect } from 'react';
import { FaPaypal, FaCreditCard, FaMobileAlt, FaPlus, FaCoins, FaWallet, FaTimes } from 'react-icons/fa';

// Types
interface PaymentMethodData {
  type: 'mobile' | 'card' | 'paypal';
  provider: string;
  accountDetails: string;
}

interface AddPaymentMethodModalProps {
  onClose: () => void;
  onAddMethod: (method: PaymentMethodData) => void;
  isVisible: boolean;
}

interface PaymentResponse {
  amount: number;
  createdAt: string;
  currency: string;
  description: string;
  fee: number;
  id: string;
  merchantId: number;
  paymentType: string;
  phoneNumber: string;
  status: string;
  telecomOperator: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  amount: number;
  phone: string;
  date: Date;
  provider: string;
  status: string;
  type: 'collection' | 'payout';
  fee?: number;
}

interface Stats {
  availableBalance: number;
  pendingPayouts: number;
  totalSpent: number;
}

// Add Payment Method Modal Component
const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ 
  onClose, 
  onAddMethod,
  isVisible
}) => {
  const [formData, setFormData] = useState<PaymentMethodData>({
    type: 'mobile',
    provider: '',
    accountDetails: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mobileProviders = ['MTN MOMO Cameroon', 'Orange Money', 'Express Union'];
  const cardProviders = ['Visa', 'MasterCard', 'American Express'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.provider) {
      newErrors.provider = 'Provider is required';
    }
    
    if (!formData.accountDetails) {
      newErrors.accountDetails = 'Account details are required';
    } else if (formData.type === 'mobile' && !/^6\d{8}$/.test(formData.accountDetails)) {
      newErrors.accountDetails = 'Invalid Cameroon mobile number (6xxxxxxxx)';
    } else if (formData.type === 'card' && !/^\d{16}$/.test(formData.accountDetails)) {
      newErrors.accountDetails = 'Invalid card number (16 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddMethod({
        ...formData,
        accountDetails: formData.type === 'card' 
          ? `•••• ${formData.accountDetails.slice(-4)}`
          : formData.accountDetails
      });
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add Payment Method</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'mobile' })}
                  className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                    formData.type === 'mobile' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <FaMobileAlt className="w-6 h-6 mb-2 text-blue-500" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'card' })}
                  className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                    formData.type === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <FaCreditCard className="w-6 h-6 mb-2 text-green-500" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'paypal' })}
                  className={`p-4 rounded-xl flex flex-col items-center border-2 ${
                    formData.type === 'paypal' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <FaPaypal className="w-6 h-6 mb-2 text-blue-500" />
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {formData.type === 'paypal' ? 'PayPal Email' : 'Provider'}
              </label>
              {formData.type === 'paypal' ? (
                <input
                  type="email"
                  placeholder="email@example.com"
                  className={`w-full p-3 rounded-lg border-2 ${
                    errors.accountDetails ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.accountDetails}
                  onChange={(e) => setFormData({ ...formData, accountDetails: e.target.value })}
                />
              ) : (
                <select
                  className={`w-full p-3 rounded-lg border-2 ${
                    errors.provider ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                >
                  <option value="">Select Provider</option>
                  {(formData.type === 'mobile' ? mobileProviders : cardProviders).map((provider) => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              )}
              {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider}</p>}
            </div>

            {formData.type !== 'paypal' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {formData.type === 'mobile' ? 'Phone Number' : 'Card Number'}
                </label>
                <input
                  type="text"
                  placeholder={
                    formData.type === 'mobile' 
                      ? '6XXXXXXXX' 
                      : '0000 0000 0000 0000'
                  }
                  className={`w-full p-3 rounded-lg border-2 ${
                    errors.accountDetails ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={formData.accountDetails}
                  onChange={(e) => setFormData({ ...formData, accountDetails: e.target.value })}
                />
                {errors.accountDetails && (
                  <p className="text-red-500 text-sm mt-1">{errors.accountDetails}</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Add Method
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Collection Form Component
const CollectionForm: React.FC<{ 
  selectedMethod: any; 
  onClose: () => void;
  onSuccess: (response: PaymentResponse) => void;
}> = ({ selectedMethod, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [phoneNumber, _setPhoneNumber] = useState<string>(`237${selectedMethod.details}`);
  const [response, setResponse] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.pay.mynkwa.com', {
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
      onSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Collect Payment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <FaMobileAlt className="text-blue-500 mr-3" />
              <div>
                <p className="font-medium">{selectedMethod.provider.split('••••')[0]}</p>
                <p className="text-sm text-gray-600">•••• {phoneNumber.slice(-4)}</p>
              </div>
            </div>
          </div>

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

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Collect Payment'}
              </button>
            </div>
          </form>

          {response && (
            <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-3">Payment Successful!</h3>
              <PaymentResponseDetails response={response} />
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

// Payment Response Details Component
const PaymentResponseDetails: React.FC<{ response: PaymentResponse }> = ({ response }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="text-gray-600">Payment ID:</div>
      <div className="font-medium break-all">{response.id}</div>
      
      <div className="text-gray-600">Status:</div>
      <div className="font-medium capitalize">{response.status}</div>
      
      <div className="text-gray-600">Amount:</div>
      <div className="font-medium">{response.amount.toLocaleString()} XAF</div>
      
      <div className="text-gray-600">Fee:</div>
      <div className="font-medium">{response.fee?.toLocaleString() || '0'} XAF</div>
      
      <div className="text-gray-600">Net Amount:</div>
      <div className="font-medium">{(response.amount - (response.fee || 0)).toLocaleString()} XAF</div>
      
      <div className="text-gray-600">Phone:</div>
      <div className="font-medium">+{response.phoneNumber}</div>
      
      <div className="text-gray-600">Operator:</div>
      <div className="font-medium capitalize">{response.telecomOperator}</div>
      
      <div className="text-gray-600">Initiated:</div>
      <div className="font-medium">{formatDate(response.createdAt)}</div>
      
      <div className="text-gray-600">Updated:</div>
      <div className="font-medium">{formatDate(response.updatedAt)}</div>
    </div>
  );
};

// Transaction Item Component
const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${
          transaction.type === 'collection' ? 'bg-green-100' : 'bg-blue-100'
        }`}>
          <FaCoins className={
            transaction.type === 'collection' ? 'text-green-500' : 'text-blue-500'
          } />
        </div>
        <div>
          <p className="font-medium">
            {transaction.type === 'collection' 
              ? 'Payment Collection' 
              : 'Payout'}
          </p>
          <p className="text-sm text-gray-500">
            {transaction.date.toLocaleDateString()} • {transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-gray-400 mt-1">{transaction.provider}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${
          transaction.type === 'collection' ? 'text-green-500' : 'text-red-500'
        }`}>
          {transaction.type === 'collection' ? '+' : '-'} XAF {transaction.amount.toLocaleString()}
        </p>
        <p className={`text-sm ${
          transaction.status === 'completed' 
            ? 'text-green-600' 
            : transaction.status === 'pending'
              ? 'text-yellow-600'
              : 'text-red-600'
        }`}>
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </p>
        {transaction.fee && (
          <p className="text-xs text-gray-500 mt-1">
            Fee: XAF {transaction.fee.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

// Main Payment Component
const Payment: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats>({
    availableBalance: 0,
    pendingPayouts: 0,
    totalSpent: 0
  });

  // Calculate stats when transactions change
  useEffect(() => {
    const calculateStats = () => {
      let availableBalance = 0;
      let pendingPayouts = 0;
      let totalSpent = 0;

      transactions.forEach(transaction => {
        if (transaction.type === 'collection') {
          if (transaction.status === 'completed') {
            // Subtract fee from collected amount
            const netAmount = transaction.amount - (transaction.fee || 0);
            availableBalance += netAmount;
          }
        } else if (transaction.type === 'payout') {
          if (transaction.status === 'completed') {
            availableBalance -= transaction.amount;
            totalSpent += transaction.amount;
          } else if (transaction.status === 'pending') {
            pendingPayouts += transaction.amount;
          }
        }
      });

      setStats({ availableBalance, pendingPayouts, totalSpent });
    };

    calculateStats();
  }, [transactions]);

  const handleAddMethod = (newMethod: PaymentMethodData) => {
    const methodId = paymentMethods.length + 1;
    const iconMap = {
      mobile: FaMobileAlt,
      card: FaCreditCard,
      paypal: FaPaypal
    };
    
    let displayProvider = newMethod.provider;
    let details = newMethod.accountDetails || '';
    
    if (newMethod.type === 'card') {
      displayProvider = `${newMethod.provider} •••• ${details.slice(-4)}`;
      details = details.slice(-4);
    } else if (newMethod.type === 'mobile') {
      const lastFour = details.slice(-4);
      displayProvider = `${newMethod.provider} •••• ${lastFour}`;
    } else if (newMethod.type === 'paypal') {
      displayProvider = details;
    }
    
    setPaymentMethods(prev => [
      ...prev,
      {
        id: methodId,
        type: newMethod.type,
        provider: displayProvider,
        icon: iconMap[newMethod.type],
        color: newMethod.type === 'mobile' 
          ? 'text-yellow-500' 
          : newMethod.type === 'card' 
            ? 'text-green-500' 
            : 'text-blue-500',
        details: details
      }
    ]);
  };

  const handleCollectPayment = (method: any) => {
    if (method.type === 'mobile') {
      setSelectedMethod(method);
      setShowCollectionForm(true);
    }
  };

  const handlePaymentSuccess = (response: PaymentResponse) => {
    // Create transaction object from API response
    const newTransaction: Transaction = {
      id: response.id,
      amount: response.amount,
      phone: response.phoneNumber,
      date: new Date(response.createdAt),
      provider: response.telecomOperator.toUpperCase(),
      status: response.status,
      type: 'collection',
      fee: response.fee
    };
    
    // Add to transactions
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Close collection form
    setShowCollectionForm(false);
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return `XAF ${amount.toLocaleString()}`;
  };

  return (
    <div className="m-4 space-y-8 bg-gray-50">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Available Balance</p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(stats.availableBalance)}</p>
            </div>
            <div className="p-4 rounded-full bg-green-100">
              <FaWallet className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Payouts</p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(stats.pendingPayouts)}</p>
            </div>
            <div className="p-4 rounded-full bg-yellow-100">
              <FaCoins className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalSpent)}</p>
            </div>
            <div className="p-4 rounded-full bg-red-100">
              <FaCoins className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-xl font-semibold mb-4 sm:mb-0 flex items-center gap-2">
            <FaCreditCard className="text-purple-500" /> Payment Methods
          </h3>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add New Method
          </button>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${
                  method.type === 'mobile' ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleCollectPayment(method)}
              >
                <div className="flex items-center gap-4">
                  <method.icon className={`${method.color} w-6 h-6`} />
                  <span className="font-medium">{method.provider}</span>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentMethods(prev => prev.filter(m => m.id !== method.id));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No payment methods</h3>
            <p className="text-gray-500 mb-4">Add a payment method to start collecting payments</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus /> Add Payment Method
            </button>
          </div>
        )}
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FaWallet className="text-yellow-500" /> Recent Transactions
        </h3>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-10">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCoins className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No transactions yet</h3>
              <p className="text-gray-500">Your transactions will appear here once you start collecting payments</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddPaymentMethodModal
          onClose={() => setIsModalOpen(false)}
          onAddMethod={handleAddMethod} 
          isVisible={true}
        />
      )}

      {showCollectionForm && selectedMethod && (
        <CollectionForm 
          selectedMethod={selectedMethod}
          onClose={() => setShowCollectionForm(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Payment;