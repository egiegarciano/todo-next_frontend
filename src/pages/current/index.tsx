import Section from '@/components/Section'
import { currentTodos } from '@/constants/currentTodos'

const CurrentTodo = () => {
  return (
    <Section title='Current Todos'>
      {currentTodos.map((item) => (
        <div key={item.title}>
          <div>{item.title}</div>
          <div>{item.memo}</div>
          <div>{item.is_important}</div>
        </div>
      ))}
    </Section>
  )
}

export default CurrentTodo
