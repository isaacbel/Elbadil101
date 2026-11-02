'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  layout?: 'horizontal' | 'symbol';
  colourway?: 'color' | 'reversed' | 'black' | 'white';
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Logo({
  layout = 'horizontal',
  colourway = 'color',
  className = '',
  width,
  height,
  priority = false,
}: LogoProps) {
  const svgPath = `/logo/svg/ALBADIL_${layout}_${colourway}.svg`;

  // Defaults: minimum width 140px horizontal, 32px symbol
  const defaultWidth = layout === 'horizontal' ? 160 : 36;
  const defaultHeight = layout === 'horizontal' ? 44 : 36;
  const w = width || defaultWidth;
  const h = height || defaultHeight;

  return (
    <Image
      src={svgPath}
      alt="البديل · القائمة الحرّة 101"
      width={w}
      height={h}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
