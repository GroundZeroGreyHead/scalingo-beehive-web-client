<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="600">
            <v-toolbar color="secondary">
              <v-toolbar-title>Beehives</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list lines="three">
              <v-list-item
                v-for="beehive in beehives"
                :key="beehive.id"
                :subtitle="`${beehive.weight} kg`"
                :title="beehive.name"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="info" icon="$vuetify" size="x-large"></v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <RouterLink :to="{ name: 'BeehiveDetail', params: { id: beehive.id } }">
                    <v-icon left>mdi-bee</v-icon>
                    view
                  </RouterLink>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
          <v-row>
            <v-col cols="6">
              <v-btn @click="fetchBeehives(currentPage - 1)" :disabled="currentPage === 1"
                >Previous</v-btn
              >
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn @click="fetchBeehives(currentPage + 1)" :disabled="currentPage === totalPages"
                >Next</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <form @submit.prevent="addBeehive">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="newBeehive.name" label="Name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="newBeehive.weight" label="Weight" type="number"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" color="primary">Add Beehive</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </form>
    <ul v-if="errors">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { getBeehives, createBeehive } from '../services/beehives/api'

export default {
  data() {
    return {
      beehives: [],
      newBeehive: {
        name: '',
        weight: 0
      },
      currentPage: 1,
      totalPages: 1,
      errors: null
    }
  },
  async created() {
    await this.fetchBeehives(this.currentPage)
  },
  methods: {
    async fetchBeehives(page) {
      if (page > this.totalPages || page < 1) return

      const response = await getBeehives(page)
      this.beehives = response.data.beehives
      this.currentPage = response.data.meta.current_page
      this.totalPages = response.data.meta.total_pages
    },
    async addBeehive() {
      try {
        const response = await createBeehive(this.newBeehive)
        this.beehives.push(response.data)
        this.newBeehive.name = ''
        this.newBeehive.weight = 0
        this.errors = []
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors
        } else {
          this.errors = ['unknown error occurred']
        }
      }
    }
  }
}
</script>
