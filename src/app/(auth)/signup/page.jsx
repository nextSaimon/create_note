"use client"
import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from 'lucide-react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary';
const SignupPage = ({ onSubmit, onLoginClick }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)
  const[error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);  // Start loading when the form is submitted
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image); // Ensure image is added correctly
  
    try {
      const res = await fetch('/api/singup', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      if (data.error) {
        setError(data.error); // Set error if API returns error
      } else {
        setSuccess(data.message); // Set success message if successful
        setName('');
        setEmail('');
        setPassword('');
        setImage(null);
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
      console.error(err);
    } finally {
      setLoading(false); // Stop loading after the request completes
      setTimeout(() => setSuccess(null), 2000); // Clear success message after 2 seconds
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-24 h-24 cursor-pointer" onClick={handleAvatarClick}>
                {image ? (
                  <AvatarImage src={image} alt="Profile" />
                ) : (
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Label htmlFor="image" className="cursor-pointer text-sm text-blue-500 hover:underline">
                Upload Profile Picture
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <p>{error && <span className="text-red-500">{error}</span>}</p>
            <p>{success && <span className="text-green-500">{success}</span>}</p>
            <p>{loading && <span className="text-blue-500">Loading...</span>}</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>Sign Up</Button>
            <p className="text-sm text-center">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
export default SignupPage