"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [verificationStatus, setVerificationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState(""); // State to store the response message
  const [errorMessage, setErrorMessage] = useState(""); // Error message for failed verification
  const [email, setEmail] = useState(""); // Email state to store the email address
  const [alert, setAlert] = useState(""); // Alert for error messages

  // Fetch the email from the server using the token
  const getEmail = async () => {
    try {
      const response = await fetch(`/api/verify?token=${token}`, {
        method: "GET",
        cache: "no-store",
      });
  
      const data = await response.json();
      
      // Log response for debugging
      console.log(data);
  
      if (data.error) {
        setAlert(data.error);
      } else {
        setEmail(data.email); // Set the email if response is successful
      }
    } catch (error) {
      setAlert("Error fetching email. Please try again.");
      console.error(error);
    }
  };
  

  // Perform the verification
  const verify = async () => {
    setVerificationStatus('loading');
    setErrorMessage('');
    setMessage('');

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (response.ok) {
        const data = await response.json();
        setVerificationStatus('success');
        setMessage(data.message || "Email verified successfully!");
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      } else {
        throw new Error("Failed to verify email. Please try again.");
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  React.useEffect(() => {
    if (token) {
      getEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>Please verify your email address to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            We've sent a verification email to:
            <br />
            <strong className="font-medium">{email}</strong>
          </p>

          {verificationStatus === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                {message || "Your email has been successfully verified."}
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'error' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {verificationStatus === 'idle'  && (
            <p className="text-center text-sm text-gray-500">
              Click the button below to verify your email address.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={verify}
            disabled={verificationStatus === 'loading' || verificationStatus === 'success'}
            className="w-full max-w-xs"
          >
            {verificationStatus === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyPage;
