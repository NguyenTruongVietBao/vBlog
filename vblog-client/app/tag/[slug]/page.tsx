'use client';
import { useParams } from 'next/navigation';
import React from 'react';

export default function TagPage() {
  const { slug } = useParams();
  return <div>Tag: {slug}</div>;
}
