<template>
  <div>
    <div id="header">
      <div class="container"><img class="app-logo" src="/../thapovan-logo.png"></div>
    </div>
    <div id="content">
      <div class="container">
          <h2>Test Results</h2>
        </div>
        <div class="result">
          <ul>
            <li>Environment
              <v-select v-model="envs"
                        id="ccenvs"
                        class="form-field"
                        name="cc_envs"
                        :options="searchFilters.envs">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
            </li>
            <li>Type
              <v-select v-model="type"
                        id="cctype"
                        class="form-field"
                        name="cc_type"
                        :options="searchFilters.types">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
            </li>
            <li>Sprint
              <v-select v-model="sprint"
                        id="ccsprint"
                        class="form-field"
                        name="cc_sprint"
                        :options="searchFilters.sprint_names"
                        @input="getTicketList">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
            </li>

            <li>Ticket Number
              <v-select v-model="ticket_no"
                        id="cctickets"
                        class="form-field"
                        name="cc_tickets"
                        :options="ticketFilters"
                        @input="getTicketList">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
</li>

            <li>Status
              <v-select v-model="status"
                        id="ccstatus"
                        class="form-field"
                        name="cc_status"
                        :options="searchFilters.status">
                <template slot="option" slot-scope="option">
                  {{ option.label }}
                </template>
              </v-select>
            </li>
            <li><datepicker v-model="endDate" value="05-03-2019" format="DD-MM-YYYY" name="date2"></datepicker></li>
            <li><button type="button" @click="displaynumbers" ref="myBtn">
              Search!
            </button>
            </li>
            <li><button type="button" @click="resetSearch" ref="myBtn">
              Reset!
            </button>
            </li>
                     </ul>
        </div>

      <div class="table-no-results" v-if="!testResults.length">No Record Found</div>
      <div class="table-results" v-else>
        <ul class="title"><li>Ticket</li>
          <li>Description</li>
          <li>Date</li>
          <li>Status</li>
          <li>Link</li>
        </ul>
        <ul v-for="value in testResults" v-bind:key="value.id" class="results">
          <li> {{ value.ticket_name || 'N/A' }}</li>
          <li> {{ value.description }}</li>
          <li> {{ value.inserted_at  | moment("MMMM Do YYYY") }}</li>
          <li class="passed" v-if="value.status === 1">Passed</li>
          <li class="failed" v-else-if="value.status === 2">Failed</li>
          <li class="critical" v-else-if="value.status === 3">Critical</li>
          <li class="inprogress" v-else-if="value.status === 4">In-Progress</li>
          <li class="warning" v-else-if="value.status === 5">Warning</li>
          <li><a :href="value.report_url"> View Report</a></li>
        </ul>
      </div>
      </div>
  </div>
</template>

<script>
import Api from '@/services/Api';
import datepicker from 'vue-date-picker'

export default {
  name: 'TestResult',
  data() {
    return {
      envs: { label: "All", value: "" },
      type: { label: "All", value: "" },
      ticket_no: { label: "All", value: "" },
      sprint: { label: "All", value: "" },
      status: { label: "All", value: "" },
      testResults : [],
      endDate: '04-03-2019',
      searchFilters : [],
      ticketFilters : [{
        "value": "",
        "label": "All"
      }],
    }
  },
  components: {
    datepicker
  },
  methods: {
    displaynumbers: function (event) {
      console.log(this.endDate);
      Api.get(`/automationResults?envs=${this.envs.value}&type=${this.type.value}&ticket_no=${this.ticket_no.value}&sprint=${this.sprint.value}&status=${this.status.value}&uid=`)
      .then(response => {
          this.testResults = response.data || [];
          console.log(this.testResults);
        }).catch(exception => {
          console.error(exception);
          this.testResults = [];
      });
    },
    resetSearch: function (event) {
      this.envs = '';
      this.type = '';
      this.ticket_no = 'All';
      this.sprint = '';
      this.status = '';
      Api.get(`/automationResults`).then(response => {
        this.testResults = response.data || [];
        console.log(this.testResults);
      }).catch(exception => {
        console.error(exception);
        this.testResults = [];
      });
    },
    getTicketList: function(params) {
      if (params.value) {
        Api.get(`http://localhost:8080/testsprint.json`).then(response => {
          this.ticketFilters = response.data || [];
        }).catch(exception => {
          console.error(exception);
          this.ticketFilters = [{
            "value": "All",
            "label": "All"
          }];
        });
      } else {
        this.ticketFilters = [{
          "value": "All",
          "label": "All"
        }];
      }
    }
  },
  mounted(){
    this.displaynumbers();
  },
  beforeMount: function () {
    this.ticketFilters = [];
    // `this` points to the view model instance
    Api.get(`http://localhost:8080/test.json`).then(response => {
      this.searchFilters = response.data || [];
    }, err => {
      console.error(err);
      this.searchFilters = [];
    });
  },
}
</script>

<style type="text/css">
.app-logo {display: inline-block;
  max-height: 32px;
  max-width: 150px;
  margin: 14px 0 0 0;
  background: #fff;}
.container {width:calc(100% - 50px);margin:0 auto;max-width:1312px;padding:0 25px}
a {color:#1994d2;text-decoration:none;cursor:pointer}
.icon-error,.icon-success {display:inline-block;font-style:normal;font-weight:700;font-size:20px}
.icon-error::before {content:'\2715';color:#d00}
.icon-success::before {content:'\2713';color:#0d0}
#header {display:block;width:100%;background:#1895d2;box-shadow:0 4px 4px rgba(0,0,0,0.05);height:56px;padding:0}
#content {margin:20px 0 0 0}
/*#content .title {padding:0 0 10px 0;margin:0 0 10px 0;border-bottom:solid 1px #e2e2e2}*/
#content .title h2 {display:inline-block;font-size:24px;font-weight:500}
#content .title span {display:inline-block;float:right;position:relative;top:10px}
#content .result {margin: 10px auto;display: block;background: #e2e2e2;padding: 10px;border-radius: 5px;width: calc(100% - 40px);}
#content .result h5 {font-size:17px;font-weight:500; margin: 0 0 5px 0;}
#content .result h5 span { font-size:14px;}
#content .table-no-results {text-align: center; width: calc(100% - 40px); margin: 0 auto; border: 1px solid #ccc; height: 150px; vertical-align: middle; padding: 91px 0 0 0; color: #ff0000;}
#content .table-results {text-align: center;width: calc(100% - 40px);margin: 0 auto; border:1px solid #ccc;}
#content .table-results .title{display: table; background: #666; width: 100%;}
#content .table-results .title li{display: table-cell; color: #fff;padding: 5px; width: 5%; text-align: left;}
#content .table-results .title li:nth-child(2){width: 30%;}
/*#content .title {padding: 0 0 10px 0;margin: 0 0 10px 0;border-bottom: solid 1px #e2e2e2;width: 100%;}*/
#content .table-results .results{display: table; width: 100%;}
#content .table-results .results li{background: rgba(0,255,0, 0.05);display: table-cell; color: #666;padding: 5px; width: 5%;border-bottom: 1px solid rgba(88, 116, 119, 0.15); text-align: left;}
#content .table-results .results li:nth-child(2){width: 30%;word-break: break-all;}
#content .table-results .results li.passed{color:#0c0;}
#content .table-results .results li.pending{color:#f80;}
#content .result ul {list-style:none;margin:0;padding:0; text-align: center;}
#content .result ul li {display:inline-block; margin-right:5px;}
#content .result ul li label{margin-right: 10px;}
#content .result ul li select{border: 1px solid #ccc; border-radius:2px; padding:2px 6px;}
#content .result ul li a {color: #1994d2;}
#content .result ul li span {font-weight:500; margin-left:3px;}
#content .result ul li a span {text-decoration:underline; }
#content .result ul li a span:hover {text-decoration:none}
#content .result ul li button{outline:0;padding: 6px 20px;font-size: 14px;line-height: 16px;color: #fff;background: #5ab9fb;text-decoration: none;border: none;border-radius: 19px; cursor: pointer;}
#content .result ul li button:hover{background: #5aa2fb;}
#content .result ul li .passed {color:#0c0; text-decoration:none}
#content .result ul li .failed {color:#d00; text-decoration:none}
#content .result ul li .pending {color:#f80; text-decoration:none}
#content .panel {display:block;width:100%;margin:0 0 20px 0}
#content .panel .panel-title {margin:0 0 15px 0;text-align:center;}
#content .panel .panel-title h4 {display:inline-block;float:left;font-size:18px;font-weight:500;color:#000;margin-bottom:10px}
#content .panel .panel-title p.note {font-style:italic;font-size:13px}
#content .panel .panel-title .filters{float:right;position:relative;top:2px;display:inline-block; margin-right:20px;}
#content .panel .panel-title .filters span {margin-right: 10px;}
#content .panel .panel-title .filters span:last-child{margin-right:0;}
#content .panel .panel-title .filters span input {position: relative;top: 2px;}
#content .panel .panel-title .links {float:right;position:relative;top:-3px;}
#content .panel .panel-title .links a {margin-right:10px; display:inline-block; padding:6px 20px;  font-size:14px; line-height:16px; color: #fff;
  background: #5ab9fb; text-decoration:none; border:none; border-radius:19px; cursor:pointer;}
#content .panel .panel-title .links a:last-child{margin-right:0;}
#content .panel .panel-title .links a#linkExpand:before, #content .panel .panel-title .links a#linkCollapse:before {display: inline-block; margin-right: 7px; color: #fff; font-size:18px; font-weight:bold; line-height: 10px;}
#content .panel .panel-title .links a#linkExpand:before {content:'+'; }
#content .panel .panel-title .links a#linkCollapse:before {content:'\2013';}
#content .panel .panel-content .col-1,#content .panel .panel-content .col-2 {display:block;width:50%;float:left}
#content .panel .panel-content .col-1 .progress-bar,#content .panel .panel-content .col-2 .progress-bar {display:inline-block;vertical-align:middle;width:150px;height:20px;background:#090;position:relative}
#content .panel .panel-content .col-1 .progress-bar span,#content .panel .panel-content .col-2 .progress-bar span {display:inline-block;height:20px;position:absolute;right:0;background:#d00}
#content .panel .panel-content .col-1 h6,#content .panel .panel-content .col-2 h6 {font-size:16px;font-weight:500;margin-bottom:10px}
#content .panel .panel-content .col-1 section,#content .panel .panel-content .col-2 section {margin:0 0 20px 0;width:100%}
#content .panel .panel-content table {width:100%;margin:0;padding:0;border-right:solid 1px #e2e2e2;}
#content .panel .panel-content table th {background:#666;text-transform:uppercase;color:#fff;}
#content .panel .panel-content table td,#content .panel .panel-content table th {vertical-align:middle;border-bottom:solid 1px #e2e2e2;text-align:left}
#content .panel .panel-content table td span, #content .panel .panel-content table th span {box-sizing:border-box;display:inline-block; width:100%;padding:5px 15px;}
#content .panel .panel-content table tr:last-child td {border-bottom:none}
#content .panel .panel-content table tr:last-child tr td {border-bottom: solid 1px #ccc;}
#content .panel .panel-content table tr:last-child tr:last-child td {border-bottom: none;}
#content .panel.test-scenarios table td:first-child {width:50px;text-align:center;border-left:solid 1px #e2e2e2;}
#content .panel.test-scenarios .panel-content > table td:nth-child(3), #content .panel.test-scenarios .panel-content > table td:nth-child(4), #content .panel.test-scenarios .panel-content > table td:nth-child(5), #content .panel.test-scenarios .panel-content > table td:nth-child(6), #content .panel.test-scenarios  .panel-content > table td:nth-child(7) { width: 125px;}
#content .panel.test-scenarios table td a {text-decoration:none;}
#content .panel.test-scenarios table td a.taskname.has-child::before{content:''; display:inline-block; vertical-align:top; position:relative; top:3px; width:0; height:0; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 6px solid #666; margin-right:10px; }
#content .panel.test-scenarios table td a.taskname.has-child.expand::before { top:7px; left:-4px; margin-right:4px; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #666; border-bottom:none;}
#content .panel.test-scenarios table td a:hover { text-decoration:none; }
#content .panel.test-scenarios table td img.thumbnail{width:100px;height:auto;}
#content .panel.test-scenarios table .subtask table {border:none; padding:0 0 0 50px;}
#content .panel.test-scenarios table .subtask > td {border-left:none;}
#content .panel.test-scenarios table .subtask table th {background:#e2e2e2; color:#000;display:none;}
#content .panel.test-scenarios table .subtask table td:last-child {width:150px;}
#content .panel.test-scenarios table .subtask table tr:last-child td {border-bottom:solid 1px #e2e2e2;}
#content .panel .panel-content table td span.error {color:#d00;}
#content .panel .panel-content table tr.passed td, #content .panel .panel-content table tr.testcase-passed td {background:rgba(0,255,0, 0.05);}
#content .panel .panel-content table tr.failed td, #content .panel .panel-content table tr.testcase-failed td {background:rgba(255,0,0, 0.05);}

.modal {background:rgba(0,0,0,0.5);position:fixed;width:100%;height:100%;top:0;left:0;text-align:center;display:inline-block;z-index:100;}
.modal:before {display:inline-block;width:0;height:100%;vertical-align:middle;content:''}
.modal .modal-dialog {width:98%;margin:0 auto;display:inline-block;vertical-align:middle}
.modal .modal-dialog .modal-content {position:relative; width:800px;margin:0 auto;}
.modal .modal-dialog .modal-content .modal-header .close{line-height:27px;color: #fff;opacity: 1; position: absolute;z-index: 101;right: -15px; top: -20px;font-size: 30px;text-decoration:none !important;background: #e00;display: inline-block;width: 30px; height: 30px;text-align: center; vertical-align: middle;border-radius:100%;}
.modal .modal-dialog .modal-content .modal-body {position:relative; background:#fff;box-shadow: 0 0 10px rgba(0,0,0,0.5);}
.modal .modal-dialog .modal-content .modal-body img {width:auto; max-width:800px; max-height:600px;}
.datetime-picker input { width:90px !important; height:23px !important;}
.dropdown {min-width: 150px;}
.v-select {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  position: relative;
}
.v-select .vs__selected-options {
  max-width: 100%;
}
.v-select .dropdown-toggle {
  background: #f8f8f8 !important;
  border: solid 1px rgba(0, 0, 0, .07) !important;
  border-radius: 3px !important;
  white-space: nowrap;
  height: 35px;
  color: #494949;
  cursor: pointer !important;
  position: relative;
}
.v-select .dropdown-toggle .selected-tag {
  padding: 8px 11px;
  width: calc(100% - 15px);
  height: auto;
  line-height: 18px;
  font-size: 15px;
  font-weight: 400;
  color: #494949;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  margin: 0;
  border-radius: 0;
}
.v-select .dropdown-toggle .clear {
  display: none;
}
.v-select input[type=search] {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute !important;
  left: 0;
  cursor: pointer;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-size: 15px !important;
  font-weight: 300 !important;
  line-height: 18px !important;
  color: #494949 !important;
  padding: 7px 32px 10px 13px !important;
  border: none;
  margin: 0 !important;
  width: 100% !important;
}
.v-select .dropdown-menu {
  position: absolute !important;
  top: 110% !important;
  margin-top: 0 !important;
  background: #fff !important;
  border-radius: 3px !important;
  border: 1px solid #71c5ff !important;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3) !important;
  padding: 0;
  max-height: 200px !important;
}
.v-select .dropdown-menu li {
  font-size: 15px;
  line-height: 22px;
  font-weight: 300;
  padding: 0;
  display: inline-block;
  width: 100%;
  white-space: normal;
  word-wrap: break-word;
}
.v-select .dropdown-menu li a {
  padding: 10px;
  color: rgba(0, 0, 0, .7) !important;
  white-space: normal;
  word-wrap: break-word;
}
.v-select .dropdown-menu li a:hover {
  background: #e7f5fc !important;
  color: rgba(0, 0, 0, .7);
}
.v-select .dropdown-menu li.no-options {
  padding: 10px;
  color: rgba(0, 0, 0, .7);
  text-align: left;
}
.v-select .dropdown-menu > .highlight > a {
  background: #e7f5fc !important;
}
.v-select .open-indicator {
  position: absolute;
  width: 7px;
  top: 12px;
  right: 10px;
  height: 7px;
}
.v-select .open-indicator::before {
  width: 7px !important;
  height: 7px !important;
  border-width: 2px 2px 0 0 !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
}
.v-select.open .open-indicator {
  top: 15px !important;
}
body.scrolldiv {width:calc(100% + 16px); overflow-x:hidden; }
body.scrolldiv::-webkit-scrollbar { width:16px; }
body.scrolldiv::-webkit-scrollbar-track { background-color:#fff; }
body.scrolldiv::-webkit-scrollbar-thumb { background-color:#ccc; border-radius:7px; border-width:0 6px; border-style:solid; border-color:#fff; }
body.scrolldiv::-webkit-scrollbar-thumb:hover { background-color:#c0c0c0; }

</style>
