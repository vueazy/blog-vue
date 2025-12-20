<script setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="grid place-items-center h-screen">
    <Card class="mx-auto max-w-sm w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <router-link to="/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </router-link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full"> Login </Button>
        </div>
        <!-- <div class="mt-4 text-center text-sm">
          Don't have an account?
          <router-link to="/register" class="underline"> Sign up </router-link>
        </div> -->
      </CardContent>
    </Card>
  </div>
</template>
