import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const OTPVerify = () => {
    const [code, setCode] = useState<string[]>(new Array(8).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

  const focusNextInput = (index: number) => {
    if (index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value.length === 1) {
      focusNextInput(index);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    
    console.log('Verifying code:', code.join(''));
    
    const isVerified = true; 
    if (isVerified) {
      try {
        console.log('Verifying code:', code.join(''));
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
    
        router.push('/login').catch((err)=> console.log(err)); 
      } catch (error) {
   
        console.error('Verification failed', error);
      }
    } else {
      console.error('Verification failed');
    }
  };


    return (
        <div className="flex items-center mt-6 ">
        <div className="rounded-2xl shadow-sm border-2 border-grey1 -space-y-px gap-4 flex flex-col p-10 content-center">
          <h1 className="text-xl font-bold mb-5">Verify your email</h1>
          <form onSubmit={handleVerify}>
            <p className="mb-5">Enter the 8 digit code you have received on anu***@gmail.com</p>
            <div className="flex justify-between gap-2 mb-5">
              {code.map((_, index) => (
                <input
                key={index}
                ref={el => {
                  inputRefs.current[index] = el; // Now it doesn't return anything
                }}
                className="w-10 h-10 border rounded text-center"
                type="text"
                maxLength={1}
                value={code[index]}
                onChange={(event) => handleInputChange(event.target.value, index)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && event.currentTarget.value === '') {
                    handleInputChange('', index);
                    focusPrevInput(index);
                  }
                }}
              />
              ))}
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none"
            >
              VERIFY
            </button>
          </form>
        </div>
      </div>
    )
}

export default OTPVerify