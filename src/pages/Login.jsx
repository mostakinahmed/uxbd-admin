import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Static Admin Credentials
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "123456";

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulating a minor network latency for a premium native app feel
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                setIsLoading(false);
                // Save Login State
                localStorage.setItem("adminLoggedIn", "true");
                navigate("/dashboard");
            } else {
                setIsLoading(false);
                setError("Invalid email or password. Please try again.");
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex flex-col items-center justify-center p-4 selection:bg-green-600 selection:text-white">
            
            {/* Login Card Wrapper */}
            <div className="bg-white border border-gray-200/80 shadow-2xl rounded-3xl overflow-hidden max-w-md w-full transition-all">
                
                {/* Decorative Brand Top Banner */}
                <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white text-center py-10 px-6 relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_1px]"></div>
                    <span className="text-5xl inline-block mb-3 drop-shadow-md transform hover:scale-110 transition-transform duration-300">
                        🥭
                    </span>
                    <h1 className="text-3xl font-black tracking-tight">UniqueExpressBD</h1>
                    <p className="text-xs text-green-100 font-semibold mt-1">ম্যাঙ্গো সেলস অ্যাডমিন প্যানেল লগইন</p>
                </div>

                {/* Main Form Core Section */}
                <div className="p-6 md:p-8 space-y-6">
                    
                    {/* Error Box Notice */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3.5 text-xs font-bold flex items-center gap-2 animate-pulse">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        
                        {/* Email Input Field */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 text-sm">📧</span>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter admin email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50/50 pl-10 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 text-sm">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50/50 pl-10 pr-12 py-3 rounded-xl border border-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                                />
                                {/* Inline Dynamic Visibility Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Box row */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-400 font-semibold select-none">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                                />
                                <span>Remember session</span>
                            </label>
                            <span 
                                onClick={() => alert("Please contact the chief technical support operator.")} 
                                className="text-green-600 font-bold hover:underline cursor-pointer"
                            >
                                Forgot Password?
                            </span>
                        </div>

                        {/* Submission Action Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-sm py-3.5 rounded-xl shadow-xl shadow-green-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                                    isLoading ? "opacity-75 cursor-not-allowed" : "hover:shadow-green-600/20"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying Session...
                                    </>
                                ) : (
                                    "Login to Dashboard ➔"
                                )}
                            </button>
                        </div>

                    </form>
                    
                    
                </div>

            </div>

            {/* INTEGRATED DEVELOPER CREDIT SIGNATURE */}
            <div className="mt-6 text-center animate-fade-in">
                <p className="text-xs font-medium text-gray-400 tracking-wide flex items-center justify-center gap-1">
                    <span>Designed & Developed with</span>
                    <span className="text-red-500 text-sm animate-pulse">❤️</span>
                    <span>by</span>
                    <a
                        href="https://mostakinahmed.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 font-bold hover:text-green-600 transition-colors duration-200 underline underline-offset-2 decoration-gray-300 hover:decoration-green-500 tracking-wide"
                    >
                        Mostakin Ahmed
                    </a>
                </p>
            </div>

        </div>
    );
};

export default Login;