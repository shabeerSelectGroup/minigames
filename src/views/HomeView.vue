<template>
  <div class="min-h-screen mg-select-page">
    <div class="relative isolate overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-20 mg-dots mg-dots-anim" />

      <div class="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <main class="space-y-8">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h1 class="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                <span class="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent">
                  MiniGames
                </span>
              </h1>
              <div class="mt-1 text-sm font-semibold text-gray-700">Pick a card and play.</div>
            </div>
          </div>

          <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <router-link
              to="/task3"
              class="mg-select-card group relative overflow-hidden rounded-[26px] border border-white/40 p-5 text-white transition hover:-translate-y-1 hover:brightness-[1.04] active:translate-y-0 active:scale-[0.99]"
            >
              <div class="absolute left-5 top-4 text-6xl font-black tracking-tight text-white/18">01</div>
              <div class="relative mt-10 flex items-center gap-3">
                <div class="grid size-12 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/15 backdrop-blur">
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
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">Puzzle</span>
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">Matching</span>
              </div>
            </router-link>

            <router-link
              to="/task7"
              class="mg-select-card group relative overflow-hidden rounded-[26px] border border-white/40 p-5 text-white transition hover:-translate-y-1 hover:brightness-[1.04] active:translate-y-0 active:scale-[0.99]"
            >
              <div class="absolute left-5 top-4 text-6xl font-black tracking-tight text-white/18">02</div>
              <div class="relative mt-10 flex items-center gap-3">
                <div class="grid size-12 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/15 backdrop-blur">
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
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">Time</span>
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">History</span>
              </div>
            </router-link>

            <router-link
              to="/sketch-the-future"
              class="mg-select-card group relative overflow-hidden rounded-[26px] border border-white/40 p-5 text-white transition hover:-translate-y-1 hover:brightness-[1.04] active:translate-y-0 active:scale-[0.99]"
            >
              <div class="absolute left-5 top-4 text-6xl font-black tracking-tight text-white/18">03</div>
              <div class="relative mt-10 flex items-center gap-3">
                <div class="grid size-12 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/15 backdrop-blur">
                  🎨
                </div>
                <h3 class="text-xl font-black leading-tight">Vision Canvas</h3>
              </div>
              <ul class="relative mt-4 space-y-2 text-sm font-semibold text-white/90">
                <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Draw + stamps</li>
                <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Team ideas</li>
                <li class="flex gap-2"><span class="mt-1 size-1.5 shrink-0 rounded-full bg-white/80" />Present your poster</li>
              </ul>
              <div class="relative mt-5 flex flex-wrap gap-2">
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">Creative</span>
                <span class="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ring-1 ring-white/15">Workshop</span>
              </div>
            </router-link>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

