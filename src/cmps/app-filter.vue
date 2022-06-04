<template>
    <section class="app-filter">
        <div v-for="filter in filters" :key="filter._id">
            <!-- <router-link to="/todo/${filter._id}"> -->
            <router-link :to="{path: `/todo/${filter._id}`}">
                <button class="filter-btn">
                    {{filter.txt}}
                </button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
    name: 'app-filter',
    components: {},
    data() {
        return {
            filters: [
                {
                    _id: 'school',
                    txt: 'School'
                },
                {
                    _id: 'work',
                    txt: 'Work'
                },
                {
                    _id: 'personal',
                    txt: 'Personal'
                },
                {
                    _id: 'all',
                    txt: 'All'
                }
            ]
        }
    }

})

</script>