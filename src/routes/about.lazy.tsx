import { createLazyFileRoute } from '@tanstack/react-router'
import ColorGenerator from '../utils/color-generator2'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {

  const points = ColorGenerator.validateHex('#ff0000', '#ff0000')
  return <div className="p-2">{points}</div>
}