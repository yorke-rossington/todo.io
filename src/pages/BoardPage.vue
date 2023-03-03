<template>
    <div class="bg-gray-100 flex flex-col grow text-white relative">
        <board-header />
        <board-canvas />
    </div>
</template>

<script setup lang="ts">
import BoardHeader from "@/components/board/BoardHeader.vue";
import BoardCanvas from "@/components/board/BoardCanvas.vue";
</script>
