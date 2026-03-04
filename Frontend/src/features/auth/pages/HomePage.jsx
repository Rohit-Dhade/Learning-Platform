import { useState, useEffect } from "react";
import "../../../index.css";
import { useAuth } from "../hook/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { all_courses } from "../../courses/services/course.api";
import CoursePage from "../../courses/pages/CoursePage";

const cl = [
  {
    icon: "⚡",
    color: "from-gray-700 to-black",
  },
  {
    icon: "🤖",
    color: "from-indigo-400 to-blue-600",
  },
  {
    icon: "🧠",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: "🔬",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: "🧠",
    color: "from-cyan-400 to-indigo-500",
  },
  {
    icon: "🛠️",
    color: "from-blue-400 to-sky-600",
  },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "200+", label: "Courses" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];



export default function App() {
  const [showModal, setShowModal] = useState(null); 
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [activeNav, setActiveNav] = useState("Home");
  const [courses, setcourses] = useState([]);

  const { handlelogin, handleregister, loading, user, handlelogout } =
    useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const handleAuth = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleLogout = () => {
    handlelogout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showModal === "login") {
      await handlelogin(form.email, form.password);
    }

    if (showModal === "register") {
      await handleregister(form.name, form.email, form.password);
    }

    setShowModal(null);

    navigate("/");
  };


  useEffect(() => {
    const fetchCourses = async () => {
      const data = await all_courses();
      setcourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <>
    
    <div className="no-scrollbar min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }
        .grid-bg {
          background-image: linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .glow { box-shadow: 0 0 40px rgba(99,102,241,0.3); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          transition: all 0.3s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.5); }
        .modal-overlay { backdrop-filter: blur(8px); animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        .slide-up { animation: slideUp 0.4s ease forwards; }
        .orb { filter: blur(80px); opacity: 0.15; }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: #6366f1; transition: width 0.3s; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
      `}</style>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full"></div>
        <div className="orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500 rounded-full"></div>
        <div className="orb absolute top-1/2 left-0 w-64 h-64 bg-cyan-500 rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center text-sm font-bold">
              L
            </div>
            <span className="syne font-bold text-xl tracking-tight">
              LearnForge
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "Courses", "Mentors", "Pricing"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-link text-sm font-medium transition-colors ${activeNav === item ? "text-white active" : "text-slate-400 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold">
                    U
                  </div>
                  <span className="text-sm text-slate-300">{`Welcome back! ${user.name}`}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-400/50 rounded-lg px-4 py-2 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowModal("login")}
                  className="text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowModal("register")}
                  className="btn-primary text-sm font-semibold rounded-lg px-4 py-2 text-white"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid-bg pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-sm text-indigo-300 font-medium">
                New courses added weekly
              </span>
            </div>
            <h1 className="syne text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
              Master Skills
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                That Matter.
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
              Join thousands of learners building real-world expertise through
              structured paths, expert mentorship, and hands-on projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => !isLoggedIn && setShowModal("register")}
                className="btn-primary rounded-xl px-8 py-4 text-base font-semibold text-white flex items-center gap-2"
              >
                {isLoggedIn ? "Browse Courses →" : "Start Learning Free →"}
              </button>
              <button className="rounded-xl px-8 py-4 text-base font-medium text-slate-300 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/3 border border-white/5 rounded-2xl p-5"
              >
                <div className="syne text-3xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Explore
              </p>
              <h2 className="syne text-4xl font-bold">Featured Courses</h2>
            </div>
            <button className="hidden md:block text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 transition-all">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses &&
              courses.map((course, index) => (
                <div
                  key={course.title}
                  className="card-hover bg-white/3 border border-white/5 rounded-2xl p-6 cursor-pointer group"
                  onClick={()=>navigate(`/course/${course._id}`)}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cl[index].color}  flex items-center justify-center text-xl mb-5`}
                  >
                    {cl[index].icon}
                  </div>
                  <h3 className="syne text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">
                    {course.lessons} lessons · {course.level}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${course.color} bg-opacity-10 text-white/80`}
                    >
                      {course.level}
                    </span>
                    <button className="text-sm text-slate-400 group-hover:text-white transition-colors">
                      Enroll →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      {!isLoggedIn && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glow bg-gradient-to-r from-indigo-900/50 to-violet-900/50 border border-indigo-500/20 rounded-3xl p-12 text-center">
              <h2 className="syne text-4xl md:text-5xl font-extrabold mb-4">
                Ready to level up?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Create a free account and unlock your first 3 courses instantly.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setShowModal("register")}
                  className="btn-primary rounded-xl px-8 py-4 text-base font-semibold text-white"
                >
                  Create Free Account
                </button>
                <button
                  onClick={() => setShowModal("login")}
                  className="rounded-xl px-8 py-4 text-base font-medium text-slate-300 border border-white/15 hover:border-white/40 hover:text-white transition-all"
                >
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-primary flex items-center justify-center text-xs font-bold">
              L
            </div>
            <span className="syne font-bold text-lg">LearnForge</span>
          </div>
          <p className="text-slate-600 text-sm">
            © 2026 LearnForge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showModal && (
        <div
          className="modal-overlay fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(null)}
        >
          <div className="slide-up bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="syne text-2xl font-bold">
                  {showModal === "login" ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {showModal === "login"
                    ? "Log in to continue learning"
                    : "Start your learning journey"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(null)}
                className="text-slate-500 hover:text-white text-2xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {showModal === "register" && (
                <div>
                  <label className="text-sm text-slate-400 block mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="text-sm text-slate-400 block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full rounded-xl py-3.5 font-semibold text-white mt-2"
              >
                {showModal === "login" ? "Login →" : "Create Account →"}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-5">
              {showModal === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setShowModal(showModal === "login" ? "register" : "login");
                  handleSubmit();
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                {showModal === "login" ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
