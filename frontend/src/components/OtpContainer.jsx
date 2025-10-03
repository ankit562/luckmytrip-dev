import React, { useState } from 'react';

const OtpContainer = ({ onConfirm }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await onConfirm(otp);
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Email Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP sent to your email</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleChange}
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="123456"
          required
          disabled={loading}
          className="otp-input"
          style={{ letterSpacing: '0.3em', fontSize: '1.2rem', textAlign: 'center' }}
        />
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading} className="confirm-button">
          {loading ? 'Verifying...' : 'Confirm OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpContainer;
