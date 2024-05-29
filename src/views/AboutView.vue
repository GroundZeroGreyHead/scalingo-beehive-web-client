<script setup>
import BeehiveDetail from '../components/BeehiveDetail.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Back to hives</RouterLink>
      </nav>
    </div>
  </header>
  <div class="wrapper"></div>
  <main>
    <BeehiveDetail />
  </main>
</template>
