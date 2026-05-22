import './globals.css'
import { EventProvider } from "./context/EventContext";

export default function Rootlayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <EventProvider>
          {children}
        </EventProvider>
      </body>
    </html>
  )
}

// Readonlyはpropsを受け取るだけで、このデータは変更しないでねというTypeScriptの制約