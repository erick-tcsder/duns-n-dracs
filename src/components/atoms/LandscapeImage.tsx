import forestURL from '../../pictures/landscapes/forest.jfif'
import desertURL from '../../pictures/landscapes/desert.jfif'
import hillURL from '../../pictures/landscapes/hill.jfif'
import badlandsURL from '../../pictures/landscapes/badlands.jfif'
import citadelURL from '../../pictures/landscapes/citadel.jfif'

import forestURLp from '../../pictures/landscapes/forest-portrait.jfif'
import desertURLp from '../../pictures/landscapes/desert-portrait.jfif'
import hillURLp from '../../pictures/landscapes/hill-portrait.jfif'
import badlandsURLp from '../../pictures/landscapes/badlands-portrait.jfif'
import citadelURLp from '../../pictures/landscapes/citadel-portrait.jfif'
import classNames from 'classnames'

const urlMapped : Record<string,string> = {
  "magic-forest":forestURL,
  "dusty-desert": desertURL,
  "hill-of-the-winds": hillURL,
  "the-badlands": badlandsURL,
  "void-citadel": citadelURL,
}

const urlMappedPortrait : Record<string,string> = {
  "magic-forest":forestURLp,
  "dusty-desert": desertURLp,
  "hill-of-the-winds": hillURLp,
  "the-badlands": badlandsURLp,
  "void-citadel": citadelURLp,
}

const stageColor : Record<string,string> = {
  "magic-forest": "bg-green-500",
  "dusty-desert": "bg-yellow-500",
  "hill-of-the-winds": "bg-blue-500",
  "the-badlands": "bg-orange-500",
  "void-citadel": "bg-violet-500",
}

const stageIcon : Record<string,string> = {
  "magic-forest": "fas fa-tree",
  "dusty-desert": "fas fa-sun",
  "hill-of-the-winds": "fas fa-dragon",
  "the-badlands": "fas fa-fire",
  "void-citadel": "fas fa-skull",
}

export interface LandscapeImageProps {
  stage: string;
  classname?: string;
  portrait?: boolean;
  backBlured?: boolean;
}

export const LandscapeImage : React.FC<LandscapeImageProps> = (props)=>{
  return (
    <div className={props.classname ?? '' +'relative'}>
      {props.backBlured && (
        <img src={(props.portrait ? urlMappedPortrait : urlMapped)[props.stage] ?? ''} alt={props.stage} className="absolute inset-0 -bottom-24 top-24 blur-3xl object-cover"/>
      )}
      <img src={(props.portrait ? urlMappedPortrait : urlMapped)[props.stage] ?? ''} alt={props.stage} className="relative object-cover"/>
      <div className='relative inset-x-0 flex justify-center -mt-8'>
        <div className='relative'>
          <div className={classNames('aspect-square p-5 rounded-full relative grid place-content-center text-2xl',stageColor[props.stage])}>
            <span className={classNames('absolute -inset-3 animate-pulse rounded-full blur-xl',stageColor[props.stage])}/>
            <i className={classNames('relative',stageIcon[props.stage])}/>
          </div>
        </div>
      </div>
    </div>
  )
}