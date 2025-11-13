<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
        🎮 MiniGames
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-lg">
        A collection of fun and educational mini-games
      </p>
    </header>
    
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- Puzzle Games Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🧩 Puzzle Games
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <router-link 
            to="/task3" 
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div class="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-2xl mb-4 text-indigo-500">
              🖋️
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">Icon Matcher</h3>
            <span class="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wide">
              Matching
            </span>
          </router-link>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-70 flex flex-col items-center text-center cursor-not-allowed">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4 text-gray-400">
              🧩
            </div>
            <h3 class="text-lg font-semibold text-gray-500 mb-1">Jigsaw Puzzle</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      <!-- Time-based Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          ⏳ Time-based
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <router-link 
            to="/task7" 
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
          >
            <div class="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-2xl mb-4 text-indigo-500">
              ⏳
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">Timeline Challenge</h3>
            <span class="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wide">
              History
            </span>
          </router-link>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-70 flex flex-col items-center text-center cursor-not-allowed">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4 text-gray-400">
              ⏱️
            </div>
            <h3 class="text-lg font-semibold text-gray-500 mb-1">Speed Quiz</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      <!-- Quick Play Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🎯 Quick Play
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-70 flex flex-col items-center text-center cursor-not-allowed">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4 text-gray-400">
              🔍
            </div>
            <h3 class="text-lg font-semibold text-gray-500 mb-1">Find the Difference</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 opacity-70 flex flex-col items-center text-center cursor-not-allowed">
            <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4 text-gray-400">
              🧠
            </div>
            <h3 class="text-lg font-semibold text-gray-500 mb-1">Trivia Quiz</h3>
            <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

