'use client';

import React from 'react';

export default function Background() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Gradient Blobs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-bounce"
                style={{ backgroundColor: 'var(--color-blob-1)', animationDelay: '0s' }}
            ></div>
            <div
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-bounce"
                style={{ backgroundColor: 'var(--color-blob-2)', animationDelay: '2s', animationDuration: '35s' }}
            ></div>
            <div
                className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob-bounce"
                style={{ backgroundColor: 'var(--color-blob-3)', animationDelay: '4s', animationDuration: '45s' }}
            ></div>

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'url(/noise.svg)',
                    filter: 'contrast(120%) brightness(100%)'
                }}
            ></div>
        </div>
    );
}
