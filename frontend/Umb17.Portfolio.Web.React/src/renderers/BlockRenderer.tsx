import type { ComponentType } from 'react'
import type { UmbracoBlock } from '../types/umbraco'

type BlockComponent = ComponentType<{ block: UmbracoBlock }>

const blockComponents: Record<string, BlockComponent> = {}

type BlockRendererProps = {
  blocks?: UmbracoBlock[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks?.length) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.contentType]

        if (!Component) {
          return (
            <div
              className="rounded-md border border-dashed border-site-text-light/30 bg-site-text-light/5 p-4 text-sm text-site-text-light/60 dark:border-site-text-dark/30 dark:bg-site-text-dark/5 dark:text-site-text-dark/60"
              key={`${block.contentType}-${block.id ?? index}`}
            >
              No React block component registered for {block.contentType}.
            </div>
          )
        }

        return <Component block={block} key={block.id ?? index} />
      })}
    </>
  )
}
