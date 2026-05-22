'use client'

import {
  useState,
  useContext,
  createContext,
  ReactNode
} from "react";
import { EventValues } from "../page";

// React.Dispatchは状態を更新する関数の型
type EventContextType = {
  events: EventValues[]
  setEvents: React.Dispatch<React.SetStateAction<EventValues[]>>
}

// createContextは「アプリ全体で共有できる箱を作る関数」
// | null → 最初は値がない可能性がある, null → 初期状態（空）
const EventContext = createContext<EventContextType | null>(null)

// EventProviderはContextの「データを全体に配る役」
export const EventProvider = ({
  children,
}: {
  children: ReactNode  // ReactNodeは文字列や配列などなんでも入れていい型
}) => {
  const [events, setEvents] = useState<EventValues[]>([])   // データをここで管理

  return (
    // Contextに「このデータを使ってと」渡す
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEventContext = () => {
  const context = useContext(EventContext)

  if (!context) {
    throw new Error('EventProviderで囲ってください')
  }

  return context
}

// NextLinkでリンクされているtime-listのみContextは配られている