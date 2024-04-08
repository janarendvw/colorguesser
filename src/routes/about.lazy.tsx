import { createLazyFileRoute } from '@tanstack/react-router'
import { ColorValidator} from '../utils/ColorFabric'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {

  const points = ColorValidator.validateHex('#ff0000', '#ff0000')
  return <div className="p-2">{points}</div>
}