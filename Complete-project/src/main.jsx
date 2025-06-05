// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// // <<<<<<< HEAD

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
// =======
// import AuthProvider from './context/AuthProvider.jsx' // Import AuthProvider

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider> {/* Wrap App with AuthProvider */}
//       <App />
//     </AuthProvider>
// {/* >>>>>>> 2ece81d (Initial commit with new features) */}
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx' // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
)
