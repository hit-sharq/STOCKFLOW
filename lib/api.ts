import { NextResponse } from 'next/server'

export function apiResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function apiValidationError(errors: Record<string, string[]>) {
  return NextResponse.json(
    { success: false, error: 'Validation failed', errors },
    { status: 400 }
  )
}
