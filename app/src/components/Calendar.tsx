// npm install @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid
// clientでしか使えない
'use client'

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"

export const Calendar = () => {
  // ここの部分にpropsを入れる,titleとstartの中身の部分

  const events = [
    { title: '出勤', start: new Date(), allday: true,},
    { title: '退勤', start: new Date(), allday: true},
  ]

  return (
    <FullCalendar
      locale={jaLocale}   // 月の表示部分を日本語にする
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      firstDay={1}  // 月曜始まり、デフォルトは日曜
      events={events}
      displayEventTime={false}   // 時刻表示オフ

      // CSS
      // 休みの曜日のマスを青にする
      dayCellClassNames={(arg) => {
        if (arg.date.getDay() === 1) {
          return ['bg-blue-50']
        }

        if (arg.date.getDay() === 5) {
          return ['bg-blue-50']
        }

        return []
      }}

      // ヘッダー部分
      dayHeaderClassNames={(arg) => {
        if (arg.date.getDay() === 1) {
          return ['text-blue-500']
        }

        if (arg.date.getDay() === 5) {
          return ['text-blue-500']
        }

        return []
      }}
    />
  )
}
