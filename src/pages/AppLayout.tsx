import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { initUnlocks } from "../utils/initUtils"

function AppLayout() {
  useEffect(()=>{
    initUnlocks()
  },[])

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden px-3 py-2">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-800 "/>
      <div className="absolute -bottom-24 inset-x-16 h-48 bg-sky-400 blur-3xl opacity-40 animate-pulse" style={{borderRadius: '50%'}}/>
      <div className="absolute inset-0 p-3 py-2">
        <Outlet/>
      </div>
      <span className="fixed bottom-0 right-0 text-xs text-gray-100 opacity-50 hover:opacity-100">My Personal Portfolio <a href="https://erickfons.me" target="_blank" className="text-sky-400">erickfons.me</a></span>
    </div>
  )
}

export default AppLayout
