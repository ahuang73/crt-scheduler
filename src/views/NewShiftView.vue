<script setup lang="ts">
import { CForm, CFormLabel, CFormTextarea, CFormInput, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CButton } from '@coreui/vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


</script>

<template>
    <div class="page-header">
        <h1>New Shift</h1>
    </div>
    <div class="well">
        <CForm>
            <div class = "outer">
                <CFormLabel for="name">Name</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" />
            </div>
            <div>
                <CFormLabel for="name">Location</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" />
            </div>
            
            <div class = "outer">
                Shift Type
                <div>
                <CDropdown>               
                <CDropdownToggle color="primary" variant="outline"> Shift Type</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="">Regular</CDropdownItem>
                    <CDropdownItem href="#">Supervisor</CDropdownItem>
                    <CDropdownItem href="#">Training</CDropdownItem>
                    <CDropdownItem href="#">Debrief</CDropdownItem>
                    <CDropdownItem href="#">AnP</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </div>
            </div>
            
            <div class = "outer">
                <CFormLabel for="date"> Start Date </CFormLabel>
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>

            <div class = "outer">
                <CFormLabel for="date"> End Date </CFormLabel>
                <VueDatePicker v-model ="date"></VueDatePicker>
            </div>
            <div class = "outer">
                Primary
                <div>
                <CDropdown>               
                <CDropdownToggle color="primary" variant="outline">Primary</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="">A</CDropdownItem>
                    <CDropdownItem href="#">B</CDropdownItem>
                    <CDropdownItem href="#">C</CDropdownItem>
                    <CDropdownItem href="#">D</CDropdownItem>
                    <CDropdownItem href="#">E</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </div>
            </div>
            <div class = "outer">
                Secondary
                <div>
                <CDropdown>               
                <CDropdownToggle color="primary" variant="outline">Secondary</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="">A</CDropdownItem>
                    <CDropdownItem href="#">B</CDropdownItem>
                    <CDropdownItem href="#">C</CDropdownItem>
                    <CDropdownItem href="#">D</CDropdownItem>
                    <CDropdownItem href="#">E</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </div>
            </div>

            <div class = "outer">
                Rookie
                <div>
                <CDropdown>               
                <CDropdownToggle color="primary" variant="outline">Rookie</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="">A</CDropdownItem>
                    <CDropdownItem href="#">B</CDropdownItem>
                    <CDropdownItem href="#">C</CDropdownItem>
                    <CDropdownItem href="#">D</CDropdownItem>
                    <CDropdownItem href="#">E</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </div>
            </div>
            <CFormLabel for="Description">Description</CFormLabel>
            <CFormTextarea id="Description" rows="3"></CFormTextarea>
            <div>
                <CFormLabel for="splitlength">Split Length(Minutes)</CFormLabel>
                <CFormInput type="text" id="splitlength" placeholder="" />
            </div>
            <CButton color="success" value="new_shift" >Create</CButton>
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
.outer{
    margin-top: 10px;
}

</style>