'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  CreditCard,
  Clock,
  Download,
  DollarSign,
  BarChart,
  Database,
  Cpu,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronUp,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tier?: string;
    role?: string;
    organization?: string | null;
  };
}

// Dummy payment methods data
const paymentMethods = [
  {
    id: 'pm_1',
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2024,
    isDefault: true
  },
  {
    id: 'pm_2',
    type: 'card',
    brand: 'mastercard',
    last4: '5555',
    expMonth: 8,
    expYear: 2025,
    isDefault: false
  }
];

// Dummy billing history data
const billingHistory = [
  {
    id: 'inv_1',
    date: 'Mar 01, 2023',
    description: 'Pro Plan - Monthly',
    amount: '$49.00',
    status: 'paid'
  },
  {
    id: 'inv_2',
    date: 'Feb 01, 2023',
    description: 'Pro Plan - Monthly',
    amount: '$49.00',
    status: 'paid'
  },
  {
    id: 'inv_3',
    date: 'Jan 01, 2023',
    description: 'Pro Plan - Monthly',
    amount: '$49.00',
    status: 'paid'
  },
  {
    id: 'inv_4',
    date: 'Dec 01, 2022',
    description: 'Free Plan',
    amount: '$0.00',
    status: 'n/a'
  }
];

export default function BillingSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  
  const [isChangingPlan, setIsChangingPlan] = useState(false);

  // Get user's current plan
  const currentPlan = session?.user.tier || 'Free';
  const planDetails = {
    name: currentPlan === 'Free' ? 'Free Plan' : currentPlan === 'Pro' ? 'Pro Plan' : 'Enterprise Plan',
    price: currentPlan === 'Free' ? '$0' : currentPlan === 'Pro' ? '$49' : 'Custom',
    billingPeriod: currentPlan === 'Free' ? 'N/A' : 'Monthly',
    nextInvoice: currentPlan === 'Free' ? 'N/A' : 'April 1, 2023',
    features: currentPlan === 'Free' 
      ? ['2 API Keys', 'Basic Models', '100k Tokens/month', '3 Projects'] 
      : currentPlan === 'Pro'
        ? ['10 API Keys', 'All Models', '1M Tokens/month', 'Unlimited Projects', 'Team Collaboration']
        : ['Unlimited API Keys', 'All Models + Custom', 'Custom Token Limit', 'Priority Support', 'SSO Integration']
  };

  // Usage stats (dummy data)
  const usageStats = {
    apiCalls: {
      used: 45621,
      total: currentPlan === 'Free' ? 50000 : currentPlan === 'Pro' ? 500000 : 1000000,
      unit: 'calls'
    },
    storage: {
      used: 2.7,
      total: currentPlan === 'Free' ? 5 : currentPlan === 'Pro' ? 50 : 500,
      unit: 'GB'
    },
    customModels: {
      used: currentPlan === 'Free' ? 0 : 3,
      total: currentPlan === 'Free' ? 0 : currentPlan === 'Pro' ? 5 : 20,
      unit: 'models'
    }
  };

  const calculatePercentage = (used: number, total: number) => {
    return Math.min(Math.round((used / total) * 100), 100);
  };

  const handleAddPaymentMethod = () => {
    toast.success('Payment method added successfully');
  };

  const handleRemovePaymentMethod = (id: string) => {
    toast.success('Payment method removed');
  };

  const handleMakeDefault = (id: string) => {
    toast.success('Default payment method updated');
  };

  const handleDownloadInvoice = (id: string) => {
    toast.success('Invoice downloaded');
  };

  const handleChangePlan = () => {
    setIsChangingPlan(!isChangingPlan);
  };

  const handleUpgradePlan = (plan: string) => {
    toast.success(`Plan upgraded to ${plan}`);
    setIsChangingPlan(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link 
          href="/dashboard/settings" 
          className={`mr-4 p-2 rounded-full transition-colors ${
            isDark 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Billing & Subscription
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your subscription, payment methods, and billing history
          </p>
        </div>
      </div>

      {/* Current Plan Card */}
      <div id="current-plan" className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <DollarSign className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-amber-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Current Plan
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {planDetails.name}
                    </h3>
                    <div className="mt-1 flex items-baseline">
                      <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {planDetails.price}
                      </span>
                      {planDetails.billingPeriod !== 'N/A' && (
                        <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          /{planDetails.billingPeriod.toLowerCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleChangePlan}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      isDark 
                        ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                        : 'border border-amber-200 text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    {isChangingPlan ? 'Cancel' : 'Change Plan'}
                  </button>
                </div>
                {isChangingPlan ? (
                  <div className="space-y-3 mt-4">
                    <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Available Plans:
                    </h4>
                    {currentPlan !== 'Pro' && (
                      <button
                        onClick={() => handleUpgradePlan('Pro')}
                        className={`w-full flex justify-between items-center p-3 rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-gray-800 hover:border-[#00cbdd]/20 hover:bg-[#00cbdd]/5' 
                            : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-full mr-2 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                            <ArrowUpRight className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          </div>
                          <div className="text-left">
                            <span className={`block font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro Plan</span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>$49/month</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          Popular
                        </span>
                      </button>
                    )}
                    {currentPlan !== 'Enterprise' && (
                      <button
                        onClick={() => handleUpgradePlan('Enterprise')}
                        className={`w-full flex justify-between items-center p-3 rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-gray-800 hover:border-[#00cbdd]/20 hover:bg-[#00cbdd]/5' 
                            : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-full mr-2 ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                            <ArrowUpRight className={`h-4 w-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                          </div>
                          <div className="text-left">
                            <span className={`block font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Enterprise Plan</span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Custom pricing</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                        }`}>
                          Advanced
                        </span>
                      </button>
                    )}
                    {currentPlan !== 'Free' && (
                      <button
                        onClick={() => handleUpgradePlan('Free')}
                        className={`w-full flex justify-between items-center p-3 rounded-lg border transition-colors ${
                          isDark 
                            ? 'border-gray-800 hover:border-[#00cbdd]/20 hover:bg-[#00cbdd]/5' 
                            : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-full mr-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <ArrowUpRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                          </div>
                          <div className="text-left">
                            <span className={`block font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Free Plan</span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>$0/month</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          Basic
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={`py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Billing period</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {planDetails.billingPeriod}
                        </span>
                      </div>
                    </div>
                    <div className={`py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Next invoice</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {planDetails.nextInvoice}
                        </span>
                      </div>
                    </div>
                    <div className={`py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Payment method</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {paymentMethods.find(pm => pm.isDefault)?.brand.toUpperCase() || 'None'} •••• {paymentMethods.find(pm => pm.isDefault)?.last4 || ''}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3">
                      <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Plan features:
                      </h4>
                      <ul className="space-y-1">
                        {planDetails.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className={`h-4 w-4 mr-2 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className={`h-full p-4 rounded-lg flex flex-col justify-center items-center border ${
                isDark 
                  ? 'bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/20'
                  : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100'
              }`}>
                <DollarSign className={`h-10 w-10 mb-4 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                <h3 className={`text-lg font-medium text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Need a custom plan?
                </h3>
                <p className={`text-sm text-center mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contact our sales team for a tailored solution for your business
                </p>
                <button className={`px-4 py-2 w-full rounded-lg text-sm font-medium ${
                  isDark 
                    ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                } transition-colors`}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage & Quotas */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <BarChart className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-amber-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Usage & Quotas
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* API Calls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Cpu className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>API Calls</h3>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {usageStats.apiCalls.used.toLocaleString()} / {usageStats.apiCalls.total.toLocaleString()} {usageStats.apiCalls.unit}
                </span>
              </div>
              <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div 
                  className={`h-full rounded-full ${
                    calculatePercentage(usageStats.apiCalls.used, usageStats.apiCalls.total) > 80
                      ? isDark ? 'bg-red-500' : 'bg-red-500'
                      : calculatePercentage(usageStats.apiCalls.used, usageStats.apiCalls.total) > 50
                        ? isDark ? 'bg-amber-500' : 'bg-amber-500'
                        : isDark ? 'bg-green-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${calculatePercentage(usageStats.apiCalls.used, usageStats.apiCalls.total)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Storage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Database className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Storage</h3>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {usageStats.storage.used} / {usageStats.storage.total} {usageStats.storage.unit}
                </span>
              </div>
              <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div 
                  className={`h-full rounded-full ${
                    calculatePercentage(usageStats.storage.used, usageStats.storage.total) > 80
                      ? isDark ? 'bg-red-500' : 'bg-red-500'
                      : calculatePercentage(usageStats.storage.used, usageStats.storage.total) > 50
                        ? isDark ? 'bg-amber-500' : 'bg-amber-500'
                        : isDark ? 'bg-green-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${calculatePercentage(usageStats.storage.used, usageStats.storage.total)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Custom Models */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Cpu className={`h-4 w-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom Models</h3>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {usageStats.customModels.used} / {usageStats.customModels.total} {usageStats.customModels.unit}
                </span>
              </div>
              <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div 
                  className={`h-full rounded-full ${
                    calculatePercentage(usageStats.customModels.used, usageStats.customModels.total) > 80
                      ? isDark ? 'bg-red-500' : 'bg-red-500'
                      : calculatePercentage(usageStats.customModels.used, usageStats.customModels.total) > 50
                        ? isDark ? 'bg-amber-500' : 'bg-amber-500'
                        : isDark ? 'bg-green-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${calculatePercentage(usageStats.customModels.used, usageStats.customModels.total)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div id="payment" className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <CreditCard className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-amber-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Payment Methods
            </h2>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                className={`p-4 rounded-lg border ${
                  isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3 w-10 h-6 rounded bg-white flex items-center justify-center">
                      {method.brand === 'visa' && (
                        <span className="text-blue-600 font-bold text-sm">VISA</span>
                      )}
                      {method.brand === 'mastercard' && (
                        <span className="text-red-600 font-bold text-sm">MC</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          •••• {method.last4}
                        </span>
                        {method.isDefault && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                          }`}>
                            Default
                          </span>
                        )}
                      </div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Expires {method.expMonth}/{method.expYear}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleMakeDefault(method.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isDark 
                            ? 'text-gray-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => toast.success('Payment method updated')}
                      className={`p-1.5 rounded transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:bg-gray-800' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className={`p-1.5 rounded transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:bg-gray-800' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={handleAddPaymentMethod}
              className={`w-full p-4 rounded-lg border flex items-center justify-center ${
                isDark 
                  ? 'border-gray-800 hover:bg-gray-900/40 text-gray-300' 
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Clock className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-amber-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Billing History
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                  <th className={`text-left p-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                  <th className={`text-left p-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
                  <th className={`text-left p-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Amount</th>
                  <th className={`text-left p-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`text-right p-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice) => (
                  <tr 
                    key={invoice.id}
                    className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <td className={`p-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{invoice.date}</td>
                    <td className={`p-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{invoice.description}</td>
                    <td className={`p-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{invoice.amount}</td>
                    <td className="p-3">
                      {invoice.status === 'paid' ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        }`}>
                          <CheckCircle className="h-3 w-3 mr-1" /> Paid
                        </span>
                      ) : invoice.status === 'pending' ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'
                        }`}>
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-800'
                        }`}>
                          <span className="h-3 w-3 mr-1">—</span> N/A
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {invoice.status === 'paid' ? (
                        <button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className={`inline-flex items-center text-sm ${
                            isDark 
                              ? 'text-[#00cbdd] hover:text-[#00cbdd]/80' 
                              : 'text-amber-600 hover:text-amber-700'
                          }`}
                        >
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </button>
                      ) : (
                        <span className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {currentPlan !== 'Free' && (
            <div className="mt-4 text-center">
              <button
                className={`text-sm ${isDark ? 'text-[#00cbdd] hover:underline' : 'text-amber-600 hover:underline'}`}
              >
                View All Invoices
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 