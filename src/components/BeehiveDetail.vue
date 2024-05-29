<template>
  <div>
    <h1>Beehive Details</h1>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-if="beehive">
            <v-card
              max-width="600"
              :title="beehive.name"
              :subtitle="beehive.created_at"
              :text="`${beehive.weight} kg`"
              variant="tonal"
            />
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getBeehive } from '../services/beehives/api'

export default {
  props: ['id'],
  data() {
    return {
      beehive: null
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await getBeehive(id)
      this.beehive = response.data
    } catch (error) {
      console.error('Error fetching beehive details:', error)
    }
  }
}
</script>
