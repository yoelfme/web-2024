import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    const payload = {
        name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        password: body.password,
        country: body.country,
        gender: body.gender,
        accept_terms: body.terms
    }

    console.log(payload)

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: raw
    };

    const response = await fetch("http://localhost:8000/register", requestOptions);
    
    if (response.status === 201) {
        return NextResponse.json({ message: "User registered successfully" })
    } else {
        return NextResponse.json({ message: "User registered failed" }, { status: 400 })
    }
}