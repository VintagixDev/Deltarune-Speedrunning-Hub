'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    // After successful login and cookie set
    router.replace('/');
    router.refresh(); // 🔥 Forces a reload to reflect session
  }, [router]);

  return <p style={{marginBottom:1000+'px'}}>Redirecting... If you do not get redirected, please <a href="/" style={{color:'blue'}}>click here</a></p>;
}