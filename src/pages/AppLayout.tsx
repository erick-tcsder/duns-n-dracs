import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden px-3 py-2">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-800 "/>
      <div className="absolute -bottom-24 inset-x-16 h-48 bg-sky-400 blur-3xl opacity-40 animate-pulse" style={{borderRadius: '50%'}}/>
      <div className="absolute inset-0 p-3 py-2">
        <Outlet/>
      </div>
    </div>
  )
}

export default AppLayout
