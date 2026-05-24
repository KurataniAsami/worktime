'use client'
import { useEventContext } from "@/app/context/EventContext"
import { useEffect } from "react"

export default function TimeListPage() {
  const { events, setEvents } = useEventContext()

  useEffect(() => {
    const getAllEvents = async () => {
      const res = await fetch('/api/event')
      const data = await res.json()

      setEvents(data)
    }

    getAllEvents()
  }, [setEvents])

  return (
    <div>
      {events.map((event,index) => {
        // APIでstringになってしまうのをDateにする
        const startDate = new Date(event.start)
        // DB接続したらevent.id
        return (
        <div key={index}>   
          <p>{new Date(event.start).toLocaleDateString('ja-JP')}</p>
          <p className="border inline-block">{event.title}</p>
          <p>{new Date(event.start).toLocaleTimeString('ja-JP')}</p>
          <hr/>
        </div>
        )
      })}
    </div>
  )
}