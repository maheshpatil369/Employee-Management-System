// import React, { useState } from 'react';

// const Login = ({ handleLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const submitHandler = (e) => {
//     e.preventDefault();
//     handleLogin(email, password);
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
//       <div className="bg-gray-800 border border-emerald-600 rounded-2xl p-10 sm:p-12 w-full max-w-xl shadow-2xl">
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold text-emerald-400 mb-2">Welcome to TaskOps Pro</h1>
//           <p className="text-gray-400 text-sm">
//             A secure system to manage <span className="text-emerald-300 font-medium">Employees & Admins</span>.  
//             Keep track of tasks, view progress, and collaborate effectively.
//           </p>
//         </div>

//         <div className="mb-8 space-y-2 text-sm text-gray-300">
//           <p>✅ Admin & Employee role-based login</p>
//           <p>✅ Task progress tracking: New, Accepted, Completed, Failed</p>
//           <p>✅ Real-time task updates & performance monitoring</p>
//           <p>✅ Secure login with localStorage session</p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={submitHandler} className="space-y-5">
//           <input
//             type="email"
//             required
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-5 py-3 rounded-full bg-gray-700 border border-emerald-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <input
//             type="password"
//             required
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-5 py-3 rounded-full bg-gray-700 border border-emerald-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <button
//             type="submit"
//             className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-full text-lg font-semibold transition duration-300 cursor-pointer"
//           >
//             Log in
//           </button>
//          <div className="mt-4 text-sm text-gray-500 text-center">
//   <p className="mb-1 font-semibold">Demo Credentials</p>
//   <p>👤 <strong>Admin</strong> – admin@example.com | 123</p>
//   <p>👷 <strong>Employee 1</strong> – employee2@example.com | 123</p>
//   <p>👷 <strong>Employee 2</strong> – employee3@example.com | 123</p>
// </div>

//         </form>

//         <p className="text-center text-xs mt-6 text-gray-500">
//           © 2025 TaskOps Pro. Built for smarter task management.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 overflow-hidden">
      <div className="bg-gray-800 border border-emerald-600 rounded-2xl p-6 sm:p-12 w-full max-w-xl shadow-2xl">
        
        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-emerald-400 mb-2">Welcome to TaskOps Pro</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            A secure system to manage <span className="text-emerald-300 font-medium">Employees & Admins</span>.  
            Keep track of tasks, view progress, and collaborate effectively.
          </p>
        </div>

        <div className="mb-8 space-y-1 text-xs sm:text-sm text-gray-300">
          <p>✅ Admin & Employee role-based login</p>
          <p>✅ Task progress tracking: New, Accepted, Completed, Failed</p>
          <p>✅ Real-time task updates & performance monitoring</p>
          <p>✅ Secure login with localStorage session</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-2 sm:py-3 rounded-full bg-gray-700 border border-emerald-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-2 sm:py-3 rounded-full bg-gray-700 border border-emerald-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
          />
          <button
            type="submit"
            className="w-full py-2 sm:py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm sm:text-lg font-semibold transition duration-300"
          >
            Log in
          </button>

          <div className="mt-4 text-[11px] sm:text-sm text-gray-400 text-center leading-relaxed">
            <p className="mb-1 font-semibold text-white">Demo Credentials</p>
            <p>👤 <strong>Admin</strong> – admin@example.com | 123</p>
            <p>👷 <strong>Employee 1</strong> – employee2@example.com | 123</p>
            <p>👷 <strong>Employee 2</strong> – employee3@example.com | 123</p>
          </div>
        </form>

        <p className="text-center text-[10px] sm:text-xs mt-6 text-gray-500">
          © 2025 TaskOps Pro. Built for smarter task management.
        </p>
      </div>
    </div>
  );
};

export default Login;
