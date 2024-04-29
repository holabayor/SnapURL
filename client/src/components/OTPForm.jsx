import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const OTPForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (otp) => {
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  useEffect(() => {
    if (value.length === 6) {
      handleSubmit(value);
    }
  }, [value]);

  return (
    <div className="w-full">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="text-center text-sm">
        {value === '' ? (
          <>Enter your one-time password.</>
        ) : (
          <>Processing...{value}</>
        )}
      </div>
    </div>
  );
};

export default OTPForm;
