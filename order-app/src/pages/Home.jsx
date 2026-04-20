import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-slate-50">
      <div className="max-w-4xl text-center px-6">
        <h1 className="text-6xl font-black text-slate-900 mb-6 leading-tight">
          Streamline your <span className="text-blue-600">Workflow</span> with
          ease.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The modern solution for order tracking, inventory management, and
          business logistics. Built for scale, designed for speed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/order"
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-2xl"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            Live Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
