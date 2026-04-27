<template>
  <div class="min-h-screen mg-arcade-page p-3 md:p-6 transition-colors duration-300">
    <div class="pointer-events-none absolute inset-0 mg-arcade-sparkles mg-arcade-sparkles-anim"></div>
    <div class="max-w-3xl mx-auto">
      <!-- Header Section -->
      <div class="relative mg-arcade-card rounded-xl p-5 mb-6 transition-all duration-200 hover:shadow-sm">
        <div class="text-center space-y-1">
          <div class="flex flex-col items-center -mb-1">
            <img src="@/assets/logo.png" alt="Logo" class="h-10 md:h-12 w-auto">
            <h1 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
              Urban Navigator
              <div class="text-xs md:text-sm font-medium text-white/60">Sharjah – Al Noor Mosque / Art Museum</div>
            </h1>
          </div>
          <div class="w-12 h-0.5 bg-gradient-to-r from-cyan-300 to-fuchsia-300 mx-auto my-1.5 rounded-full"></div>
          <h2 class="text-base text-white/75 font-medium">QR Match of Meaning</h2>
        </div>

        <p class="text-sm text-white/70 text-center max-w-2xl mx-auto mt-3 mb-4 leading-relaxed">
          Match the icons with their corresponding meanings by dragging and dropping.
        </p>

        <!-- Progress Bar -->
        <div class="mt-5">
          <div class="flex justify-between text-xs text-white/60 mb-1">
            <span>Progress</span>
            <span class="font-medium">{{ Math.round(progress) }}%</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 transition-all duration-500 ease-out"
              :style="{ width: `${progress}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Matching Game -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <!-- Left Column - Icons -->
        <div class="relative mg-arcade-card rounded-xl p-6">
          <h3 class="text-center text-lg font-semibold text-cyan-200 mb-4 pb-2 border-b border-white/10">Icons</h3>
          <div class="space-y-3">
            <div v-for="(item, index) in items" :key="'item-' + index" draggable="true"
              @dragstart="onDragStart($event, index, 'item')" @dragend="onDragEnd" class="draggable-item" :class="[
                'p-4 rounded-lg border-2 transition-all duration-200 cursor-move select-none text-lg',
                item.matched
                  ? 'bg-emerald-400/10 border-emerald-300/40 text-emerald-100 pr-10 relative'
                  : 'bg-white/5 border-white/10 hover:border-cyan-300/40 hover:shadow-md',
                item.matched ? 'matched-item' : ''
              ]">
              <div class="flex items-center space-x-2">
                <span class="text-xl">{{ item.name.split(' ')[item.name.split(' ').length - 1] }}</span>
                <span>{{ item.name.split(' ').slice(0, -1).join(' ') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Meanings -->
        <div class="relative mg-arcade-card rounded-xl p-6">
          <h3 class="text-center text-lg font-semibold text-cyan-200 mb-4 pb-2 border-b border-white/10">Meanings</h3>
          <div class="space-y-3">
            <div v-for="(meaning, index) in meanings" :key="'meaning-' + index" @dragover.prevent
              @drop="onDrop($event, index, 'meaning')" :class="[
                'p-4 rounded-lg transition-all duration-200 min-h-[60px]',
                meaning.matched && meaning.correct
                  ? 'bg-emerald-400/10 border-2 border-emerald-300/40'
                  : meaning.matched && !meaning.correct
                    ? 'bg-rose-400/10 border-2 border-rose-300/40 shake-animation'
                    : 'bg-white/5 border-2 border-dashed border-white/15 hover:border-cyan-300/40 hover:bg-cyan-300/5',
                'drop-zone',
                { 'highlight': isDraggingOver === index }
              ]">
              <div class="font-medium text-white/90">{{ meaning.text }}</div>
              <div v-if="meaning.matchedItemIndex !== null"
                class="mt-2 p-2 bg-black/20 rounded border-l-4 border-amber-300 text-sm text-white/80 shadow-sm animate-fade-in">
                {{ items[meaning.matchedItemIndex].name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="allMatched"
        class="mt-8 p-8 text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200 animate-fade-in">
        <div class="text-4xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold text-green-700 mb-3">Level Complete! 🎉</h3>
        <p class="text-gray-700 mb-4">Perfect! You've matched all items correctly!</p>
        <p class="text-lg font-medium mb-6">Your final score: <span class="text-blue-600 font-bold">{{ score }}
            points</span></p>
        <button @click="resetGame"
          class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
          Play Again
        </button>
      </div>

      <!-- Game Over Message -->
      <div v-if="gameOver"
        class="mt-8 p-8 text-center bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-200 animate-fade-in">
        <h3 class="text-2xl font-bold text-red-700 mb-3">Game Over</h3>
        <p class="text-gray-700 mb-6">You've run out of lives!</p>
        <button @click="resetGame"
          class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

export default {
  name: "Task3View",
  data() {
    return {
      items: [
        { id: 0, name: "Calligraphy panel 🖋️", matched: false },
        { id: 1, name: "Al Noor Mosque 🕌", matched: false },
        { id: 2, name: "Dhow painting ⛵", matched: false },
        { id: 3, name: "Falcon sculpture 🦅", matched: false },
        { id: 4, name: "Sand dune photo 🏜️", matched: false }
      ],
      meanings: [
        { id: 0, text: "A. Tribute to UAE's maritime roots and trade heritage", matched: false, matchedItemIndex: null, correct: null },
        { id: 1, text: "B. Connection between nature and human endurance", matched: false, matchedItemIndex: null, correct: null },
        { id: 2, text: "C. Expression of divine beauty through Arabic script", matched: false, matchedItemIndex: null, correct: null },
        { id: 3, text: "D. Symbol of light, learning, and spiritual openness", matched: false, matchedItemIndex: null, correct: null },
        { id: 4, text: "E. National pride, strength, and freedom", matched: false, matchedItemIndex: null, correct: null }
      ],
      correctMatches: {
        0: 2,
        1: 3,
        2: 0,
        3: 4,
        4: 1
      },
      draggedItem: null,
      draggedItemType: null,
      progress: 0,
      isDraggingOver: null,
      touchClone: null,
      currentTouchDrop: null,
      gameOver: false
    };
  },
  computed: {
    allMatched() {
      const allMatched = this.items.every((item) => item.matched);
      if (allMatched) this.celebrate();
      return allMatched;
    }
  },
  mounted() {
    const items = document.querySelectorAll("[draggable='true']");
    items.forEach((el, index) => {
      el.addEventListener("touchstart", (e) => this.onTouchStart(e, index));
      el.addEventListener("touchmove", (e) => this.onTouchMove(e));
      el.addEventListener("touchend", (e) => this.onTouchEnd(e));
    });
  },
  methods: {
    celebrate() {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      Swal.fire({
        title: "Amazing!",
        text: "You've completed all matches!",
        icon: "success",
        confirmButtonText: "Play Again"
      }).then(() => this.resetGame());
    },

    updateProgress() {
      const matchedCount = this.items.filter((i) => i.matched).length;
      this.progress = (matchedCount / this.items.length) * 100;
    },

    resetGame() {
      this.items = this.items.map((i) => ({ ...i, matched: false }));
      this.meanings = this.meanings.map((m) => ({
        ...m,
        matched: false,
        matchedItemIndex: null,
        correct: null
      }));
      this.progress = 0;
    },

    onDragStart(event, index, type) {
      if (this.items[index].matched) {
        event.preventDefault();
        return;
      }
      this.draggedItem = index;
      this.draggedItemType = type;
      event.dataTransfer.effectAllowed = "move";
      event.target.classList.add("dragging");
    },

    onDragEnd(event) {
      this.draggedItem = null;
      this.draggedItemType = null;
      document.querySelectorAll(".dragging").forEach((el) => el.classList.remove("dragging"));
    },

    onDrop(event, dropIndex, dropType) {
      if (this.draggedItemType === "item" && dropType === "meaning") {
        const itemIndex = this.draggedItem;
        const isCorrect = this.correctMatches[itemIndex] === dropIndex;
        
        // Update the matched state
        this.meanings[dropIndex].matched = true;
        this.meanings[dropIndex].matchedItemIndex = itemIndex;
        this.meanings[dropIndex].correct = isCorrect;
        
        if (isCorrect) {
          this.items[itemIndex].matched = true;
          this.updateProgress();
          
          // Check if all items are matched
          if (this.items.every(item => item.matched)) {
            this.celebrate();
          }
        } else {
          // Shake animation for wrong answer
          const dropZone = event.target.closest('.drop-zone');
          if (dropZone) {
            dropZone.classList.add('shake-animation');
            // Keep the wrong answer but mark it as incorrect
            this.meanings[dropIndex].correct = false;
            setTimeout(() => {
              dropZone.classList.remove('shake-animation');
            }, 1000);
          }
        }
      }
    },

    // ===== Touch support for iPad / iPhone =====
    onTouchStart(e, index) {
      e.preventDefault();
      if (this.items[index].matched) return;
      this.draggedItem = index;
      this.draggedItemType = "item";
      this.touchClone = e.target.cloneNode(true);
      Object.assign(this.touchClone.style, {
        position: "fixed",
        pointerEvents: "none",
        opacity: "0.7",
        zIndex: "9999",
        left: e.touches[0].clientX + "px",
        top: e.touches[0].clientY + "px"
      });
      document.body.appendChild(this.touchClone);
    },

    onTouchMove(e) {
      if (!this.touchClone) return;
      const t = e.touches[0];
      this.touchClone.style.left = t.clientX - 50 + "px";
      this.touchClone.style.top = t.clientY - 30 + "px";
      const el = document.elementFromPoint(t.clientX, t.clientY);
      document.querySelectorAll(".drop-zone").forEach((dz) => dz.classList.remove("highlight"));
      if (el && el.classList.contains("drop-zone")) {
        el.classList.add("highlight");
        this.currentTouchDrop = el;
      }
    },

    onTouchEnd(e) {
      if (this.touchClone) {
        this.touchClone.remove();
        this.touchClone = null;
      }
      if (this.currentTouchDrop) {
        const dropIndex = Array.from(document.querySelectorAll(".drop-zone")).indexOf(this.currentTouchDrop);
        if (dropIndex >= 0) this.onDrop(e, dropIndex, "meaning");
        this.currentTouchDrop.classList.remove("highlight");
        this.currentTouchDrop = null;
      }
      this.draggedItem = null;
      this.draggedItemType = null;
    }
  }
};
</script>

<style>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%);
  animation: shimmer 2s infinite;
  transform: translateX(-100%);
}

.drop-zone.highlight {
  border: 2px solid rgba(34, 211, 238, 0.55);
  background-color: rgba(34, 211, 238, 0.08);
  transform: scale(1.02);
}

/* Success message styling */
.success-message {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.matched-item::after {
  content: '✓';
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #34d399;
  font-weight: bold;
  font-size: 1.25rem;
}

@media (pointer: coarse) {
  .cursor-move {
    cursor: grab;
    touch-action: none;
  }
}
</style>
