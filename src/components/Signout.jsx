"use client"
import React from 'react'
import { signOut } from "next-auth/react"

export default function Signout() {
  return (
    <button
          onClick={signOut}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Sign Out
        </button>
  )
}
