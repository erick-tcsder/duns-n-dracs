import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RedirectionPage : React.FC = ()=>{
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/init')
  },[])
  return null
}