import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    // Static Admin Credentials
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "123456";

    const handleLogin = (e) => {

        e.preventDefault();

        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            // Save Login State
            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            navigate("/dashboard");

        } else {

            setError("Invalid email or password");

        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-orange-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

                <div className="text-center mb-8">

                    <div className="text-5xl mb-4">
                        🥭
                    </div>

                    <h1 className="text-3xl font-black text-gray-900">
                        Admin Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        UniqueExpressBD Dashboard
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>

                        <label className="text-sm font-bold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-200 outline-none"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="text-sm font-bold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-200 outline-none"
                        />

                    </div>

                    {/* Error */}
                    {error && (

                        <div className="bg-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
                            {error}
                        </div>

                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Login;