import { Link } from "react-router-dom"

export const ErrorPage : React.FC = ()=>{
  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden px-3 py-2">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-800 "/>
      <div className="absolute -bottom-24 inset-x-16 h-48 bg-sky-400 blur-3xl opacity-40 animate-pulse" style={{borderRadius: '50%'}}/>
      <div className="fixed inset-0 grid place-content-center">
        <div className="p-8 py-6 border-sky-400 border-2 rounded-md bg-gray-800 shadow-sky-400 drop-shadow-2xl">
          <h1 className="font-cubano text-6xl text-sky-400">
            404
          </h1>
          <span>
            Something went wrong ... please go back to <Link to={'/init'} className="font-bold text-sky-400">home</Link>
          </span>
        </div>
      </div>
    </div>
    
  )
}