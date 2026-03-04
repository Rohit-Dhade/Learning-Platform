import { use, useEffect, useState } from "react";
import { get_course } from "../services/course.api";
import { useParams } from "react-router-dom";

/* ─────────────────────────── DATA ─────────────────────────── */
const course = {
  icon: "⚛️",
  title: "React Mastery",
  level: "Intermediate",
  lessons: 42,
  duration: "18h 30m",
  students: "12,400",
  rating: 4.9,
  color: "from-cyan-400 to-blue-500",
  accent: "#22d3ee",
  instructor: {
    name: "Alex Carter",
    role: "Senior Frontend Engineer",
    avatar: "AC",
  },
  description:
    "Deep-dive into React's ecosystem — hooks, context, performance optimisation, and building scalable component architectures used in production apps.",
  whatYouLearn: [
    "Master React Hooks (useState, useEffect, useRef, useMemo)",
    "Build reusable component libraries",
    "State management with Context API & Zustand",
    "Performance optimisation and lazy loading",
    "Testing with React Testing Library",
    "Deploy production-ready apps",
  ],
  curriculum: [
    { week: "Week 1", topic: "Foundations & JSX Deep Dive", lessons: 8 },
    { week: "Week 2", topic: "Hooks & State Management", lessons: 10 },
    { week: "Week 3", topic: "Routing & Data Fetching", lessons: 9 },
    { week: "Week 4", topic: "Performance & Testing", lessons: 8 },
    { week: "Week 5", topic: "Real-world Project", lessons: 7 },
  ],
};

/* ─────────────────────────── STARS ─────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{ color: i <= Math.round(rating) ? "#facc15" : "#334155" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function CoursePage() {
  const [enrolled, setEnrolled] = useState(false);
  const [openWeek, setOpenWeek] = useState(0);
  const [isLoggedIn] = useState(false);

  const [courseInfo, setcourseInfo] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetch_course = async () => {
      try {
        const data = await get_course(id);
        setcourseInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) fetch_course();
  }, [id]);

  if (!courseInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .syne { font-family: 'Syne', sans-serif; }
        .orb { filter: blur(80px); opacity: 0.13; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.5); }
        .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.4); }
        .accordion-btn { transition: background 0.2s; }
        .accordion-btn:hover { background: rgba(255,255,255,0.04); }
        .chevron { transition: transform 0.25s ease; }
      `}</style>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="orb absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full" />
        <div
          className="orb absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: course.accent }}
        />
        <div className="orb absolute top-1/2 left-0 w-64 h-64 bg-violet-600 rounded-full" />
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
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            {["Home", "Courses", "Mentors", "Pricing"].map((item) => (
              <button key={item} className="hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>
          {/* <div className="flex items-center gap-3">
            <button className="text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 transition-all">
              Login
            </button>
            <button className="btn-primary text-sm font-semibold rounded-lg px-4 py-2 text-white">
              Register
            </button>
          </div> */}
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <button className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button className="hover:text-white transition-colors">
              Courses
            </button>
            <span>/</span>
            <span className="text-white">{courseInfo && courseInfo.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Block */}
              <div>
                <div
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${course.color} rounded-full px-3 py-1 mb-4`}
                >
                  <span className="text-xs font-bold text-white uppercase tracking-widest">
                    {courseInfo && courseInfo.level}
                  </span>
                </div>
                <h1 className="syne text-5xl font-extrabold text-white leading-tight mb-4">
                  {course.icon} {courseInfo && courseInfo.title}
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {courseInfo && courseInfo.description}
                </p>
              </div>

              {/* Meta Bar */}
              <div className="flex flex-wrap gap-5 py-4 border-y border-white/5 text-sm">
                <div className="flex items-center gap-2">
                  <Stars rating={courseInfo && courseInfo.rating} />
                  <span className="text-white font-semibold">
                    {courseInfo && courseInfo.rating}
                  </span>
                  <span className="text-slate-500">rating</span>
                </div>
                <span className="text-slate-400">
                  👥{" "}
                  <strong className="text-white">
                    {courseInfo && courseInfo.students}
                  </strong>{" "}
                  students
                </span>
                <span className="text-slate-400">
                  📚{" "}
                  <strong className="text-white">
                    {courseInfo && courseInfo.lessons}
                  </strong>{" "}
                  lessons
                </span>
                <span className="text-slate-400">
                  ⏱{" "}
                  <strong className="text-white">
                    {courseInfo && courseInfo.duration}
                  </strong>
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-5 bg-white/3 border border-white/5 rounded-2xl">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${course.color} flex items-center justify-center text-lg font-bold text-white shrink-0`}
                >
                  {courseInfo && courseInfo.instructor.avatar}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">
                    Your Instructor
                  </p>
                  <p className="syne text-lg font-bold text-white">
                    {courseInfo && courseInfo.instructor.name}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {courseInfo && courseInfo.instructor.role}
                  </p>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
                <h2 className="syne text-xl font-bold text-white mb-5">
                  What you'll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {courseInfo &&
                    courseInfo.whatYouLearn.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <span
                          className="mt-0.5 shrink-0 font-bold"
                          style={{ color: course.accent }}
                        >
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                </div>
              </div>

              {/* Curriculum Accordion */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="syne text-xl font-bold text-white">
                    Course Curriculum
                  </h2>
                  <span className="text-xs text-slate-500">
                    {courseInfo && courseInfo.lessons} total lessons
                  </span>
                </div>
                <div className="space-y-2">
                  {courseInfo &&
                    courseInfo.curriculum.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/3 border border-white/5 rounded-xl overflow-hidden"
                      >
                        <button
                          className="accordion-btn w-full flex items-center justify-between px-5 py-4 text-left rounded-xl"
                          onClick={() => setOpenWeek(openWeek === i ? null : i)}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                              style={{
                                background: course.accent + "22",
                                color: course.accent,
                              }}
                            >
                              {i + 1}
                            </span>
                            <div>
                              <span
                                className="text-xs font-semibold uppercase tracking-wider mr-2"
                                style={{ color: course.accent }}
                              >
                                {item.week}
                              </span>
                              <span className="text-white text-sm font-medium">
                                {item.topic}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-slate-500 text-xs shrink-0 ml-2">
                            <span>{item.lessons} lessons</span>
                            <span
                              className="chevron"
                              style={{
                                transform:
                                  openWeek === i
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                              }}
                            >
                              ▾
                            </span>
                          </div>
                        </button>
                        {openWeek === i && (
                          <div className="px-5 pb-4 border-t border-white/5">
                            <div className="grid grid-cols-2 gap-2 pt-3">
                              {Array.from({ length: item.lessons }).map(
                                (_, j) => (
                                  <div
                                    key={j}
                                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer transition-colors py-1"
                                  >
                                    <span style={{ color: course.accent }}>
                                      ▶
                                    </span>
                                    Lesson {j + 1} — Topic {j + 1}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Enroll Card ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Banner */}
                <div
                  className={`bg-gradient-to-br ${course.color} h-40 flex items-center justify-center`}
                >
                  <span className="text-7xl">{course.icon}</span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="syne text-4xl font-extrabold text-white">
                        Free
                      </span>
                      <span className="text-slate-500 line-through text-sm">
                        $49.99
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                        100% OFF
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      ⏳ Limited time offer
                    </p>
                  </div>

                  {/* CTA */}
                  {enrolled ? (
                    <div className="text-center py-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold text-sm">
                      ✓ You're enrolled!
                    </div>
                  ) : (
                    <button
                      onClick={() => setEnrolled(true)}
                      className="btn-primary w-full rounded-xl py-3.5 font-semibold text-white text-base"
                    >
                      {isLoggedIn ? "Enroll Now →" : "Login to Enroll →"}
                    </button>
                  )}

                  {/* Course Details */}
                  <div className="space-y-3 text-sm border-t border-white/5 pt-4">
                    {[
                      ["Duration", course.duration],
                      ["Lessons", course.lessons],
                      ["Level", course.level],
                      ["Students", course.students],
                      ["Certificate", "Yes, on completion"],
                      ["Access", "Lifetime"],
                      ["Language", "English"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-500">{k}</span>
                        <span className="text-white font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Share / Wishlist */}
                  <div className="flex gap-2 pt-1">
                    {["Share", "Wishlist"].map((label) => (
                      <button
                        key={label}
                        className="flex-1 text-xs text-slate-400 border border-white/10 rounded-lg py-2 hover:border-white/30 hover:text-white transition-all"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
