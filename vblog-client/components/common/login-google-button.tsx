'use client';
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { envConfig } from '@/lib/env.config';
import http from '@/lib/api';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await http.post('/auth/google-login', {
        method: 'POST',
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      console.log('Server response:', res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={envConfig.GOOGLE_CLIENT_ID || ''}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
