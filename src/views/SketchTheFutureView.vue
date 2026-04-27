<template>
   <div class="min-h-screen mg-bg flex flex-col items-center pt-8 pb-16 px-4 relative overflow-hidden w-full">
     <div class="pointer-events-none absolute inset-0 opacity-70 mg-dots mg-dots-anim" />
     <!-- Background Decor -->
     <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
     <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>
 
     <div class="max-w-5xl w-full relative z-10 flex flex-col items-center h-full flex-1">
       <header class="text-center w-full mb-4 md:mb-6 relative">
         <router-link to="/" class="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 md:p-2 text-brand-gray hover:text-blue-600 transition-colors bg-white rounded-lg md:rounded-xl shadow-sm border border-brand-dark/5">
           <svg class="w-5 h-5 md:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
         </router-link>
        <h1 class="text-2xl md:text-4xl font-black italic tracking-tight uppercase text-emerald-600 drop-shadow-sm px-10">SELECT Vision Canvas</h1>
         <p class="mt-2 md:mt-4 text-sm md:text-base text-brand-gray max-w-2xl mx-auto font-medium leading-relaxed px-4">
          Draw your vision for SELECT. Work together and present ideas like a poster or sketch.
         </p>
         <div v-if="isLoggedIn" class="mt-2 md:mt-4 flex items-center justify-center gap-2">
            <span class="px-2 py-0.5 md:px-3 md:py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-blue-200">Designer: {{ userName }}</span>
         </div>
       </header>
 
       <!-- Name Entry (Login) Screen -->
       <div v-if="!isLoggedIn" class="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-brand-dark/5 transition-all duration-500 ease-out">
         <div class="text-center mb-8">
           <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
             <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
           </div>
           <h2 class="text-2xl font-bold text-brand-dark">Welcome</h2>
           <p class="text-brand-gray text-sm mt-1">Please enter your team or individual name</p>
         </div>
         
         <form @submit.prevent="login" class="space-y-6">
           <div>
             <label for="section" class="block text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 ml-1">Section</label>
             <select 
               v-model="selectedSectionId" 
               id="section"
               required
               class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none font-medium appearance-none cursor-pointer mb-6"
             >
               <option value="" disabled>Select your section</option>
               <option v-for="section in sections" :key="section.id" :value="section.id">
                 {{ section.name }}
               </option>
             </select>
           </div>
           <div>
             <label for="userName" class="block text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 ml-1">Team / Individual Name</label>
             <input 
               v-model="userNameInput" 
               type="text" 
               id="userName"
               placeholder="e.g. Dream Team" 
               required
               class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none font-medium"
               autofocus
             >
           </div>
           <button type="submit" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
             Start Designing
           </button>
         </form>
       </div>
 
       <!-- Idea Prompt Box -->
       <div v-if="isLoggedIn" class="w-full flex flex-col gap-4 mb-6">
         <div class="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 flex items-center justify-between gap-4">
           <div class="flex-1">
             <h2 class="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Current Challenge:</h2>
             <p class="text-lg md:text-xl font-black text-brand-dark leading-snug">{{ currentIdea }}</p>
           </div>
           <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
         </div>
 
         <!-- ESG Inspiration Chips -->
         <div class="flex flex-wrap gap-2 md:gap-3 px-1">
           <div v-for="chip in inspirationChips" :key="chip.text" 
                class="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold border flex items-center gap-1.5 transition-all cursor-default"
                :class="chip.class">
             <span class="w-1.5 h-1.5 rounded-full" :class="chip.dotClass"></span>
             {{ chip.text }}
           </div>
         </div>
       </div>
 
       <!-- Canvas Area -->
       <div v-if="isLoggedIn" class="w-full bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-brand-dark/5 flex-1 flex flex-col transition-all duration-1000">
         <!-- Toolbar (Mobile Optimized) -->
         <div class="space-y-4 mb-4 md:mb-6 px-1">
           <!-- Row 1: Colors & Main Controls -->
           <div class="flex flex-wrap items-center justify-between gap-3">
             <!-- Colors -->
             <div class="flex items-center gap-1.5 bg-gray-50/80 p-1.5 rounded-2xl border border-brand-dark/5 overflow-x-auto no-scrollbar shadow-sm">
               <button v-for="color in colors" :key="color" @click="selectTool('brush', color)"
                 :class="['w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-transform shrink-0', (selectedColor === color && !isEraser && !isStampMode) ? 'border-brand-dark scale-110' : 'border-transparent']"
                 :style="{ backgroundColor: color }"></button>
             </div>
 
             <!-- Global Actions (Undo/Clear) -->
             <div class="flex items-center gap-2">
               <div class="flex items-center gap-0.5 bg-gray-50/50 p-0.5 rounded-xl border border-brand-dark/5">
                 <button @click="undo" :disabled="!canUndo" class="p-2 text-brand-gray hover:text-emerald-600 disabled:opacity-30 transition-colors" title="Undo">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                   </svg>
                 </button>
                 <button @click="redo" :disabled="!canRedo" class="p-2 text-brand-gray hover:text-emerald-600 disabled:opacity-30 transition-colors" title="Redo">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                   </svg>
                 </button>
               </div>
               <button @click="clearCanvas" class="p-2 px-3 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all shadow-sm border border-red-100" title="Clear Canvas">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                 </svg>
               </button>
             </div>
           </div>
 
           <!-- Row 2: Tools, Stamps & Brush Size -->
           <div class="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 md:gap-4 overflow-hidden">
             <!-- Tool Buttons & Stamp List -->
             <div class="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
               <!-- Basic Tools -->
               <div class="flex items-center gap-1 bg-gray-50/80 p-1 rounded-xl border border-brand-dark/5 shrink-0 shadow-sm">
                 <button @click="selectTool('brush', selectedColor)" 
                   :class="['p-2 rounded-lg transition-all', (!isEraser && !isStampMode && !isTextMode) ? 'bg-white shadow-sm text-emerald-600' : 'text-brand-gray hover:text-emerald-600']"
                   title="Brush">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                   </svg>
                 </button>
                 <button @click="selectTool('text')" 
                   :class="['p-2 rounded-lg transition-all flex items-center gap-1.5', isTextMode ? 'bg-white shadow-sm text-blue-600 ring-1 ring-blue-100' : 'text-brand-gray hover:text-blue-600']"
                   title="Text Tool">
                   <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M12 6v14m-5 0h10" />
                   </svg>
                   <span v-if="isTextMode" class="text-[10px] font-black uppercase tracking-tighter hidden md:inline">Text Tool Active</span>
                 </button>
                 <button @click="selectTool('eraser')" 
                   :class="['p-2 rounded-lg transition-all', isEraser ? 'bg-white shadow-sm text-red-600 ring-1 ring-red-100' : 'text-brand-gray hover:text-red-600']"
                   title="Eraser">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 01-5.66 0L2.83 17a4.008 4.008 0 010-5.66l9.17-9.17c.79-.78 2.05-.78 2.84 0l1.4 1.39zm-2.12 1.41L12.71 6.38l2.91 2.91 1.41-1.41-2.91-2.91z" />
                   </svg>
                 </button>
               </div>
 
               <!-- Dedicated Insert Text Link -->
               <button @click="insertTextbox" 
                 class="flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shrink-0 shadow-sm">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                 </svg>
                 <span class="hidden sm:inline">Add Text</span>
               </button>
 
               <!-- Stamp Bar (Horizontal Scroll) -->
               <div class="flex-1 min-w-0 relative overflow-hidden group">
                 <div class="flex items-center gap-1.5 bg-emerald-50/50 p-1.5 rounded-xl border border-emerald-100 overflow-x-auto custom-scrollbar scroll-smooth shadow-inner">
                   <div v-for="category in categorizedStamps" :key="category.name" class="flex items-center gap-1 md:gap-2 px-2 border-r border-emerald-200 last:border-0 h-9 shrink-0">
                     <span class="hidden md:inline text-[8px] font-black text-emerald-700/60 uppercase tracking-tighter mr-0.5">{{ category.name.substring(0,3) }}</span>
                     <button v-for="stamp in category.items" :key="stamp.id" @click="selectStamp(stamp)"
                       :class="['p-1 rounded-md md:p-1.5 md:rounded-lg transition-all text-xl md:text-2xl leading-none shrink-0 hover:scale-125', (isStampMode && selectedStamp?.id === stamp.id) ? 'bg-white shadow-sm ring-2 ring-emerald-200' : 'hover:bg-white/40 grayscale-[0.2] hover:grayscale-0']"
                       :title="stamp.label">
                       {{ stamp.icon }}
                     </button>
                   </div>
                 </div>
                 <!-- Visual cues for scrolling -->
                 <div class="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-emerald-50/90 to-transparent pointer-events-none rounded-r-xl"></div>
                 <div class="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-emerald-50/90 to-transparent pointer-events-none rounded-l-xl"></div>
               </div>
             </div>
 
             <!-- Brush Size (Refined) -->
             <div class="flex items-center gap-3 md:gap-4 bg-gray-50/80 px-4 py-2 rounded-xl border border-brand-dark/5 shrink-0 shadow-sm w-full xl:w-auto overflow-hidden">
               <div class="flex flex-col min-w-[40px]">
                 <span class="text-[8px] font-black text-emerald-700 uppercase tracking-widest leading-none mb-1">{{ isStampMode ? 'SCALE' : 'SIZE' }}</span>
                 <span class="text-[10px] md:text-xs font-mono font-black text-brand-dark">{{ brushSize }}px</span>
               </div>
               <input type="range" v-model="brushSize" min="2" max="150" step="1" class="flex-1 xl:w-28 accent-emerald-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer">
             </div>
           </div>
         </div>
 
         <!-- The Canvas Container (Resizable) -->
         <div class="relative w-full rounded-xl md:rounded-2xl border-2 border-dashed border-brand-gray/20 bg-gray-50/50 touch-none overflow-hidden sm:resize-y group" 
              style="height: 480px; min-height: 300px;"
              ref="canvasContainer">
           <canvas 
             ref="drawingCanvas" 
             class="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none"
             @mousedown="startDrawing"
             @mousemove="draw"
             @mouseup="stopDrawing"
             @mouseleave="stopDrawing"
             @touchstart.prevent="startDrawingTouch"
             @touchmove.prevent="drawTouch"
             @touchend.prevent="stopDrawing"
           ></canvas>
           
             <!-- Text Box Overlay (MS Word Style) -->
             <div v-if="activeTextNode" 
                  class="absolute z-[1000] flex flex-col bg-white border-2 border-blue-500 rounded-xl shadow-2xl p-0 overflow-visible animate-in zoom-in"
                  :style="{ 
                    left: `${activeTextNode.x}px`, 
                    top: `${activeTextNode.y}px`, 
                  }">
               <div class="flex items-center justify-between p-2 bg-blue-500 text-white rounded-t-[10px] cursor-move">
                 <span class="text-[8px] font-black uppercase tracking-wider ml-1">Text Editor</span>
                 <button @click="activeTextNode = null" class="p-0.5 hover:bg-white/20 rounded-md transition-colors">
                   <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
               <textarea 
                 v-model="activeTextNode.text"
                 ref="textInput"
                 placeholder="Type something here..."
                 class="w-[200px] h-[100px] p-4 outline-none resize appearance-none font-sans leading-relaxed pointer-events-auto border-none"
                 :style="{ 
                   color: selectedColor,
                   fontSize: `${Math.max(16, brushSize)}px`,
                   fontWeight: 'bold',
                 }"
               ></textarea>
               <div class="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                  <span class="text-[9px] font-bold text-gray-400 italic">Press "Finish" to bake into canvas</span>
                 <button @click.stop="finalizeText" class="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
                   Finish Text
                 </button>
               </div>
             </div>
 
           <!-- Custom Resize Handle for Mobile -->
           <div 
             class="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center cursor-ns-resize sm:hidden bg-gradient-to-t from-gray-200/50 to-transparent"
             @touchstart="startResize"
           >
             <div class="flex items-center justify-center bg-white/90 shadow-sm border border-gray-200 rounded-full px-4 py-0.5">
               <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
               </svg>
             </div>
           </div>
         </div>
 
         <!-- Submission Area -->
         <div class="mt-4 md:mt-8 space-y-4">
           <div>
             <label for="explanation" class="block text-xs font-bold text-brand-gray uppercase tracking-widest mb-2 ml-1">Explain your innovation</label>
             <textarea 
               v-model="explanation" 
               id="explanation"
               placeholder="How does your design solve the challenge?..." 
               class="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none font-medium min-h-[100px] md:min-h-[120px] resize-none text-sm md:text-base shadow-inner"
             ></textarea>
           </div>
           
           <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
             <div v-if="submitStatus" :class="['text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 w-full sm:w-auto text-center justify-center', 
               submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700']">
               <svg v-if="submitStatus.type === 'success'" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
               {{ submitStatus.message }}
             </div>
             <div v-else class="hidden sm:block"></div>
 
             <button 
               @click="submitDrawing" 
               :disabled="isSubmitting"
               class="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3 text-base"
             >
               <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               {{ isSubmitting ? 'Submitting...' : 'Submit Innovation' }}
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script setup>
 import { ref, onMounted, onUnmounted, nextTick } from 'vue';
 import { useRoute } from 'vue-router';
 import axios from 'axios';
 
 const API_URL = import.meta.env.VITE_API_URL || 'https://hatters-api.thegamearcade.com';
 const route = useRoute();
 const eventId = route.query.event || '';
 
const ideas = [
  "Sketch your vision for SELECT — what should the experience look like, feel like, and deliver?",
  "Design an idea that makes SELECT more fun, clear, and memorable. Show it as a poster or sketch.",
  "Create a mini-game / challenge concept for SELECT and illustrate how players interact with it.",
];
 
 const currentIdea = ref("");
 const isLoggedIn = ref(false);
 const userName = ref("");
 const userNameInput = ref("");
 const sections = ref([]);
 const selectedSectionId = ref("");
 const teamId = ref(null);
 const explanation = ref("");
 const isSubmitting = ref(false);
 const submitStatus = ref(null);
 
 const canvasContainer = ref(null);
 const drawingCanvas = ref(null);
 const ctx = ref(null);
 const isDrawing = ref(false);
 
 const colors = [
   '#065f46', // Environment (Emerald)
   '#059669', // Environment (Green)
   '#ea580c', // Social (Orange)
   '#dc2626', // Social (Red)
   '#1e40af', // Governance (Blue)
   '#4338ca', // Governance (Indigo)
   '#1c2b39', // Brand Dark
   '#000000', // Black
 ];
 const selectedColor = ref(colors[1]); // Default to Green
 const brushSize = ref(6);
 const isEraser = ref(false);
 const isStampMode = ref(false);
 const selectedStamp = ref(null);
 const isTextMode = ref(false);
 const activeTextNode = ref(null);
 const textInput = ref(null);
 
 const categorizedStamps = [
   {
     name: 'Environment',
     items: [
       { id: 'env-1', label: 'Nature', icon: '🌳' },
       { id: 'env-2', label: 'Solar Power', icon: '☀️' },
       { id: 'env-3', label: 'Globe', icon: '🌍' },
       { id: 'env-4', label: 'Water', icon: '💧' },
       { id: 'env-5', label: 'Energy', icon: '⚡' },
       { id: 'env-6', label: 'Recycle', icon: '♻️' },
       { id: 'env-7', label: 'Battery', icon: '🔋' },
     ]
   },
   {
     name: 'Social',
     items: [
       { id: 'soc-1', label: 'People', icon: '👥' },
       { id: 'soc-2', label: 'Collaboration', icon: '🤝' },
       { id: 'soc-3', label: 'Education', icon: '🎓' },
       { id: 'soc-4', label: 'Home', icon: '🏠' },
       { id: 'soc-5', label: 'Safety', icon: '⛑️' },
       { id: 'soc-6', label: 'Health', icon: '🏥' },
     ]
   },
   {
     name: 'Governance',
     items: [
       { id: 'gov-1', label: 'Governance', icon: '🛡️' },
       { id: 'gov-2', label: 'Growth', icon: '📈' },
       { id: 'gov-3', label: 'Ethics', icon: '💎' },
       { id: 'gov-4', label: 'Infrastructure', icon: '🏗️' },
       { id: 'gov-5', label: 'Supply Chain', icon: '🔗' },
       { id: 'gov-6', label: 'AI/Tech', icon: '🤖' },
     ]
   }
 ];
 
 const inspirationChips = [
   { text: 'Renewable Power', class: 'bg-emerald-50 text-emerald-700 border-emerald-200', dotClass: 'bg-emerald-500' },
   { text: 'Water Management', class: 'bg-teal-50 text-teal-700 border-teal-200', dotClass: 'bg-teal-500' },
   { text: 'Diversity & Inclusion', class: 'bg-orange-50 text-orange-700 border-orange-200', dotClass: 'bg-orange-500' },
   { text: 'Safety First', class: 'bg-red-50 text-red-700 border-red-200', dotClass: 'bg-red-500' },
   { text: 'Ethical Sourcing', class: 'bg-blue-50 text-blue-700 border-blue-200', dotClass: 'bg-blue-500' },
   { text: 'Transparency', class: 'bg-indigo-50 text-indigo-700 border-indigo-200', dotClass: 'bg-indigo-500' }
 ];
 
 // Undo/Redo logic
 const undoStack = ref([]);
 const redoStack = ref([]);
 const canUndo = ref(false);
 const canRedo = ref(false);
 
 const saveState = () => {
   if (!drawingCanvas.value) return;
   undoStack.value.push(drawingCanvas.value.toDataURL());
   if (undoStack.value.length > 50) undoStack.value.shift(); 
   redoStack.value = []; 
   updateUndoRedoStates();
 };
 
 const updateUndoRedoStates = () => {
   canUndo.value = undoStack.value.length > 0;
   canRedo.value = redoStack.value.length > 0;
 };
 
 const undo = () => {
   if (activeTextNode.value) activeTextNode.value = null;
   if (undoStack.value.length === 0) return;
   redoStack.value.push(drawingCanvas.value.toDataURL());
   const previousState = undoStack.value.pop();
   restoreState(previousState);
   updateUndoRedoStates();
 };
 
 const redo = () => {
   if (activeTextNode.value) activeTextNode.value = null;
   if (redoStack.value.length === 0) return;
   undoStack.value.push(drawingCanvas.value.toDataURL());
   const nextState = redoStack.value.pop();
   restoreState(nextState);
   updateUndoRedoStates();
 };
 
 const restoreState = (dataUrl) => {
   if (!ctx.value || !drawingCanvas.value) return;
   const img = new Image();
   img.onload = () => {
     const dpr = window.devicePixelRatio || 1;
     ctx.value.clearRect(0, 0, drawingCanvas.value.width / dpr, drawingCanvas.value.height / dpr);
     ctx.value.drawImage(img, 0, 0, drawingCanvas.value.width / dpr, drawingCanvas.value.height / dpr);
   };
   img.src = dataUrl;
 };
 
 const selectTool = (tool, color) => {
   isStampMode.value = false;
   selectedStamp.value = null;
   isTextMode.value = false;
   if (activeTextNode.value) finalizeText();
   
   if (tool === 'eraser') {
     isEraser.value = true;
   } else if (tool === 'text') {
     isTextMode.value = true;
     isEraser.value = false;
   } else {
     isEraser.value = false;
     if (color) selectedColor.value = color;
   }
 };
 
 const insertTextbox = () => {
   selectTool('text');
   if (activeTextNode.value) finalizeText();
   
   // Calculate center of canvas container
   if (!canvasContainer.value) return;
   const rect = canvasContainer.value.getBoundingClientRect();
   
   activeTextNode.value = {
     x: (rect.width / 2) - 100, // Approx half fixed textarea width
     y: (rect.height / 2) - 60, // Approx half fixed textarea height
     text: ""
   };
   
   nextTick(() => {
     if (textInput.value) textInput.value.focus();
   });
 };
 
 const finalizeText = () => {
   if (!activeTextNode.value || !activeTextNode.value.text.trim()) {
     activeTextNode.value = null;
     return;
   }
   
   if (ctx.value) {
     ctx.value.globalCompositeOperation = 'source-over';
     ctx.value.fillStyle = selectedColor.value;
     const fontSize = Math.max(16, brushSize.value);
     ctx.value.font = `bold ${fontSize}px sans-serif`;
     ctx.value.textBaseline = 'top';
     
     // Support multi-line drawing
     const lines = activeTextNode.value.text.split('\n');
     lines.forEach((line, index) => {
       ctx.value.fillText(line, activeTextNode.value.x + 12, activeTextNode.value.y + 12 + (index * fontSize * 1.2));
     });
     
     saveState();
   }
   activeTextNode.value = null;
 };
 
 const selectStamp = (stamp) => {
   isStampMode.value = true;
   isEraser.value = false;
   selectedStamp.value = stamp;
   if (brushSize.value < 20) brushSize.value = 40;
 };
 
 
 const fetchSections = async () => {
   try {
     const response = await axios.get(`${API_URL}/ega/sections`);
     sections.value = response.data;
   } catch (error) {
     console.error('Failed to fetch sections:', error);
   }
 };
 
 const login = async () => {
   if (userNameInput.value.trim() && selectedSectionId.value) {
     const fullName = eventId ? `${eventId} | ${userNameInput.value.trim()}` : userNameInput.value.trim();
     try {
       const response = await axios.post(`${API_URL}/ega/login`, {
         name: fullName,
         section_id: selectedSectionId.value
       });
       
       teamId.value = response.data.id;
       userName.value = userNameInput.value.trim();
       isLoggedIn.value = true;
       
       // Select constant random idea upon login
       currentIdea.value = ideas[Math.floor(Math.random() * ideas.length)];
       
       // Initialize canvas if it becomes visible
       setTimeout(() => {
         if (drawingCanvas.value) {
           ctx.value = drawingCanvas.value.getContext('2d');
           resizeCanvas();
           saveState(); // Save initial blank state after canvas is ready
         }
       }, 100);
     } catch (error) {
       console.error('Login failed:', error);
       alert('Login failed. Please try again.');
     }
   }
 };
 
 const submitDrawing = async () => {
   if (!drawingCanvas.value || !teamId.value) return;
   
   isSubmitting.value = true;
   submitStatus.value = null;
 
   try {
     // 1. Create a backgrounded canvas
     const tempCanvas = document.createElement('canvas');
     tempCanvas.width = drawingCanvas.value.width;
     tempCanvas.height = drawingCanvas.value.height;
     const tempCtx = tempCanvas.getContext('2d');
     tempCtx.fillStyle = '#ffffff';
     tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
     tempCtx.drawImage(drawingCanvas.value, 0, 0);
 
     // 2. Convert to Blob
     const blob = await new Promise(resolve => tempCanvas.toBlob(resolve, 'image/png'));
     
     // 3. Prepare FormData
     const formData = new FormData();
     formData.append('challenge_name', currentIdea.value);
     formData.append('explanation', explanation.value);
     formData.append('file', blob, 'innovation.png');
 
     // 4. Submit
     await axios.put(`${API_URL}/ega/update/${teamId.value}`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });
 
     submitStatus.value = {
       type: 'success',
       message: 'Innovation submitted successfully!'
     };
     
     // Reset after some time
     setTimeout(() => {
       submitStatus.value = null;
     }, 5000);
 
   } catch (error) {
     console.error('Submission failed:', error);
     submitStatus.value = {
       type: 'error',
       message: 'Failed to submit. Please try again.'
     };
   } finally {
     isSubmitting.value = false;
   }
 };
 
 const resizeCanvas = () => {
   if (!canvasContainer.value || !drawingCanvas.value) return;
   const { width, height } = canvasContainer.value.getBoundingClientRect();
   
   // Save content
   let data = null;
   if(drawingCanvas.value.width > 0 && drawingCanvas.value.height > 0) {
     data = drawingCanvas.value.toDataURL();
   }
   
   // Increase resolution by device pixel ratio for sharper drawing
   const dpr = window.devicePixelRatio || 1;
   drawingCanvas.value.width = width * dpr;
   drawingCanvas.value.height = height * dpr;
   drawingCanvas.value.style.width = width + "px";
   drawingCanvas.value.style.height = height + "px";
   
   if (ctx.value) {
     // Restore configuration
     ctx.value.scale(dpr, dpr);
     ctx.value.lineCap = 'round';
     ctx.value.lineJoin = 'round';
     ctx.value.lineWidth = brushSize.value; // Use current brush size
     
     // Restore content
     if (data) {
       const img = new Image();
       img.onload = () => {
         ctx.value.drawImage(img, 0, 0, width, height);
       };
       img.src = data;
     }
   }
 };
 
 // Custom Resize Logic for Mobile
 const isResizing = ref(false);
 const startY = ref(0);
 const startHeight = ref(0);
 
 const startResize = (e) => {
   isResizing.value = true;
   startY.value = e.touches[0].clientY;
   startHeight.value = canvasContainer.value.offsetHeight;
   
   window.addEventListener('touchmove', handleResizeMove, { passive: false });
   window.addEventListener('touchend', stopResize);
 };
 
 const handleResizeMove = (e) => {
   if (!isResizing.value) return;
   e.preventDefault();
   
   const currentY = e.touches[0].clientY;
   const diff = currentY - startY.value;
   const newHeight = Math.max(300, startHeight.value + diff);
   
   canvasContainer.value.style.height = `${newHeight}px`;
 };
 
 const stopResize = () => {
   isResizing.value = false;
   window.removeEventListener('touchmove', handleResizeMove);
   window.removeEventListener('touchend', stopResize);
 };
 
 let resizeObserver = null;
 
 onMounted(() => {
   window.addEventListener('resize', resizeCanvas);
   fetchSections();
   
   // Use ResizeObserver to handle "expandable" container resizing
   if (canvasContainer.value) {
     resizeObserver = new ResizeObserver(() => {
       resizeCanvas();
     });
     resizeObserver.observe(canvasContainer.value);
   }
   
   // Initial resize
   nextTick(() => {
     resizeCanvas();
   });
 });
 
 onUnmounted(() => {
   window.removeEventListener('resize', resizeCanvas);
   if (resizeObserver) {
     resizeObserver.disconnect();
   }
 });
 
 const getCoordinates = (e) => {
   const rect = drawingCanvas.value.getBoundingClientRect();
   return {
     x: e.clientX - rect.left,
     y: e.clientY - rect.top
   };
 };
 
 const getTouchCoordinates = (e) => {
   const rect = drawingCanvas.value.getBoundingClientRect();
   const touch = e.touches[0];
   return {
     x: touch.clientX - rect.left,
     y: touch.clientY - rect.top
   };
 };
 
 const startDrawing = (e) => {
   if (isStampMode.value && selectedStamp.value) {
     placeStamp(getCoordinates(e));
     return;
   }
   if (isTextMode.value) {
     if (activeTextNode.value) {
       finalizeText();
       return;
     }
     const { x, y } = getCoordinates(e);
     activeTextNode.value = { x, y, text: "" };
     nextTick(() => {
       if (textInput.value) textInput.value.focus();
     });
     return;
   }
   isDrawing.value = true;
   const { x, y } = getCoordinates(e);
   ctx.value.beginPath();
   ctx.value.moveTo(x, y);
   
   // Set tool properties
   ctx.value.lineWidth = brushSize.value;
   if (isEraser.value) {
     ctx.value.globalCompositeOperation = 'destination-out'; // Erase effect
   } else {
     ctx.value.globalCompositeOperation = 'source-over'; // Normal drawing
     ctx.value.strokeStyle = selectedColor.value;
   }
 };
 
 const placeStamp = ({ x, y }) => {
   if (!ctx.value || !selectedStamp.value) return;
   
   ctx.value.font = `${brushSize.value}px serif`;
   ctx.value.textAlign = 'center';
   ctx.value.textBaseline = 'middle';
   ctx.value.globalCompositeOperation = 'source-over';
   ctx.value.fillText(selectedStamp.value.icon, x, y);
   saveState();
 };
 
 const draw = (e) => {
   if (!isDrawing.value || isStampMode.value) return;
   const { x, y } = getCoordinates(e);
   ctx.value.lineTo(x, y);
   ctx.value.stroke();
 };
 
 const startDrawingTouch = (e) => {
   if (isStampMode.value && selectedStamp.value) {
     placeStamp(getTouchCoordinates(e));
     return;
   }
   if (isTextMode.value) {
     if (activeTextNode.value) {
       finalizeText();
       return;
     }
     const { x, y } = getTouchCoordinates(e);
     activeTextNode.value = { x, y, text: "" };
     nextTick(() => {
       if (textInput.value) textInput.value.focus();
     });
     return;
   }
   isDrawing.value = true;
   const { x, y } = getTouchCoordinates(e);
   ctx.value.beginPath();
   ctx.value.moveTo(x, y);
 
   // Set tool properties
   ctx.value.lineWidth = brushSize.value;
   if (isEraser.value) {
     ctx.value.globalCompositeOperation = 'destination-out';
   } else {
     ctx.value.globalCompositeOperation = 'source-over';
     ctx.value.strokeStyle = selectedColor.value;
   }
 };
 
 const drawTouch = (e) => {
   if (!isDrawing.value || isStampMode.value) return;
   const { x, y } = getTouchCoordinates(e);
   ctx.value.lineTo(x, y);
   ctx.value.stroke();
 };
 
 const stopDrawing = () => {
   if (isDrawing.value) {
     saveState(); // Save state after each completed drawing action
   }
   isDrawing.value = false;
   if (ctx.value) {
     ctx.value.closePath();
   }
 };
 
 const clearCanvas = () => {
   if (ctx.value && drawingCanvas.value) {
     saveState(); // Save state before clearing
     // Need to clear actual width and height taking into account dpr
     const dpr = window.devicePixelRatio || 1;
     ctx.value.clearRect(0, 0, drawingCanvas.value.width / dpr, drawingCanvas.value.height / dpr);
   }
 };
 </script>
 
 <style scoped>
 /* Custom Scrollbar for Desktop */
 .custom-scrollbar::-webkit-scrollbar {
   height: 4px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-track {
   background: rgba(16, 185, 129, 0.05);
   border-radius: 10px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-thumb {
   background: rgba(16, 185, 129, 0.2);
   border-radius: 10px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
   background: rgba(16, 185, 129, 0.4);
 }
 
 /* Hide default scrollbar for specific containers if needed */
 .no-scrollbar::-webkit-scrollbar {
   display: none;
 }
 .no-scrollbar {
   -ms-overflow-style: none;
   scrollbar-width: none;
 }
 </style>
 