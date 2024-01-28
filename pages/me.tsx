import { useState } from "react"
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
const inter = Inter({ subsets: ["latin"] });

export default function Me() {
    return (
        <div className={`flex flex-row justify-center items-center h-screen ${inter.className}`}>
            <form >
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="text-4xl">Welcome to Wingman!</h1>
                    <h2 className="text-xl py-3">We need a few more details to finish you account</h2>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <div className="flex flex-row justify-center items-center gap-3">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="border-2 border-secondary bg-transparent rounded h-10"  
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className="border-2 border-secondary bg-transparent rounded h-10"  
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center gap-3">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                          type="text"
                          id="lastName"
                          className="border-2 border-secondary bg-transparent rounded h-10"  
                      />
                      </div>
                    </div>
                    <button className="mt-5 bg-accent p-3 rounded" type="submit">Submit</button>
                </div>
            </form>
            <ModeToggle />
        </div>
    )
}