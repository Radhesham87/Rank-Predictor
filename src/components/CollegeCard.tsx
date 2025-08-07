"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CollegeForm() {
  const [neetMark, setNeetMark] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const mark = parseInt(neetMark)

    if (!neetMark || isNaN(mark) || mark < 0 || mark > 720) {
      setError("Please enter a valid NEET mark between 0 and 720")
      return
    }

    setError("")
    // Navigate to results page with mark as query
    router.push(`/results?mark=${mark}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">College Predictor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="neetMark">Enter Your NEET Mark</Label>
              <Input
                id="neetMark"
                type="number"
                placeholder="Enter NEET mark out of 720"
                value={neetMark}
                onChange={(e) => setNeetMark(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CollegeForm
