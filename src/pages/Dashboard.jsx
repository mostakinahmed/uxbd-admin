import React, { useState, useMemo } from "react";
import {
    Search,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Truck,
    Clock3,
    Package,
    Wallet,
    CheckCircle2,
    RotateCcw
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {

    // Mock Orders
    const initialOrders = [
        { id: "ORD-9482", name: "মোঃ আসিফ রহমান", phone: "01712345678", package: "রেগুলার ম্যাঙ্গো প্যাক", qty: "5 KG", total: 810, status: "Pending", date: "2026-05-22" },
        { id: "ORD-9483", name: "রাফসান আহমেদ", phone: "01987654321", package: "প্রিমিয়াম ফ্যামিলি প্যাক", qty: "10 KG", total: 1920, status: "Delivered", date: "2026-05-22" },
        { id: "ORD-9484", name: "ইসরাত জাহান তাজনিম", phone: "01555443322", package: "মেগা ফিস্ট উৎসব প্যাক", qty: "20 KG", total: 4460, status: "Pending", date: "2026-05-21" },
        { id: "ORD-9485", name: "তানভীর হাসান", phone: "01333444555", package: "রেগুলার ম্যাঙ্গো প্যাক", qty: "10 KG", total: 1560, status: "Delivered", date: "2026-05-21" },
        { id: "ORD-9486", name: "নাবিল চৌধুরী", phone: "01822334455", package: "প্রিমিয়াম ফ্যামিলি প্যাক", qty: "5 KG", total: 960, status: "Pending", date: "2026-05-20" },
        { id: "ORD-9487", name: "ফাহমিদা আক্তার", phone: "01611223344", package: "রেগুলার ম্যাঙ্গো প্যাক", qty: "7 KG", total: 1110, status: "Delivered", date: "2026-05-20" }
    ];

    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("adminLoggedIn");

        navigate("/");
    };
    // Metrics
    const metrics = useMemo(() => {
        const todayOrders = orders.filter(o => o.date === "2026-05-22");

        return {
            todayCount: todayOrders.length,
            pendingCount: orders.filter(o => o.status === "Pending").length,
            deliveredCount: orders.filter(o => o.status === "Delivered").length,
            salesSum: orders.reduce((sum, o) => o.status === "Delivered" ? sum + o.total : sum, 0)
        };
    }, [orders]);

    // Filtered Orders
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {

            const matchesSearch =
                order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.phone.includes(searchTerm) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "All" || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(start, start + itemsPerPage);
    }, [filteredOrders, currentPage]);

    // Actions
    const handleStatusChange = (id, newStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    };

    const handleDeleteOrder = (id) => {
        if (window.confirm("আপনি কি এই অর্ডারটি ডিলিট করতে চান?")) {
            setOrders(prev => prev.filter(order => order.id !== id));
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-blue-100 font-sans text-gray-800">

            {/* Navbar */}
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-white border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-orange-400 flex items-center justify-center text-white text-2xl shadow-lg">
                            🥭
                        </div>

                        <div>
                            <h1 className="md:text-2xl text-lg font-black bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                                UniquexpressBD
                            </h1>


                        </div>
                    </div>
                    <div className="flex md:gap-10 gap-4">

                        <button
                            onClick={() => window.open("https://uniquexpress.online/", "_blank")}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-sm text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            🌐 Go Website
                        </button>

            
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-medium md:px-5 px-2 text-xs md:text-sm rounded-full"
                        >
                            Logout
                        </button>
                    </div>


                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 md:py-8 py-4 space-y-5">

                {/* Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {/* Card */}
                    <MetricCard
                        title="আজকের অর্ডার"
                        value={metrics.todayCount}
                        subtitle="↑ ৫% গতদিন থেকে"
                        icon={<Package size={28} />}
                        gradient="from-blue-500 to-cyan-400"
                    />

                    <MetricCard
                        title="পেন্ডিং অর্ডার"
                        value={metrics.pendingCount}
                        subtitle="Action প্রয়োজন"
                        icon={<Clock3 size={28} />}
                        gradient="from-orange-500 to-amber-400"
                    />

                    <MetricCard
                        title="ডেলিভারড"
                        value={metrics.deliveredCount}
                        subtitle="Successfully delivered"
                        icon={<Truck size={28} />}
                        gradient="from-green-500 to-emerald-400"
                    />

                    <MetricCard
                        title="মোট রেভিনিউ"
                        value={`৳${metrics.salesSum}`}
                        subtitle="Cash in hand"
                        icon={<Wallet size={28} />}
                        gradient="from-purple-500 to-pink-400"
                    />

                </section>

                {/* Filters */}
                <section className="bg-slate-800 backdrop-blur-xl border border-white/30 shadow-xl rounded-b-3xl p-5 flex flex-col lg:flex-row gap-4 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full lg:w-96">

                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="নাম, ফোন বা অর্ডার আইডি খুঁজুন..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-11 pr-4 py-3 placeholder:text-slate-800 rounded-2xl border border-gray-200 bg-white backdrop-blur-md shadow-sm focus:ring-4 focus:ring-green-600 outline-none transition"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-white p-1.5 rounded-2xl gap-2">

                        {["All", "Pending", "Delivered"].map(tab => (

                            <button
                                key={tab}
                                onClick={() => handleFilter(tab)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${statusFilter === tab
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                    : "text-gray-600 hover:bg-white"
                                    }`}
                            >
                                {tab === "All" && "সব অর্ডার"}
                                {tab === "Pending" && "পেন্ডিং"}
                                {tab === "Delivered" && "ডেলিভারড"}

                            </button>
                        ))}

                    </div>

                </section>

                {/* Table */}
                <section className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">

                    {/* Header */}
                    <div className="px-6 md:py-5 py-3 bg-amber-200 border-b border-gray-200 flex justify-between items-center">

                        <h3 className="md:text-xl text-lg font-black text-gray-800">
                            অর্ডার লিস্ট
                        </h3>

                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            মোট {filteredOrders.length} টি
                        </span>

                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full whitespace-nowrap">

                            <thead >

                                <tr className="text-center text-sm uppercase tracking-wider text-slate-600 border-b border-gray-200">

                                    <th className="px-6 py-4">অর্ডার আইডি</th>
                                    <th className="px-6 py-4">কাস্টমার</th>
                                    <th className="px-6 py-4">ফোন</th>
                                    <th className="px-6 py-4">প্যাকেজ</th>
                                    <th className="px-6 py-4">মোট</th>
                                    <th className="px-6 py-4">তারিখ</th>
                                    <th className="px-6 py-4">স্ট্যাটাস</th>
                                    <th className="px-6 py-4 text-center">অ্যাকশন</th>

                                </tr>

                            </thead>

                            <tbody>

                                {paginatedOrders.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="text-center py-20 text-gray-400 font-bold"
                                        >
                                            কোনো অর্ডার পাওয়া যায়নি
                                        </td>
                                    </tr>

                                ) : (

                                    paginatedOrders.map(order => (

                                        <tr
                                            key={order.id}
                                            className="border-b border-gray-300 hover:bg-green-50/40 transition-all duration-200"
                                        >

                                            <td className="px-4 py-3 font-mono font-bold text-gray-600">
                                                {order.id}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-bold text-gray-900">
                                                        {order.name}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 font-mono">
                                                {order.phone}
                                            </td>

                                            <td className="px-4 py-3">
                                                <p className="font-semibold">
                                                    {order.package}
                                                </p>

                                                <p className="text-sm text-orange-500 font-bold mt-1">
                                                    ওজন: {order.qty}
                                                </p>
                                            </td>

                                            <td className="px-4 py-3 font-black text-lg text-gray-900">
                                                ৳{order.total}
                                            </td>

                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {order.date}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">

                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black border ${order.status === "Delivered"
                                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                        : "bg-orange-100 text-orange-700 border-orange-200"
                                                        }`}
                                                >

                                                    {order.status === "Delivered" ? (
                                                        <CheckCircle2 size={14} />
                                                    ) : (
                                                        <Clock3 size={14} />
                                                    )}

                                                    {order.status}

                                                </span>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">

                                                <div className="flex justify-center gap-2">

                                                    {order.status === "Pending" ? (

                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(order.id, "Delivered")
                                                            }
                                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                                        >
                                                            Deliver
                                                        </button>

                                                    ) : (

                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(order.id, "Pending")
                                                            }
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1"
                                                        >
                                                            <RotateCcw size={14} />
                                                            Revert
                                                        </button>

                                                    )}

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteOrder(order.id)
                                                        }
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300"
                                                    >

                                                        <Trash2 size={18} />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (

                        <div className="px-6 py-5 bg-gray-50/70 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">

                            <p className="text-sm text-gray-500 font-semibold">
                                পেজ {currentPage} / {totalPages}
                            </p>

                            <div className="flex items-center gap-2">

                                {/* Prev */}
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(prev => prev - 1)
                                    }
                                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${currentPage === 1
                                        ? "opacity-40 cursor-not-allowed bg-gray-100"
                                        : "bg-white hover:bg-green-50"
                                        }`}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {/* Pages */}
                                {[...Array(totalPages)].map((_, i) => {

                                    const page = i + 1;

                                    return (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === page
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                                : "bg-white border border-gray-200 hover:bg-green-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {/* Next */}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage(prev => prev + 1)
                                    }
                                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${currentPage === totalPages
                                        ? "opacity-40 cursor-not-allowed bg-gray-100"
                                        : "bg-white hover:bg-green-50"
                                        }`}
                                >
                                    <ChevronRight size={18} />
                                </button>

                            </div>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
};

// Metric Card Component
const MetricCard = ({
    title,
    value,
    subtitle,
    icon,
    gradient
}) => {

    return (

        <div className="bg-white backdrop-blur-xl px-6 py-3 rounded-t-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:scale-[1.02] transition-all duration-300">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {title}
                    </p>

                    <h2 className="md:text-3xl text-2xl font-black mt-2 text-gray-900">
                        {value}
                    </h2>



                </div>

                <div className={`md:w-14 md:h-14 w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg`}>
                    {icon}
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;