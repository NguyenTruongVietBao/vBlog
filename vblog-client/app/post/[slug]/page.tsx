'use client';
import { useParams } from 'next/navigation';
import React from 'react';

export default function PostPage() {
  const { slug } = useParams();
  return <div>Post: {slug}</div>;
}
