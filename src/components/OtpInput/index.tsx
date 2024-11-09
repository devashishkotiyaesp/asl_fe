import React, { useEffect, useRef } from 'react';

export const OTPInput = ({
  otp,
  setOtp,
  onSubmit,
  otpError,
}: {
  readonly otp: string;
  readonly setOtp: (otp: string) => void;
  readonly onSubmit?: () => void;
  readonly otpError?: string;
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, value: string) => {
    const newOtp = otp.split('');

    if (value === '' || /\d/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp.join(''));

      if (value && newOtp[index].length === 1 && index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    } else if (event.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="inputField text-center text-black font-semibold bg-OffWhite h-16"
            onFocus={(e) => e.currentTarget.select()}
          />
        ))}
      </div>
      {otpError && <span className="text-PrimaryRed">{otpError}</span>}
    </div>
  );
};
