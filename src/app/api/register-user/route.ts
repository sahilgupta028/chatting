import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function capitalizeName(name: string) {
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(req: Request) {
  const { fullName, email, phone, password } = await req.json();
  console.log(fullName, email, phone, password);

  if (!fullName || !email || !phone || !password) {
    return NextResponse.json({ message: "Already registered" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Already registered" }, { status: 400 });
    }

    // Hash password
    const name = capitalizeName(fullName);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName: name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Registered successfully", fullName }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}
