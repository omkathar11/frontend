/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Your existing keyframes
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'blur-in': {
          '0%': { opacity: '0', filter: 'blur(8px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },

        // New advanced keyframes
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.3', filter: 'blur(60px)' },
          '50%': { opacity: '0.6', filter: 'blur(80px)' },
        },
        'wave': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'rotate-3d': {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flip': {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '100%': { transform: 'perspective(400px) rotateY(360deg)' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(20)', opacity: '0' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'rotate-in': {
          '0%': { transform: 'rotate(-180deg) scale(0.5)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        'blur-in-scale': {
          '0%': { transform: 'scale(0.5)', filter: 'blur(12px)', opacity: '0' },
          '100%': { transform: 'scale(1)', filter: 'blur(0)', opacity: '1' },
        },
        'perspective-in': {
          '0%': { transform: 'perspective(400px) rotateX(-90deg)', opacity: '0' },
          '100%': { transform: 'perspective(400px) rotateX(0)', opacity: '1' },
        },
        'swipe-in': {
          '0%': { transform: 'translateX(-100px) skewX(-30deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(0)', opacity: '1' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        // Your existing animations
        'fade-in-up': 'fade-in-up 700ms ease-out both',
        'fade-in': 'fade-in 800ms ease-out both',
        'float-y': 'float-y 6s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'slide-in-right': 'slide-in-right 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'blur-in': 'blur-in 700ms ease-out both',
        'scale-in': 'scale-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both',

        // New advanced animations
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'wave': 'wave 8s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'rotate-3d': 'rotate-3d 20s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'flip': 'flip 1s ease-in-out',
        'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'ripple': 'ripple 1s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'rotate-in': 'rotate-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'blur-in-scale': 'blur-in-scale 0.8s ease-out both',
        'perspective-in': 'perspective-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'swipe-in': 'swipe-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}