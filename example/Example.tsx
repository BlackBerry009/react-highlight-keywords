import React from 'react'
// import HighLightWords from '../src/index'
import HighLightWords from '../dist/esm/index'
import { useState } from 'react'

const Example = () => {
  const [words, setWords] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWords(e.currentTarget.value)
  }
  return (
    <div>
      <input type="text" value={words} onChange={handleChange} />
      <HighLightWords words={words}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui assumenda,
        optio maiores quas porro in similique nihil eligendi recusandae! Ullam
        suscipit cumque recusandae veritatis, rerum iusto optio architecto enim
        blanditiis! Necessitatibus earum doloremque aliquid quos, consectetur
        neque magni consequuntur id voluptas dignissimos sint a, harum esse iste
        tempora iure asperiores nam. Accusamus nisi aspernatur similique
        assumenda et nihil asperiores velit! Mollitia, amet vero? Quas non amet
        sequi aperiam beatae magni quis, fuga unde sapiente? Repudiandae,
        tempora impedit maxime at eos labore maiores veniam consectetur ipsam
        doloribus? Molestiae soluta odit numquam?
      </HighLightWords>
    </div>
  )
}

export { Example }
