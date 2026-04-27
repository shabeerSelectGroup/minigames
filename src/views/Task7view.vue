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
              <div class="text-xs md:text-sm font-medium text-white/60">Fujairah – Al Bidyah Mosque</div>
            </h1>
          </div>
          <div class="w-12 h-0.5 bg-gradient-to-r from-cyan-300 to-fuchsia-300 mx-auto my-1.5 rounded-full"></div>
          <h2 class="text-base text-white/75 font-medium">Chronicles of Time</h2>
        </div>
        
        <p class="text-sm text-white/70 text-center max-w-2xl mx-auto mt-3 mb-4 leading-relaxed">
          Match each historical event with its corresponding year by dragging and dropping the year cards below.
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
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </div>
      
      <!-- Years Section -->
      <div class="relative mg-arcade-card rounded-xl p-4 mb-6">
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold text-white/90">Years</h3>
          <p class="text-xs text-white/60 mt-0.5">Drag and drop to match with events</p>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <div 
            v-for="(event, index) in years" 
            :key="'year-' + event.id"
            draggable="true"
            @dragstart="onDragStart($event, index, 'year')"
            @dragend="onDragEnd"
            @touchstart="onTouchStart($event, index, 'year')"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd($event)"
            class="px-4 py-2 rounded-lg bg-white/8 text-white font-semibold text-sm flex items-center justify-center min-w-[90px] shadow-sm border border-white/12 cursor-grab active:cursor-grabbing hover:shadow transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-300/40"
            :class="{ 
              'opacity-50': isDragging && draggedItemIndex === index,
              'ring-1 ring-cyan-300/60': isDragging && draggedItemIndex === index
            }"
          >
            <span class="text-base font-bold">{{ event.year }}</span>
          </div>
        </div>
      </div>

      <!-- Events List -->
      <div class="mb-8">
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold text-white/90">Historical Events</h3>
          <p class="text-xs text-white/60 mt-0.5">Drop years onto the matching events</p>
        </div>
        
        <div class="grid grid-cols-1 gap-3">
          <div 
            v-for="(event, index) in events" 
            :key="event.id"
            class="bg-white/6 rounded-lg shadow-sm p-4 border border-white/10 transition-all duration-200 hover:shadow-sm"
            :class="{
              'border-emerald-300/40 bg-emerald-400/8': event.correctPosition,
              'hover:border-cyan-300/30': !event.correctPosition && !isDraggingOver,
              'border-cyan-300/45 bg-cyan-300/8': isDraggingOver === index,
              'ring-1 ring-cyan-300/60': isDraggingOver === index
            }"
            @dragover.prevent="isDraggingOver = index"
            @dragleave="isDraggingOver = null"
            @drop="onDrop($event, index)"
            :data-index="index"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 p-2.5 rounded-lg bg-white/8 shadow-inner border border-white/10">
                <span class="text-2xl">{{ event.emoji }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start gap-2">
                  <h3 class="text-base font-semibold text-white/90 leading-snug">{{ event.title }}</h3>
                  <button 
                    v-if="event.matchedYear"
                    @click.stop="removeYear(index)"
                    class="text-white/30 hover:text-rose-300 transition-colors p-0.5 -mt-1 -mr-1"
                    aria-label="Remove year"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p class="text-white/70 text-xs mt-1 leading-relaxed">{{ event.description }}</p>
                <div class="mt-2">
                  <div 
                    v-if="event.matchedYear"
                    class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors"
                    :class="{
                      'bg-emerald-400/10 text-emerald-100 border-emerald-300/40': event.correctPosition,
                      'bg-rose-400/10 text-rose-100 border-rose-300/40': !event.correctPosition,
                      'animate-pulse': isDraggingOver === index
                    }"
                  >
                    <span class="mr-1.5">{{ event.matchedYear.year }}</span>
                    <span v-if="event.correctPosition" class="flex items-center justify-center w-4 h-4 bg-green-500 text-white rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div v-else class="h-8 w-20 bg-white/8 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Success message handled by SweetAlert2 -->
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export default {
  name: 'Task7View',
  setup() {
    const allEvents = [
      { id: 1, title: 'Construction of Al Bidyah Mosque', year: '1446 CE', description: 'Earliest known mosque in the UAE.', emoji: '🕌', correctOrder: 1, correctPosition: false },
      { id: 2, title: 'Discovery of Oil', year: '1958', description: 'Marked beginning of modern UAE development.', emoji: '🛢️', correctOrder: 2, correctPosition: false },
      { id: 3, title: 'Formation of UAE Federation', year: '1971', description: 'Union of seven emirates.', emoji: '🇦🇪', correctOrder: 3, correctPosition: false }
    ];

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    const events = ref(shuffleArray(allEvents).map((event, index) => ({ ...event, position: index + 1, matchedYear: null })));
    const years = ref([...allEvents].sort((a, b) => a.correctOrder - b.correctOrder).map(e => ({ ...e })));

    const draggedItem = ref(null);
    const isDragging = ref(false);
    const draggedItemIndex = ref(null);
    const isDraggingOver = ref(null);

    const progress = computed(() => {
      const correctCount = events.value.filter(event => event.matchedYear?.year === event.year).length;
      return (correctCount / events.value.length) * 100;
    });

    const updateEventStatus = (event) => {
      event.correctPosition = event.matchedYear?.year === event.year;
    };

    const onDragStart = (e, index, type) => {
      draggedItem.value = { index, type };
      isDragging.value = true;
      draggedItemIndex.value = index;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    };

    const onDragEnd = () => {
      isDragging.value = false;
      draggedItem.value = null;
      draggedItemIndex.value = null;
      
      // Ensure any remaining touch clones are cleaned up
      if (touchClone) {
        cleanupTouchClone();
      }
    };

    const onDrop = (e, dropIndex) => {
      e.preventDefault();
      if (draggedItem.value?.type === 'year') {
        const year = years.value[draggedItem.value.index];
        events.value[dropIndex].matchedYear = { ...year };
        updateEventStatus(events.value[dropIndex]);
      }
      isDraggingOver.value = null;
    };

    // Enhanced touch events for iPad
    let touchClone = null;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    const TOUCH_MOVE_THRESHOLD = 5; // pixels to move before starting drag
    
    const onTouchStart = (e, index, type) => {
      // Prevent default to reduce touch delay
      e.preventDefault();
      
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      
      // Start drag immediately
      draggedItem.value = { index, type };
      isDragging.value = true;
      draggedItemIndex.value = index;
      
      // Create and position the touch clone
      touchClone = e.target.cloneNode(true);
      touchClone.style.position = 'fixed';
      touchClone.style.pointerEvents = 'none';
      touchClone.style.left = `${touch.pageX}px`;
      touchClone.style.top = `${touch.pageY}px`;
      touchClone.style.opacity = '0.9';
      touchClone.style.transform = 'translate(-50%, -50%) scale(1.1)';
      touchClone.style.transition = 'transform 0.1s ease-out';
      touchClone.style.zIndex = '1000';
      touchClone.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      touchClone.style.borderRadius = '0.5rem';
      document.body.appendChild(touchClone);
      
      // Force a reflow to ensure the clone is rendered before applying transform
      void touchClone.offsetWidth;
      touchClone.style.transform = 'translate(-50%, -50%) scale(1.1)';
    };

    const onTouchMove = (e) => {
      if (!touchClone || !isDragging.value) return;
      
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);
      
      // Only start dragging if moved beyond threshold
      if (deltaX < TOUCH_MOVE_THRESHOLD && deltaY < TOUCH_MOVE_THRESHOLD) {
        return;
      }
      
      // Update clone position
      touchClone.style.left = `${touch.pageX}px`;
      touchClone.style.top = `${touch.pageY}px`;
      
      // Find drop target
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el) {
        const dropTarget = el.closest('[data-index]');
        if (dropTarget && dropTarget.dataset.index) {
          isDraggingOver.value = Number(dropTarget.dataset.index);
        } else {
          isDraggingOver.value = null;
        }
      } else {
        isDraggingOver.value = null;
      }
      
      // Prevent scrolling while dragging
      e.preventDefault();
    };

    const cleanupTouchClone = () => {
      if (!touchClone) return;
      
      // Immediately hide the clone to prevent any flicker
      touchClone.style.opacity = '0';
      touchClone.style.pointerEvents = 'none';
      
      // Remove from DOM after a short delay to allow any animations to complete
      setTimeout(() => {
        if (touchClone && touchClone.parentNode) {
          touchClone.remove();
        }
        touchClone = null;
      }, 50);
    };

    const onTouchEnd = (e) => {
      if (!touchClone) return;
      
      // Prevent any default behavior that might interfere
      e.preventDefault();
      
      // If we're over a valid drop target, handle the drop
      if (isDraggingOver.value !== null) {
        onDrop(e, isDraggingOver.value);
      }
      
      // Clean up the touch clone
      cleanupTouchClone();
      
      // Reset drag state
      onDragEnd();
      
      // Reset the dragging over state
      isDraggingOver.value = null;
    };

    const removeYear = (index) => {
      events.value[index].matchedYear = null;
      events.value[index].correctPosition = false;
    };

    const resetGame = () => {
      events.value = shuffleArray(allEvents).map((event, index) => ({
        ...event,
        position: index + 1,
        matchedYear: null,
        correctPosition: false
      }));
    };

    watch(() => events.value.map(e => e.matchedYear?.year), () => {
      if (events.value.every(e => e.matchedYear?.year === e.year)) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        Swal.fire({
          title: '🎉 Well Done!',
          text: 'All years are matched!',
          icon: 'success',
          confirmButtonText: 'Play Again!',
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          }
        });
      }
    }, { deep: true });

    return {
      events,
      years,
      progress,
      isDragging,
      isDraggingOver,
      draggedItemIndex,
      onDragStart,
      onDragEnd,
      onDrop,
      removeYear,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }
};
</script>

<style>
/* Make the touch target larger on mobile */
@media (hover: none) {
  [draggable="true"] {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
  
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Smooth transitions */
* {
  transition: background-color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

/* Touch improvements */
@media (hover: none) {
  .event-card {
    padding: 1.25rem;
  }
  
  .year-card {
    padding: 0.75rem 1.25rem;
    min-width: 100px;
  }
}

/* Animation for correct match */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.correct-pulse {
  animation: pulse 0.5s ease-in-out;
}
</style>
