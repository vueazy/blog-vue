<script setup>
import { ref } from "vue";
import
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="card w-96 bg-base-100 card-lg shadow-sm">
      <div class="card-body">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-neutral"
          >
            Sign in to your account
          </h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-neutral"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autocomplete="email"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-neutral outline-1 -outline-offset-1 outline-neutral/30 placeholder:text-neutral focus:outline-2 focus:-outline-offset-2 focus:outline-neutral sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-neutral"
                  >Password</label
                >
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-neutral outline-1 -outline-offset-1 outline-neutral/30 placeholder:text-neutral focus:outline-2 focus:-outline-offset-2 focus:outline-neutral sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button type="submit" class="flex w-full btn btn-neutral">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
