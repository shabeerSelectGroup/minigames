<template>
  <div class="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg my-4 relative overflow-hidden">
    <!-- Header Section -->
    <div class="text-center mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-md">
      <h1 class="text-2xl md:text-3xl font-bold mb-2">Sharjah – Al Noor Mosque / Art Museum</h1>
      <h2 class="text-xl md:text-2xl mb-4 opacity-90">QR Match of Meaning</h2>


      <p class="text-white/90 max-w-3xl mx-auto text-sm md:text-base">
        Match the icons with their corresponding meanings by dragging and dropping.
      </p>

      <div class="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
          :style="{ width: progress + '%' }">
          <div class="h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent">
          </div>
        </div>
      </div>
    </div>

    <!-- Matching Game -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <!-- Left Column - Icons -->
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="text-center text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">Icons</h3>
        <div class="space-y-3">
          <div v-for="(item, index) in items" :key="'item-' + index" draggable="true"
            @dragstart="onDragStart($event, index, 'item')" @dragend="onDragEnd" class="draggable-item" :class="[
              'p-4 rounded-lg border-2 transition-all duration-200 cursor-move select-none text-lg',
              item.matched
                ? 'bg-green-50 border-green-300 text-green-800 pr-10 relative'
                : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md',
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
      <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 class="text-center text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">Meanings</h3>
        <div class="space-y-3">
          <div v-for="(meaning, index) in meanings" :key="'meaning-' + index" @dragover.prevent
            @drop="onDrop($event, index, 'meaning')" :class="[
              'p-4 rounded-lg transition-all duration-200 min-h-[60px]',
              meaning.matched
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50',
              'drop-zone',
              { 'highlight': isDraggingOver === index }
            ]">
            <div class="font-medium text-gray-800">{{ meaning.text }}</div>
            <div v-if="meaning.matchedItemIndex !== null"
              class="mt-2 p-2 bg-white rounded border-l-4 border-orange-400 text-sm text-gray-700 shadow-sm animate-fade-in">
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
        { id: 0, text: "A. Tribute to UAE's maritime roots and trade heritage", matched: false, matchedItemIndex: null },
        { id: 1, text: "B. Connection between nature and human endurance", matched: false, matchedItemIndex: null },
        { id: 2, text: "C. Expression of divine beauty through Arabic script", matched: false, matchedItemIndex: null },
        { id: 3, text: "D. Symbol of light, learning, and spiritual openness", matched: false, matchedItemIndex: null },
        { id: 4, text: "E. National pride, strength, and freedom", matched: false, matchedItemIndex: null }
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
      currentTouchDrop: null
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
        matchedItemIndex: null
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
        if (this.correctMatches[itemIndex] === dropIndex) {
          this.items[itemIndex].matched = true;
          this.meanings[dropIndex].matched = true;
          this.meanings[dropIndex].matchedItemIndex = itemIndex;
          this.updateProgress();
          
          // Check if all items are matched
          if (this.items.every(item => item.matched)) {
            this.celebrate();
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
  border: 2px solid #60a5fa;
  background-color: #eff6ff;
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
  color: #16a34a;
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
