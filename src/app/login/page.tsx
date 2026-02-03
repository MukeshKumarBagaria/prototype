'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Lock, Eye, EyeOff, Volume2, RefreshCw, Keyboard, Mail, Smartphone, HelpCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Generate random captcha
const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

// Virtual Keyboard Component
const VirtualKeyboard = ({
    onKeyPress,
    onClose,
    isPassword = false
}: {
    onKeyPress: (key: string) => void;
    onClose: () => void;
    isPassword?: boolean;
}) => {
    const rows = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];
    const specialChars = ['@', '#', '$', '%', '&', '*', '!', '_', '-'];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
            <div className="bg-white rounded-t-2xl w-full max-w-2xl shadow-2xl">
                <div className="flex items-center justify-between p-3 border-b">
                    <span className="text-sm font-medium text-slate-600">Virtual Keyboard</span>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-3 space-y-2">
                    {/* Number row */}
                    <div className="flex justify-center gap-1">
                        {rows[0].map((key) => (
                            <button
                                key={key}
                                onClick={() => onKeyPress(key)}
                                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded text-lg font-medium transition-colors"
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                    {/* Letter rows */}
                    {rows.slice(1).map((row, idx) => (
                        <div key={idx} className="flex justify-center gap-1">
                            {row.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => onKeyPress(key)}
                                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded text-lg font-medium transition-colors"
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    ))}
                    {/* Special characters for password */}
                    {isPassword && (
                        <div className="flex justify-center gap-1">
                            {specialChars.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => onKeyPress(key)}
                                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded text-lg font-medium transition-colors"
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    )}
                    {/* Action buttons */}
                    <div className="flex justify-center gap-2 pt-2">
                        <button
                            onClick={() => onKeyPress('BACKSPACE')}
                            className="px-6 h-10 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium transition-colors"
                        >
                            ← Backspace
                        </button>
                        <button
                            onClick={() => onKeyPress(' ')}
                            className="px-12 h-10 bg-slate-200 hover:bg-slate-300 rounded font-medium transition-colors"
                        >
                            Space
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 h-10 bg-[#1C53A0] hover:bg-[#164080] text-white rounded font-medium transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, activeRole } = useAuth();

    // Form state
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otpMethod, setOtpMethod] = useState<'email' | 'mobile'>('mobile');

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [activeKeyboard, setActiveKeyboard] = useState<'userId' | 'password' | 'captcha' | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Generate captcha on mount
    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && activeRole) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, activeRole, router]);

    // Refresh captcha
    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
    };

    // Speak captcha (audio accessibility)
    const speakCaptcha = useCallback(() => {
        if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(
                captcha.split('').join(' ')
            );
            utterance.rate = 0.6;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        } else {
            toast.error('Audio not supported in this browser');
        }
    }, [captcha]);

    // Handle virtual keyboard input
    const handleKeyboardInput = (key: string) => {
        if (activeKeyboard === 'userId') {
            if (key === 'BACKSPACE') {
                setUserId(prev => prev.slice(0, -1));
            } else {
                setUserId(prev => prev + key);
            }
        } else if (activeKeyboard === 'password') {
            if (key === 'BACKSPACE') {
                setPassword(prev => prev.slice(0, -1));
            } else {
                setPassword(prev => prev + key);
            }
        } else if (activeKeyboard === 'captcha') {
            if (key === 'BACKSPACE') {
                setCaptchaInput(prev => prev.slice(0, -1));
            } else {
                setCaptchaInput(prev => prev + key);
            }
        }
    };

    // Reset all fields
    const handleReset = () => {
        setUserId('');
        setPassword('');
        setCaptchaInput('');
        refreshCaptcha();
    };

    // Check form validity
    const isFormValid = userId.trim() !== '' && password.trim() !== '' && captchaInput.trim() !== '';

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId.trim()) {
            toast.error('Please enter your User ID');
            return;
        }

        if (!password.trim()) {
            toast.error('Please enter your Password');
            return;
        }

        if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
            toast.error('Invalid Captcha. Please try again.');
            refreshCaptcha();
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = login(userId, password);
            setIsLoading(false);

            if (result.success) {
                toast.success(`OTP sent to your ${otpMethod === 'email' ? 'email' : 'mobile number'}`);
                // For demo, auto-login after showing OTP message
                setTimeout(() => {
                    toast.success('Login successful!');
                }, 500);
            } else {
                toast.error(result.error || 'Invalid credentials');
                refreshCaptcha();
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* IFMIS Header */}
            <header className="bg-[#13386C] text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left: Logo and Title */}
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <Image
                            src="/logo.png"
                            alt="IFMIS Logo"
                            width={56}
                            height={56}
                            className="rounded-full"
                        />
                        <div>
                            <h1 className="text-xl font-bold tracking-wide text-white">Integrated Financial Management Information System</h1>
                            <p className="text-xs text-white">
                                वित्त विभाग | FINANCE DEPARTMENT
                                <br />
                                GOVERNMENT OF MADHYA PRADESH
                            </p>
                        </div>
                    </div>

                    {/* Right: Language & Font Size */}
                    <div className="flex items-center gap-6">
                        {/* Language Selector */}
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-white mb-1">Language selected</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 text-sm rounded bg-white text-[#13386C] font-medium">
                                    English
                                </button>
                                <button className="px-3 py-1 text-sm rounded border border-white/40 text-white hover:bg-white/10 transition-colors">
                                    हिन्दी
                                </button>
                            </div>
                        </div>

                        {/* Font Size Controls */}
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-white mb-1">Change Font Size</span>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 rounded bg-white/10 border border-white/30 text-white text-sm hover:bg-white/20 transition-colors">
                                    A<sup className="text-[8px]">-</sup>
                                </button>
                                <button className="w-8 h-8 rounded bg-[#c75b12] border border-[#c75b12] text-white font-medium hover:bg-[#b04d0e] transition-colors">
                                    A
                                </button>
                                <button className="w-8 h-8 rounded bg-white/10 border border-white/30 text-white text-lg hover:bg-white/20 transition-colors">
                                    A<sup className="text-[10px]">+</sup>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - Centered Login Form */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">

                    {/* Form Heading */}
                    <h2 className="text-2xl font-bold text-[#13386C] text-center mb-8">
                        एकीकृत वित्तीय प्रबंधन सूचना प्रणाली
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* User ID */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                User ID <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1C53A0] transition-colors">
                                    <User size={20} />
                                </div>
                                <Input
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="Enter User ID"
                                    className="h-12 pl-10 bg-white border-slate-300 focus:border-[#1C53A0] focus:ring-[#1C53A0]/20 rounded-xl transition-all shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setActiveKeyboard('userId')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#1C53A0]"
                                >
                                    <Keyboard size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#1C53A0] transition-colors">
                                    <Lock size={20} />
                                </div>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="h-12 pl-10 pr-20 bg-white border-slate-300 focus:border-[#1C53A0] focus:ring-[#1C53A0]/20 rounded-xl transition-all shadow-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                    <div className="w-px h-5 bg-slate-300"></div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveKeyboard('password')}
                                        className="text-slate-400 hover:text-[#1C53A0]"
                                    >
                                        <Keyboard size={20} />
                                    </button>
                                </div>
                            </div>
                            {/* Forgot Password Link moved here */}
                            <div className="text-right pt-1">
                                <a href="#" className="text-sm text-[#1C53A0] hover:underline font-medium">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* Captcha */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Captcha <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Simple Captcha Display */}
                                <div className="flex-1 border-2 border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-between bg-white relative overflow-hidden">
                                    {/* Simulated noise background */}
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                                    <span className="text-3xl font-bold tracking-widest text-[#1C53A0] select-none z-10 mx-auto">
                                        {captcha}
                                    </span>
                                    <div className="flex items-center gap-1 z-10">
                                        <button
                                            type="button"
                                            onClick={speakCaptcha}
                                            className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-[#1C53A0] text-white' : 'text-[#1C53A0] hover:bg-blue-50'}`}
                                            title="Listen to Captcha"
                                        >
                                            <Volume2 size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={refreshCaptcha}
                                            className="text-[#1C53A0] hover:bg-blue-50 p-2 rounded-full transition-colors"
                                            title="Refresh Captcha"
                                        >
                                            <RefreshCw size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full sm:w-1/3 relative">
                                    <Input
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        placeholder="Enter Captcha"
                                        className="h-14 bg-slate-50 border-slate-300 focus:bg-white focus:border-[#1C53A0] focus:ring-[#1C53A0]/20 rounded-xl text-center text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* OTP Method - Unified Style */}
                        <div className="space-y-1.5 pt-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Get OTP on <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setOtpMethod('email')}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${otpMethod === 'email'
                                        ? 'border-[#1C53A0] bg-[#1C53A0]/5 text-[#1C53A0] font-semibold shadow-sm'
                                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <Mail size={18} />
                                    Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOtpMethod('mobile')}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${otpMethod === 'mobile'
                                        ? 'border-[#1C53A0] bg-[#1C53A0]/5 text-[#1C53A0] font-semibold shadow-sm'
                                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <Smartphone size={18} />
                                    Mobile
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button
                                type="button"
                                onClick={handleReset}
                                variant="outline"
                                className="flex-1 h-12 rounded-xl border-[#1C53A0] text-[#1C53A0] hover:bg-blue-50 hover:text-[#1C53A0] text-base font-medium"
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || !isFormValid}
                                className={`flex-[2] h-12 rounded-xl font-bold text-lg shadow-lg transition-all ${isFormValid
                                    ? 'bg-[#1C53A0] hover:bg-[#154080] text-white shadow-blue-900/20'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                {isLoading ? 'Authenticating...' : 'Login'}
                            </Button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center border-t border-slate-100 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                            <div className="text-left">
                                <button
                                    onClick={() => { setUserId('creator001'); setPassword('creator123'); }}
                                    className="hover:text-[#1C53A0] cursor-pointer"
                                >
                                    Demo: creator001
                                </button>
                            </div>
                            <div className="text-right flex items-center justify-end gap-1 text-red-500 font-medium">
                                <HelpCircle size={14} />
                                Help: 1800-419-824
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4">
                <div className="text-center">
                    <p className="text-sm text-slate-500">Maintained and developed by</p>
                    <a
                        href="https://www.bel-india.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#1C53A0] font-medium hover:underline mt-1"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                        </svg>
                        Bharat Electronics Limited
                    </a>
                </div>
            </footer>

            {/* Virtual Keyboard Modal */}
            {activeKeyboard && (
                <VirtualKeyboard
                    onKeyPress={handleKeyboardInput}
                    onClose={() => setActiveKeyboard(null)}
                    isPassword={activeKeyboard === 'password'}
                />
            )}
        </div>
    );
}
