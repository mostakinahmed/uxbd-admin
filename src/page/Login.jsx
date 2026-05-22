import React, { useState } from "react";

const AdminLogin = ({ onLoginSuccess }) => {
    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Form Submit Handler
    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Dummy authentication check (Simulating network request)
        setTimeout(() => {
            if (email === "admin@uniqueexpress.com" && password === "mango2026") {
                setIsLoading(false);
                if (onLoginSuccess) {
                    onLoginSuccess(); // ড্যাশবোর্ড স্টেট ট্রিপ করার কলব্যাক
                } else {
                    alert("লগইন সফল হয়েছে!");
                }
            } else {
                setIsLoading(false);
                setError("ভুল ইমেইল অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।");
            }
        }, 1000); // 1-second loading experience
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex items-center justify-center p-4 selection:bg-green-600 selection:text-white">
            
            {/* Login Card Wrapper */}
            <div className="bg-white border border-gray-200/80 shadow-2xl rounded-3xl overflow-hidden max-w-md w-full transition-all">
                
                {/* Brand / Decorative Top Section */}
                <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white text-center py-10 px-6 relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_1px]"></div>
                    <span className="text-5xl inline-block mb-3 drop-shadow-md">🥭</span>
                    <h2 className="text-2xl font-black tracking-tight">UniqueExpressBD</h2>
                    <p className="text-xs text-green-100 font-semibold mt-1">ম্যাঙ্গো সেলস অ্যাডমিন প্যানেল লগইন</p>
                </div>

                {/* Form Section */}
                <div className="p-6 md:p-8 space-y-6">
                    
                    {/* Error Box */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2 animate-pulse">
                            <span>⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">অ্যাডমিন ইমেইল</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">📧</span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@uniqueexpress.com"
                                    className="w-full bg-gray-50/50 pl-9 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">পাসওয়ার্ড</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50/50 pl-9 pr-10 py-3 rounded-xl border border-gray-300 outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                                />
                                {/* Show/Hide Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs font-bold hover:text-gray-600"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me checkbox */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-500 font-semibold select-none">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                                />
                                <span>লগইন মনে রাখুন</span>
                            </label>
                            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("সিস্টেম অ্যাডমিনিস্ট্রেটরের সাথে যোগাযোগ করুন।"); }} className="text-green-600 font-bold hover:underline">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-sm py-3.5 rounded-xl shadow-xl shadow-orange-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        প্রসেস হচ্ছে...
                                    </>
                                ) : (
                                    "ড্যাশবোর্ডে প্রবেশ করুন ➔"
                                )}
                            </button>
                        </div>

                    </form>
                    
                    {/* Demo Credentials Hint Box */}
                    <div className="border border-dashed border-gray-200 rounded-xl p-3 bg-gray-50 text-center text-[11px] text-gray-400 leading-relaxed">
                        <p className="font-bold text-gray-500">🔒 ডেমো অ্যাডমিন ক্রেডেনশিয়ালস:</p>
                        <p>ইমেইল: <span className="font-mono text-gray-600 select-all">admin@uniqueexpress.com</span></p>
                        <p>পাসওয়ার্ড: <span className="font-mono text-gray-600 select-all">mango2026</span></p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminLogin;