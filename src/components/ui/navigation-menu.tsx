"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        CollegeFinder
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/colleges">Colleges</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-4">
        {/* Login Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline">Login</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Login</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">
                Enter your credentials to access your account.
              </Dialog.Description>
              <form className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Sign Up Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Sign up</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">Sign Up</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">
                Create your account to get started.
              </Dialog.Description>
              <form className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email-signup" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password-signup" type="password" placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
              <Dialog.Close asChild>
                <button
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}
