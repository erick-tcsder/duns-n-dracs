import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { NameGenerationService } from "../../services/NameGenerationService"

export type NameGeneratorContextType = {
  generateName: (size?:number)=>string;
  generateNameArray: (size:number)=>string[];
}

export const nameGeneratorContext = createContext<NameGeneratorContextType>({
  generateName: ()=>{return ""},
  generateNameArray: ()=>{return []}
})

export const NameGeneratorContextProvider : React.FC<PropsWithChildren> = (props)=>{
  const generatorServiceRef = useRef<NameGenerationService | null>()
  const [contextLoading,setContextLoading] = useState(true)

  useEffect(()=>{
    generatorServiceRef.current = new NameGenerationService(3,true)
    setContextLoading(false)
  },[])
  
  const genName = useCallback((s?:number)=>{
    return generatorServiceRef.current?.generateWord(s) || ""
  },[contextLoading])
  const genNameArr = useCallback((s: number)=>{
    return generatorServiceRef.current?.generateWordArray(s) || []
  },[contextLoading])

  return <nameGeneratorContext.Provider value={{
    generateName: genName,
    generateNameArray: genNameArr
  }}>
    {props.children}
  </nameGeneratorContext.Provider>
}

export const useNameGeneratorContext = ()=>{
  return useContext(nameGeneratorContext)
}