<template>
  <div class="absolute inset-0 z-10 bg-dark px-8 text-light sm:px-16">
    <div class="relative mx-auto flex h-screen max-w-screen-2xl items-center justify-center">
      <div class="font-optical-size-sm absolute top-0 right-0 py-4 text-sm">
        <button @click="$emit('close-video')" class="tracking">关闭</button>
      </div>
      <video controls class="max-h-[80%]">
        <source src="/luohei.webm" type="video/webm" />
      </video>
    </div>
  </div>
</template>
