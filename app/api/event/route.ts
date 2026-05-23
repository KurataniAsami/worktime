import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../libs/prisma";

// 表示
export type EventIndexResponse = {
  id: number
  start: Date
  title: string
}[]

// paramsを使う場合は引数にrequestを入れる
export const GET = async () => {
  try {
    const events = await prisma.eventModel.findMany({  // findManyは複数
      select: {
        id: true,
        start: true,
        title: true
      }
    })

    // start: Dateは下記を通るとstringになる
    return NextResponse.json<EventIndexResponse>(   // ここ
      events,
      { status: 200 }   // 取得成功は200
    )
  } catch(error) {
    if(error instanceof Error) 
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// POST
export type CreateEventRequestBody = {
  start: Date
  title: string
}

// (request: NextRequest)は送られてきた内容をrequestから取り出す
export const POST = async (request: NextRequest) => {
  try {
    // 送られてきたJSONをJavaScript object に変換
    const body: CreateEventRequestBody = await request.json()

    const { start, title } = body   // 変換した物がこれ

    const data = await prisma.eventModel.create({
      data: {
        start,
        title
      }
    })

    return NextResponse.json(data, { status: 201 })   // 作成成功は201
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message}, { status: 400 })
  }
}