<template>
  <div class="min-h-screen mg-mesh" ref="root" @mousemove="onMouseMove">
    <div class="relative isolate overflow-hidden">
      <div class="pointer-events-none absolute inset-0 mg-particles mg-particles-anim" />
      <div class="pointer-events-none absolute inset-0 mg-noise" />
      <div class="pointer-events-none absolute inset-0 mg-mouse-light" :style="mouseStyle" />

      <div class="mx-auto max-w-6xl px-4 py-9 md:px-8 md:py-12">
        <main class="space-y-7">
          <div class="text-center mg-head-float">
            <h1 class="text-3xl font-black tracking-tight text-white sm:text-4xl">
              <span class="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-amber-100 bg-clip-text text-transparent">MiniGames</span>
            </h1>
            <div class="mt-1 text-sm font-semibold text-white/65">Pick a card and play.</div>
          </div>

          <section class="mx-auto grid max-w-4xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <router-link
              to="/task3"
              class="mg-launch-card mg-float-card mg-enter group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-2 hover:scale-[1.02] active:translate-y-0 active:scale-[0.99]"
              style="--d: 40ms; --float-delay: 0ms; --float-jitter: 0.35s"
            >
              <div
                class="relative h-full"
                @mousemove.stop="onCardMove($event)"
                @mouseleave.stop="onCardLeave($event)"
              >
                <div class="relative flex items-center gap-3">
                  <div class="mg-icon grid size-11 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/15 backdrop-blur">
                    🖋️
                  </div>
                  <h3 class="text-xl font-black leading-tight">Icon Matcher</h3>
                </div>
                <ul class="relative mt-4 space-y-2 text-sm font-semibold text-white/90">
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Fast rounds</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Memory + focus</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Easy start</li>
                </ul>
                <div class="relative mt-5 flex flex-wrap gap-2">
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">Puzzle</span>
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">Matching</span>
                </div>
              </div>
            </router-link>

            <router-link
              to="/task7"
              class="mg-launch-card mg-float-card mg-enter group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-2 hover:scale-[1.02] active:translate-y-0 active:scale-[0.99]"
              style="--d: 120ms; --float-delay: 220ms; --float-jitter: 0.65s"
            >
              <div
                class="relative h-full"
                @mousemove.stop="onCardMove($event)"
                @mouseleave.stop="onCardLeave($event)"
              >
                <div class="relative flex items-center gap-3">
                  <div class="mg-icon grid size-11 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/15 backdrop-blur">
                    ⏳
                  </div>
                  <h3 class="text-xl font-black leading-tight">Timeline Challenge</h3>
                </div>
                <ul class="relative mt-4 space-y-2 text-sm font-semibold text-white/90">
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Race the clock</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Order events</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Medium difficulty</li>
                </ul>
                <div class="relative mt-5 flex flex-wrap gap-2">
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">Time</span>
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">History</span>
                </div>
              </div>
            </router-link>

            <router-link
              to="/sketch-the-future"
              class="mg-launch-card mg-float-card mg-enter group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-2 hover:scale-[1.02] active:translate-y-0 active:scale-[0.99]"
              style="--d: 200ms; --float-delay: 420ms; --float-jitter: 0.95s"
            >
              <div
                class="relative h-full"
                @mousemove.stop="onCardMove($event)"
                @mouseleave.stop="onCardLeave($event)"
              >
                <div class="relative flex items-center gap-3">
                  <div class="mg-icon grid size-11 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/15 backdrop-blur">
                    🎨
                  </div>
                  <h3 class="text-xl font-black leading-tight">Sketch the Future</h3>
                </div>
                <ul class="relative mt-4 space-y-2 text-sm font-semibold text-white/90">
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Draw + stamps</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Team ideas</li>
                  <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Present your poster</li>
                </ul>
                <div class="relative mt-5 flex flex-wrap gap-2">
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">Creative</span>
                  <span class="mg-launch-pill rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/15">Workshop</span>
                </div>
              </div>
            </router-link>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

defineOptions({ name: 'HomeView' })

const root = ref(null)
const mx = ref(0)
const my = ref(0)

const mouseStyle = computed(() => ({
  '--mx': `${mx.value}px`,
  '--my': `${my.value}px`,
}))

const onMouseMove = (e) => {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  mx.value = e.clientX - r.left
  my.value = e.clientY - r.top
}

// subtle parallax tilt per-card (no libs)
const onCardMove = (e) => {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  const rx = (-py * 6).toFixed(2)
  const ry = (px * 8).toFixed(2)
  card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`
}

const onCardLeave = (e) => {
  const card = e.currentTarget
  card.style.transform = ''
}
</script>

