import { useNavigate } from "react-router-dom";

function Login() 

{
   const navigate = useNavigate();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-3xl 
        bg-white/70 backdrop-blur-lg 
        shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
        border border-white/40">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6 tracking-wide">
          Welcome back
        </h1>

        <form className="space-y-5" autoComplete="off">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="new-email"
              className="px-4 py-3 rounded-xl bg-white/80 
              shadow-inner 
              border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-orange-400 
              focus:shadow-lg transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              className="px-4 py-3 rounded-xl bg-white/80 
              shadow-inner 
              border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-orange-400 
              focus:shadow-lg transition duration-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-medium 
            bg-gradient-to-r from-orange-500 to-orange-600 
            shadow-lg shadow-orange-400/40
            hover:scale-[1.02] hover:shadow-orange-500/60 
            active:scale-[0.98] 
            transition duration-200"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6"
            onClick={()=>{navigate('/signup')}}
        >
          Don’t have an account?{" "}
          <span className="text-orange-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>

      </div>

    </main>
  );
}

export default Login;