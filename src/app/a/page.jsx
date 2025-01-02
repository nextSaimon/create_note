import React from 'react';

const EmailVerificationTemplate = ({ verificationLink }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Confirm your account</h2>
        <hr className="my-4 border-t border-gray-300" />
        <p className="text-base text-gray-700 text-center">
          Please click the button below to confirm your email address and finish setting up your account. This link is valid for 6 hours.
        </p>
        <div className="mt-6 text-center">
          <a 
            href={verificationLink} 
            className="bg-blue-500 text-white py-2 px-6 text-lg rounded-lg inline-block"
          >
            Confirm
          </a>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <p className="text-sm text-gray-600 text-center">
          If you did not create an account with us, please ignore this email.
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationTemplate;
