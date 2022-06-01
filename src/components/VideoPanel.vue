<template>
  <div class="absolute inset-0 px-8 sm:px-16 z-10 text-light bg-dark">
    <div class="relative flex items-center justify-center h-screen max-w-screen-2xl mx-auto">
      <div class="absolute top-0 right-0 py-4 text-sm font-optical-size-sm">
        <button @click="$emit('close-video')" class="tracking">关闭</button>
      </div>
      <video controls class="max-h-[80%]">
        <source src="/luohei.webm" type="video/webm" />
      </video>
    </div>
  </div>
</template>
