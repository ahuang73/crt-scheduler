<script setup lang="ts">
import { CForm, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
</script>

<template>
    <div class="well">
        <h1>End of Term</h1>
        <p>Warning, make sure that you have finished your end of term report before you reset RMS for the end of the term
        </p>
        <p>The following will take place...
        </p>
        <ul>
            <li>All shifts before the selected date will be cleared from the database</li>
            <li>A celebratory kitten will be prepared</li>
        </ul>
        <CForm>
            <div class = "outer">
               
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>
        </CForm>

        <CButton color="danger" value="new_shift">Reset</CButton>

    </div>
</template>
<script lang="ts">
export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  }
}
</script>

<style scoped>
.well {
    margin-top: 80px;
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>