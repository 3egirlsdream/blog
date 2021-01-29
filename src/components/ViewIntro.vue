<template>
  <section class="mb-12 text-center">
    <h1
      class="mb-2 text-h3"
      v-text="heading"
    />

    <div
      v-if="link"
      class="body-2 font-weight-light"
    >An ac a day, keep girls away.
    </div>

    <v-responsive
      class="text-center mx-auto text-body-1 font-weight-light"
      max-width="400"
    >
      <slot />
    </v-responsive>
  </section>
</template>

<script>
  export default {
    name: 'ViewIntro',

    props: {
      heading: String,
      link: String,
    },
  }
</script>
