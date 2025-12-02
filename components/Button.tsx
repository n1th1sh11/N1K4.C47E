import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2 font-mono uppercase tracking-wider transition-all duration-200 border relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-hacker-green focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]",
    secondary: "border-hacker-gray text-gray-400 hover:border-white hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-bold">{children}</span>
      {/* Scanline hover effect inside button */}
      <div className="absolute inset-0 h-full w-full bg-hacker-green/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
    </button>
  );
};

export default Button;
