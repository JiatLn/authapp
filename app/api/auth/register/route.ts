import { connectMongo } from "@/lib/conn"
import { RegisterForm } from "@/types/index.types"
import { NextResponse } from "next/server"
import { hashSync } from 'bcrypt'
import { User } from "@/models/user"

export async function GET() {
  return NextResponse.json({
    message: '405 Method Not Allowed'
  }, {
    status: 405,
  })
}

export async function POST(request: Request) {
  const isConnect = await connectMongo()

  if (!isConnect) {
    return NextResponse.json({
      message: 'Internal Server Error',
    }, {
      status: 500,
    })
  }

  const body = await request.json() as Partial<RegisterForm>

  const { email, password, username } = body

  if (!email || !password || !username) {
    return NextResponse.json({
      message: 'Email, password, and username are required',
    }, {
      status: 400,
    })
  }

  const user = await User.findOne({ $or: [{ email }, { username }] })

  if (user) {
    return NextResponse.json({
      message: 'Email or username already exists',
    }, {
      status: 400,
    })
  }

  const hashedPassword = hashSync(password, 10)

  const newUser = await new User({
    username,
    email,
    password: hashedPassword
  })

  newUser.save()

  return NextResponse.json({
    message: 'User created successfully',
    id: newUser._id,
  }, {
    status: 200,
  })
}
