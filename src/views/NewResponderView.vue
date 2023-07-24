<script setup lang="ts">
import { CForm, CFormLabel, CFormInput, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem  } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
</script>

<template>
    <div class="page-header">
        <h1>New Responder</h1>
    </div>
    <div class="well">
        <CForm>
            <div class="outer">
                <CFormLabel for="fname">First Name</CFormLabel>
                <CFormInput type="text" id="fname" placeholder="" />
            </div>
            <div>
                <CFormLabel for="lname">Last Name</CFormLabel>
                <CFormInput type="text" id="lname" placeholder="" />
            </div>
            <div class="outer">
                <CFormLabel for="username">Username</CFormLabel>
                <CFormInput type="text" id="username" placeholder="" />
            </div>
           
            <div class = "outer">
                Position
                <div>
                <CDropdown>               
                <CDropdownToggle color="primary" variant="outline">Position</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="">Rookie</CDropdownItem>
                    <CDropdownItem href="#">Secondary</CDropdownItem>
                    <CDropdownItem href="#">Primary</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </div>
            </div>
            <div class = "outer">
                <CFormLabel for="date"> SFA Expiry </CFormLabel>
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>

            <div class = "outer">
                <CFormLabel for="date"> BLS Expiry </CFormLabel>
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>

            <div class = "outer">
                <CFormLabel for="date"> FR Expiry </CFormLabel>
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>

            <CButton color="success" value="new_shift">Sign Up</CButton>
        </CForm>
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
.page-header {
    padding-bottom: 9px;
    margin: 80px 0 30px;
    border-bottom: 1px solid #eee;
}
.well {
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