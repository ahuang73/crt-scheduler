<script setup lang="ts">

</script>

<template>
    <div class="middle">
        <div class="well">
            <h1>Shifts</h1>
            <p>
                You will only be able to take shifts which you meet the criteria for. The restrictions are...
            </p>
            <ul>
                <li>
                    If you are suspended you cannot take any shifts
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>You cannot take a shift that conflicts with another shift you already have</li>
                <li>
                    If you are a secondary you cannot take a primary shift
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>
                    If you are a primary you cannot take a secondary shift until it is critical and the primary spot is
                    taken
                    except for Training, Debrief, and AnP shifts
                </li>
                <li>If your total hours (past + future) meet the quota you cannot take a shift until it is critical</li>
                <li>Supervisor shifts are never critical</li>
                <li>Training shifts become critical 30 days before they start</li>
                <li>Debrief shifts are never critical</li>
                <li>AnP shifts become critical 7 days before they start</li>
                <li>Regular shifts become critical 40 days before they start</li>
            </ul>
            <p>
                You can see a report of your hours and shifts by clicking "profile" in the navigation bar.
            </p>
            <p>
                If a shift changes or is cancelled, those affected will be notified by telephone or e-mail and details will
                be
                posted here within 24 hours of the shift. If you notice any errors, please contact the Director of
                Scheduling
                ASAP.
            </p>
        </div>
        <div>
            <b-table responsive :items="items"></b-table>
        </div>

    </div>
</template>
<style scoped>
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
    -webkit-text-size-adjust: 100%;


}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

div {
    display: block;
    width: 100%;
}</style>