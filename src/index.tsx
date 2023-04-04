import React, { PropsWithChildren, useEffect } from 'react'
import './index.css'

interface Props {
  words: string
}

export default function HighlightWords({
  words,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    const highlightElement = document.getElementById(
      'highlight-container'
    ) as HTMLDivElement
    const treeWalker = document.createTreeWalker(
      highlightElement,
      NodeFilter.SHOW_TEXT
    )
    const allTextNodes: Node[] = []
    let currentNode = treeWalker.nextNode()
    while (currentNode) {
      allTextNodes.push(currentNode)
      currentNode = treeWalker.nextNode()
    }

    if (!(CSS as any).highlights) {
      console.log('CSS Custom Highlight API not supported.')
      return
    }

    ;(CSS as any).highlights.clear()

    const ranges = allTextNodes
      .map((el) => {
        return { el, text: el.textContent }
      })
      .map(({ text, el }) => {
        const indices = []
        let startPos = 0
        while (text && startPos < text.length) {
          const index = text.indexOf(words, startPos)
          if (index === -1) break
          indices.push(index)
          startPos = index + words.length
        }

        return indices.map((index) => {
          const range = new Range()
          range.setStart(el, index)
          range.setEnd(el, index + words.length)
          return range
        })
      })
    // @ts-ignore
    const searchResultsHighlight = new Highlight(...ranges.flat()) // @ts-ignore
    window.s = searchResultsHighlight;
    ;(CSS as any).highlights.set('results', searchResultsHighlight)
  }, [words])

  return <div id="highlight-container">{children}</div>
}
