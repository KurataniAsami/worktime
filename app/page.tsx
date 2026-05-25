'use client'
import { useEffect, useState } from "react";
import { Calendar } from "./src/components/Calendar";
import Link from "next/link";
import { useEventContext } from "./context/EventContext";
import { EventIndexResponse, CreateEventRequestBody } from "./api/event/route";

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

  useEffect(() => {
    const getAllEvents = async () => {
      const res = await fetch(`/api/event`)
      const data = await res.json()

      const formatted = data.map((event: EventValues) => ({
        ...event,
        start: new Date(event.start)
      }))

      setEvents(formatted)
    }

    getAllEvents()
  },[])

  // handleStartClick と handleOutClickの共通関数
  const createEvent = async (title: string) => {
    const now = new Date()

    const body: CreateEventRequestBody = {
      title,
      start: now,
    }

    const res = await fetch(`/api/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    setEvents((prev) => [
      ...prev,
      data
    ])

    return now
  }

  const handleStartClick = async () => {
    const now = await createEvent('出勤')

    setStartTime(
      now.toLocaleTimeString('ja-JP')
    )
  }

  const handleOutClick = async () => {
    const now = await createEvent('退勤')

    setOutTime(
      now.toLocaleTimeString('ja-JP')
    )
  }

  // const handleStartClick = () => {
  //   const now = new Date()
  //   setEvents((prev) => [
  //     ...prev,    // prevは必ず配列でないといけない、オブジェクトだとエラー
  //     {
  //       title: '出勤',
  //       start: now,
  //     }
  //   ])

  //   setStartTime(
  //     now.toLocaleTimeString('ja-JP')
  //   )
  // }

  // const handleOutClick = () => {
  //   const now = new Date()
  //   setEvents((prev) => [
  //     ...prev,
  //     {
  //       title: '退勤',
  //       start: now,
  //       // allDay: true　　　// 時刻表示なしの場合
  //     }
  //   ])

  //   setOutTime(
  //     now.toLocaleTimeString('ja-JP')
  //   )
  // }

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

      <Link
        href={`/time-list`}
        className="bg-gray-300 p-3 text-xl my-3"  
      >
        勤務時間一覧
      </Link>
    </div>
  );
}

// docker起動
// docker start postgres

// 本番環境
