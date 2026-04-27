<template>
   <div
     class="min-h-screen mg-arcade-page flex flex-col items-center pt-8 pb-16 px-4 md:px-8 relative overflow-hidden w-full">
     <div class="pointer-events-none absolute inset-0 mg-arcade-sparkles mg-arcade-sparkles-anim"></div>
     <!-- Background Decor -->
     <div class="absolute -top-10 left-1/4 w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none"></div>
     <div class="absolute -bottom-10 right-1/4 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none"></div>
 
     <div class="max-w-6xl w-full relative z-10 flex flex-col h-full flex-1">
       <header class="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
         <div class="flex items-center gap-4">
           <router-link to="/"
             class="p-2 text-white/70 hover:text-cyan-200 transition-colors bg-white/10 rounded-xl shadow-sm border border-white/12 backdrop-blur">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
           </router-link>
           <div>
             <div class="flex items-center gap-3 mb-1">
                <h1 class="text-3xl md:text-4xl font-black italic tracking-tight uppercase text-cyan-200 drop-shadow-sm">
                  Trainer Dashboard</h1>
                <div class="px-2 py-0.5 bg-cyan-300/10 text-cyan-200 text-[10px] font-black rounded-lg uppercase tracking-wider animate-pulse border border-cyan-300/20">Live</div>
             </div>
             <p class="text-white/70 font-medium text-sm">Real-time Innovation Submission Tracker</p>
           </div>
         </div>
 
         <div class="flex flex-wrap items-end gap-2">
            <div class="flex flex-col gap-1.5 min-w-[200px]">
              <label class="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Filter by Section</label>
              <select 
                v-model="selectedFilterSectionId" 
                @change="fetchTeams()"
                class="px-4 py-3 bg-black/25 border-2 border-white/12 text-white font-bold rounded-2xl hover:border-cyan-300/30 focus:border-cyan-300/50 outline-none transition-all shadow-sm cursor-pointer text-sm backdrop-blur"
              >
                <option value="">All Sections</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">
                  {{ section.name }}
                </option>
              </select>
            </div>
            <button @click="fetchTeams()" :disabled="loading"
              class="flex items-center gap-2 px-6 py-3 bg-white/10 border-2 border-white/12 text-cyan-200 font-bold rounded-2xl hover:bg-white/15 hover:border-cyan-300/30 transition-all shadow-sm active:scale-95 disabled:opacity-50 w-full sm:w-auto justify-center backdrop-blur">
              <svg :class="['w-5 h-5', loading ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ loading ? 'Updating...' : 'Sync Now' }}
            </button>
            <p class="text-[10px] text-white/55 font-bold uppercase tracking-widest mr-2">Auto-refreshing every 5s</p>
         </div>
       </header>
 
       <!-- Loading State -->
       <div v-if="loading && teams.length === 0" class="flex-1 flex flex-col items-center justify-center py-20">
         <div class="w-16 h-16 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin mb-4"></div>
         <p class="text-white/70 font-bold animate-pulse">Connecting to server...</p>
       </div>
 
       <!-- Empty State -->
       <div v-else-if="teams.length === 0"
        class="flex-1 flex flex-col items-center justify-center py-20 bg-white/6 rounded-[3rem] border-2 border-dashed border-white/14 shadow-inner backdrop-blur">
        <div class="w-20 h-20 bg-white/6 text-white/40 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
           <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
               d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
         </div>
        <h2 class="text-2xl font-bold text-white mb-2">Awaiting Teams {{ eventId ? 'for ' + eventId : '' }}</h2>
        <p class="text-white/70 text-center max-w-sm">No teams have logged in yet. New teams will appear here automatically.</p>
       </div>
 
       <!-- Results List View -->
       <div v-else class="mg-arcade-card rounded-[2.5rem] overflow-hidden">
         <div class="overflow-x-auto">
           <table class="w-full text-left border-collapse">
             <thead>
              <tr class="bg-white/5 border-b border-white/10">
                <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/60">Team Name</th>
                <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/60">Challenge</th>
                <th class="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/60">Status</th>
                <th class="px-12 py-6 text-[10px] font-black uppercase tracking-widest text-white/60 text-right">Draft</th>
               </tr>
             </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="team in filteredTeams" :key="team.id" class="hover:bg-white/5 transition-colors group">
                 <td class="px-8 py-6">
                   <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-cyan-300/10 flex items-center justify-center text-cyan-200 font-black text-xs border border-white/10">
                       {{ team.id }}
                     </div>
                     <div>
                      <span class="font-bold text-white/90 group-hover:text-cyan-200 transition-colors block">{{ getCleanName(team.name) }}</span>
                     </div>
                   </div>
                 </td>
                 <td class="px-8 py-6">
                  <span class="text-white/70 font-medium text-sm leading-snug">{{ team.challenge_name || 'Design Phase...' }}</span>
                 </td>
                 <td class="px-8 py-6">
                    <div :class="['inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all', 
                       hasSubmitted(team) 
                        ? 'bg-emerald-300/10 text-emerald-200 border-emerald-300/20 shadow-sm shadow-emerald-500/10' 
                        : 'bg-white/6 text-white/55 border-white/12'
                    ]">
                      <div :class="['w-2 h-2 rounded-full', hasSubmitted(team) ? 'bg-emerald-300 animate-pulse' : 'bg-white/35']"></div>
                       {{ hasSubmitted(team) ? 'Submitted' : 'Logged Only' }}
                    </div>
                 </td>
                 <td class="px-12 py-6 text-right">
                   <button 
                     @click="openModal(team)"
                    class="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-300/15 hover:bg-cyan-300/25 text-cyan-100 rounded-xl font-bold text-xs transition-all shadow-lg shadow-cyan-500/10 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-cyan-300/20"
                   >
                     <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                     </svg>
                     View
                   </button>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
 
     <!-- Innovation Modal Dialog -->
     <Transition name="modal">
       <div v-if="selectedTeam" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-xl" @click="selectedTeam = null"></div>
         
        <div class="relative mg-arcade-card w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
           <!-- Close Button -->
          <button @click="selectedTeam = null" class="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-rose-500/40 hover:text-white transition-all shadow-lg hover:rotate-90 border border-white/12">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
 
           <!-- Visual Submission Area -->
          <div class="flex-1 bg-black/20 flex items-center justify-center min-h-[300px] md:min-h-0 relative overflow-hidden group">
             <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Preview Button overlay -->
              <button 
                v-if="hasSubmitted(selectedTeam)"
                @click="showFullscreen = true"
                class="absolute bottom-6 right-6 z-10 p-4 bg-white/10 backdrop-blur-md text-cyan-200 rounded-2xl shadow-xl border border-white/12 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2 font-black text-xs uppercase tracking-widest"
              >
                 <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                 </svg>
                 Preview
              </button>
 
              <img 
                v-if="hasSubmitted(selectedTeam)"
                :src="getImageUrl(selectedTeam.image_path)" 
                :alt="selectedTeam.name" 
                class="max-w-full max-h-full object-contain p-8 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                @error="handleImageError"
              >
              <div v-else class="flex flex-col items-center gap-4 text-brand-gray/40">
                 <svg class="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <p class="font-black text-[10px] uppercase tracking-[0.2em]">Still Sketching...</p>
              </div>
           </div>
 
           <!-- Documentation Area -->
           <div class="w-full md:w-[400px] p-8 md:p-12 overflow-y-auto bg-black/20 border-l border-white/10 text-white/90">
              <div class="mb-10">
               <span class="px-3 py-1 bg-cyan-300/10 text-cyan-200 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-cyan-300/20">Team Submission</span>
               <h2 class="text-3xl font-black text-white leading-tight">{{ getCleanName(selectedTeam.name) }}</h2>
               <p class="text-white/60 font-bold text-xs uppercase tracking-widest mt-2">Team ID #{{ selectedTeam.id }}</p>
              </div>
 
              <div class="space-y-10">
                <div>
                 <h4 class="text-[10px] font-black text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <div class="w-1.5 h-1.5 bg-cyan-300 rounded-full"></div> Assigned Challenge
                  </h4>
                 <p v-if="selectedTeam.challenge_name" class="text-xl font-bold text-white leading-snug">{{ selectedTeam.challenge_name }}</p>
                 <p v-else class="text-white/60 italic font-medium">Challenge not yet started.</p>
                </div>
 
                <div>
                 <h4 class="text-[10px] font-black text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <div class="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div> Innovation Logic
                  </h4>
                 <div class="bg-white/6 rounded-3xl p-6 border border-white/10">
                   <p v-if="selectedTeam.explanation" class="text-white/85 font-medium leading-relaxed italic text-base">
                      "{{ selectedTeam.explanation }}"
                    </p>
                   <p v-else class="text-white/60 italic font-medium text-sm">
                      The team has not provided an explanation yet.
                    </p>
                  </div>
                </div>
 
               <div class="pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                   <p class="text-[10px] text-white/60 font-black uppercase tracking-widest mb-1.5">Submission Sync</p>
                   <div class="flex items-center gap-2 text-emerald-200">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-xs font-black">{{ hasSubmitted(selectedTeam) ? 'LIVE' : 'SYNCING...' }}</span>
                    </div>
                  </div>
                  
                 <div :class="['p-3 rounded-2xl transition-all duration-500', hasSubmitted(selectedTeam) ? 'bg-emerald-300/10 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/10 border border-emerald-300/20' : 'bg-white/6 text-white/30 border border-white/10']">
                     <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                </div>
              </div>
           </div>
         </div>
       </div>
     </Transition>
 
     <!-- Fullscreen Image Only Modal -->
     <Transition name="fade">
        <div v-if="showFullscreen && selectedTeam" class="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12 overflow-hidden">
          <div class="absolute inset-0 bg-black/90" @click="showFullscreen = false"></div>
           
           <button @click="showFullscreen = false" class="absolute top-8 right-8 z-[210] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center transition-all backdrop-blur-lg">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
 
           <img 
             :src="getImageUrl(selectedTeam.image_path)" 
             :alt="selectedTeam.name" 
             class="relative z-10 max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
             @click.stop
           >
        </div>
     </Transition>
   </div>
 </template>
 
 <script setup>
 import { ref, onMounted, onUnmounted, computed } from 'vue';
 import { useRoute } from 'vue-router';
 import axios from 'axios';
 
 const API_URL = import.meta.env.VITE_API_URL || 'https://hatters-api.thegamearcade.com';
 const route = useRoute();
 const eventId = route.query.event || '';
 
 const teams = ref([]);
 const sections = ref([]);
 const selectedFilterSectionId = ref("");
 const loading = ref(true);
 const selectedTeam = ref(null);
 const showFullscreen = ref(false);
 let refreshInterval = null;
 
 const filteredTeams = computed(() => {
   if (!eventId) return teams.value;
   return teams.value.filter(t => t.name.startsWith(`${eventId} | `));
 });
 
 const getCleanName = (name) => {
   if (eventId && name && name.startsWith(`${eventId} | `)) {
     return name.replace(`${eventId} | `, '');
   }
   return name;
 };
 
 const fetchSections = async () => {
   try {
     const response = await axios.get(`${API_URL}/ega/sections`);
     sections.value = response.data;
   } catch (error) {
     console.error('Failed to fetch sections:', error);
   }
 };
 
 const fetchTeams = async (silent = false) => {
   if (!silent) loading.value = true;
   try {
     const params = {};
     if (selectedFilterSectionId.value) {
       params.section_id = selectedFilterSectionId.value;
     }
     
     const response = await axios.get(`${API_URL}/ega/teams`, { params });
    // Sort: submitted first, then newest
    const sortedTeams = response.data.sort((a, b) => {
      const aSubmitted = hasSubmitted(a) ? 1 : 0;
      const bSubmitted = hasSubmitted(b) ? 1 : 0;
      if (aSubmitted !== bSubmitted) return bSubmitted - aSubmitted;
      return (b.id || 0) - (a.id || 0);
    });
     
     // Update existing selected team info if it's in the response
     if (selectedTeam.value) {
       const updated = sortedTeams.find(t => t.id === selectedTeam.value.id);
       if (updated) selectedTeam.value = updated;
     }
     
     teams.value = sortedTeams;
   } catch (error) {
     console.error('Failed to fetch teams:', error);
   } finally {
     if (!silent) loading.value = false;
   }
 };
 
 const getImageUrl = (path) => {
   if (!path) return '';
   if (path.startsWith('http')) return path;
   const cleanPath = path.startsWith('/') ? path : `/${path}`;
   return `${API_URL}${cleanPath}`;
 };
 
 const handleImageError = (e) => {
   e.target.src = 'https://placehold.co/800x600/f3f4f6/3b82f6?text=Not+Found';
 };
 
 const hasSubmitted = (team) => {
   return team && team.image_path && team.explanation;
 };
 
 const formatDate = (dateString, full = false) => {
   if (!dateString) return '';
   const date = new Date(dateString);
   if (full) {
     return date.toLocaleDateString('en-US', {
       weekday: 'short',
       year: 'numeric',
       month: 'short',
       day: 'numeric',
       hour: '2-digit',
       minute: '2-digit'
     });
   }
   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
 };
 
 const openModal = (team) => {
   selectedTeam.value = team;
   showFullscreen.value = false;
 };
 
 onMounted(() => {
   fetchSections();
   fetchTeams();
   // Set up 5s polling
   refreshInterval = setInterval(() => {
     fetchTeams(true); // Silent update every 5s
   }, 5000);
 });
 
 onUnmounted(() => {
   if (refreshInterval) clearInterval(refreshInterval);
 });
 </script>
 
 <style scoped>
 .modal-enter-active,
 .modal-leave-active {
   transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
 }
 
 .modal-enter-from,
 .modal-leave-to {
   opacity: 0;
   transform: scale(0.95);
 }
 
 .fade-enter-active,
 .fade-leave-active {
   transition: opacity 0.3s ease;
 }
 
 .fade-enter-from,
 .fade-leave-to {
   opacity: 0;
 }
 
 /* Custom Scrollbar */
 .overflow-y-auto::-webkit-scrollbar {
   width: 6px;
 }
 .overflow-y-auto::-webkit-scrollbar-track {
   background: transparent;
 }
 .overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.10);
   border-radius: 20px;
 }
 .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.18);
 }
 </style>
 