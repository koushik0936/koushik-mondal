
import React, { useState } from 'react';
import { AITool, Plan, PaymentMethod, OrderStatus, Order } from '../types';
import { TRANSLATIONS } from '../constants';
import { useApp } from '../store';

interface OrderModalProps {
  tool: AITool;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ tool, onClose }) => {
  const { state, addOrder, addNotification } = useApp();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(tool.plans[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BKASH);
  const [txId, setTxId] = useState('');
  const [senderNum, setSenderNum] = useState('');
  
  const t = TRANSLATIONS[state.language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId || !senderNum) return;

    const newOrder: Order = {
      id: `ORD-${new Date().getTime()}`,
      userId: state.user?.id || 'anonymous',
      toolId: tool.id,
      planId: selectedPlan.id,
      amount: selectedPlan.price,
      paymentMethod,
      transactionId: txId,
      senderNumber: senderNum,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);
    addNotification({
      title: 'Order Placed!',
      message: `Your order for ${tool.name} is now pending verification.`,
      type: 'success'
    });
    onClose();
  };

  const instructions = {
    [PaymentMethod.BKASH]: TRANSLATIONS[state.language].bkashNum,
    [PaymentMethod.NAGAD]: TRANSLATIONS[state.language].nagadNum,
    [PaymentMethod.ROCKET]: TRANSLATIONS[state.language].rocketNum,
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">{tool.icon}</span> {tool.name} Checkout
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">&times;</button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">{t.step1}</h3>
              <div className="grid gap-3">
                {tool.plans.map(plan => (
                  <label key={plan.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan.id === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                    <div className="flex items-center">
                      <input type="radio" checked={selectedPlan.id === plan.id} onChange={() => setSelectedPlan(plan)} className="w-5 h-5 text-blue-600 mr-4" />
                      <div>
                        <div className="font-bold">{plan.name}</div>
                        <div className="text-sm text-gray-500">{plan.duration}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{plan.price} BDT</div>
                  </label>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all">Next: Payment Info</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">{t.step2}</h3>
              <div className="flex gap-4">
                {[PaymentMethod.BKASH, PaymentMethod.NAGAD, PaymentMethod.ROCKET].map(m => (
                  <button key={m} onClick={() => setPaymentMethod(m)} className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${paymentMethod === m ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-gray-100 text-gray-400'}`}>
                    {m}
                  </button>
                ))}
              </div>

              <div className="bg-gray-900 text-white p-6 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-sm opacity-70">
                  <span>Send Money to:</span>
                  <span className="font-mono">{instructions[paymentMethod]}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-400">{selectedPlan.price} BDT</span>
                </div>
                <div className="text-xs opacity-50 border-t border-gray-700 pt-3">
                  * Please use your Name/Phone as Reference in the payment app.
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t.txId}</label>
                  <input type="text" value={txId} onChange={e => setTxId(e.target.value)} placeholder="e.g. 8K2L9M3N" className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t.senderNum}</label>
                  <input type="text" value={senderNum} onChange={e => setSenderNum(e.target.value)} placeholder="01XXXXXXXXX" className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none" required />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600">Back</button>
                <button onClick={handleSubmit} className="flex-[2] py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all">{t.confirmPayment}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
