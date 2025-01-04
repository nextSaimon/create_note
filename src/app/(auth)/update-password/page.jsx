'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import {useRouter} from 'next/navigation'

export default function PasswordResetForm() {
  const[oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password === oldPassword) {
        setError('Password cannot be the same as the old password.')
        return
      }
    try {
      const res = await fetch('/api/private/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, password, confirmPassword }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setSuccess(true)
        setError('')
        setOldPassword('')
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => {
          router.push('/')
        }, 2000)
       
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred. Please try again.')
    }
  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Old Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <hr/>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 mt-4 text-red-500">
                <AlertCircle size={16} />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 mt-4 text-green-500">
                <CheckCircle2 size={16} />
                <p className="text-sm">Password reset successfully!</p>
              </div>
            )}
            <Button className="w-full mt-6" type="submit">Reset Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
