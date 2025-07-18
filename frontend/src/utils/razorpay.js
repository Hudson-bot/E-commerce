// src/utils/razorpay.js
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (amount, onSuccess, onFailure) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    onFailure('Razorpay SDK failed to load. Are you online?');
    return;
  }

  // In a real app, you would fetch these from your backend
  const options = {
    // key: 'rzp_test_YOUR_TEST_KEY', // Replace with your test key
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use environment variable for Razorpay key
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    name: 'E-Shop',
    description: 'Purchase from Your Store',
    image: 'https://via.placeholder.com/150', // Your store logo
    handler: function(response) {
      onSuccess(response);
    },
    prefill: {
      name: 'Test User',
      email: 'test.user@example.com',
      contact: '9999999999'
    },
    notes: {
      address: 'Test Address'
    },
    theme: {
      color: '#3399cc'
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};