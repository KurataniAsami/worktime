'use client'
import { useEventContext } from "@/app/context/EventContext"

export default function TimeListPage() {
  const { events } = useEventContext()
  return (
    <div>
      {events.map((event,index) => (
        // DB接続したらevent.id
        <div key={index}>   
          <p>{event.start.toLocaleDateString('ja-JP')}</p>
          <p>{event.title}</p>
          <p>{event.start.toLocaleTimeString('ja-JP')}</p>
        </div>
      ))}
    </div>
  )
}