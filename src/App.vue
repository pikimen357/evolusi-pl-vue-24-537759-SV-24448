<template>
  <div id="layout">
    <nav>
      <router-link to="/">Beranda</router-link>
      <router-link to="/services">Layanan</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
nav { display: flex; gap: 1rem; padding: 1rem; background: #1e3a5f; }
nav a { color: white; text-decoration: none; font-weight: 600; }
nav a.router-link-exact-active { text-decoration: underline; }
#layout { min-height: 100vh; }
.page { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
</style>
