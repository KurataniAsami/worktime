'use client'
import { useState } from "react";
import { Calendar } from "./src/components/Calendar";
import Link from "next/link";
import { useEventContext } from "./context/EventContext";

export type EventValues = {
  title: string
  start: Date
  // allDay: boolean       // 時刻表示なしの場合
}

// 型をセット(カレンダーにpropsを渡す)
export type Eventprops = {
  events: EventValues[]
}

export default function Home() {
  // const [events, setEvents] = useState<EventValues[]>([])
  const { events, setEvents } = useEventContext()
  const [startTime, setStartTime] = useState('')  // 表示用
  const [outTime, setOutTime] = useState('')

  const handleStartClick = () => {
    const now = new Date()
    setEvents((prev) => [
      ...prev,
      {
        title: '出勤',
        start: now,
      }
    ])

    setStartTime(
      now.toLocaleTimeString('ja-JP')
    )
  }

  const handleOutClick = () => {
    const now = new Date()
    setEvents((prev) => [
      ...prev,
      {
        title: '退勤',
        start: now,
        // allDay: true　　　// 時刻表示なしの場合
      }
    ])

    setOutTime(
      now.toLocaleTimeString('ja-JP')
    )
  }

  return (
    <div>
      <div className="flex flex-col mx-auto max-w-sm my-5 gap-5">
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handleStartClick}
            className="bg-blue-400 text-white p-5 text-2xl"
          >
            出勤
          </button>
          <p className="text-2xl">
            {startTime}
          </p>
        </div>

        <div className="flex justify-center items-center gap-5">
          <button
          onClick={handleOutClick}
          className="bg-red-400 text-white p-5 text-2xl"  
        >
          退勤
        </button>
        <p className="text-2xl">
            {outTime}
          </p>
        </div>
      </div>

      <Calendar events={events}/>

      <Link href={`/time-list`}>
        勤務時間一覧
      </Link>
    </div>
  );
}


