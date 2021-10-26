<template>
    <div class="row">
        <!-- Start col -->
        <div class="col-lg-12">
            <div class="card m-b-30">
                <div class="card-body">
                <div class="table-responsive">
                    <div id="default-datatable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <div class="row">
                        <div class="col-sm-12">
                        <table id="default-datatable" class="display table table-striped table-bordered dataTable dtr-inline">
                            <thead>
                            <tr role="row">
                                <th :class="getClassSort(item)" @click="handleSort(item)" v-for="(item, index) in tableHeader" v-bind:key="index">{{ item.name }}</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in data" v-bind:key="item.id">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.point | getPoints }}</td>
                                    <td>{{ item.isCompleted | getCompleText  }}</td>
                                </tr>
                                <tr v-if="data.length == 0" style="text-align: center">
                                    <td colspan="4">No data</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- End col -->
    </div>
</template>

<script>
import { GET_MISSION_RESULT, GET_VALIDATORS, GET_TOTAL_POINT } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
export default {
    filters: {
      getPoints(value) {
        return value == null ? 0 : value
      },
      getCompleText(value) {
          return value == false ? 'Not completed' : 'Completed'
      }
    },
    data () {
        return {
            tableHeader:[
                {
                    key: "id",
                    name: "Id",
                    sortable: false,
                },
                {
                    key: "mission",
                    name: "Mission",
                    sortable: false,
                },
                {
                    key: "point",
                    name: "Points",
                    sortable: false,
                },
                {
                    key: "clear",
                    name: "Clear",
                    sortable: false,
                }
            ],
            data: [],
            validators: [],
            sort_type: "",
            sort_field: "",
            module_name: "fetchMissionResult",
            module_validator: "fetchValidators",
            module_total_point: "fetchMyPoint",
            id: this.$route.params.id
        }
    },
    mounted () {
        this.getValidators()
        this.getDataMission()
        this.getTotalPoint()
    },
    watch: {
        validators: {
            handler: function () {
                const validator = this.validators.find((x) => x.id == this.id)
                if(validator == undefined){
                    this.$toast.error('Not found validator');
                    this.$router.go(-1)
                }
                this.setLeftBreadScrumbar(validator.moniker)
            },
        }
    },
    methods: {
        getClassSort(item){
            if(!item.sortable){
                return ''
            }
            if(item.key == this.sort_field){
                return `sorting_${this.sort_type}`
            }
            return 'sorting'
        },
        handleSort(item){
            if(!item.sortable){
                return false
            }

            if(item.key == this.sort_field){
                this.sort_type = this.sort_type == 'desc' ? 'asc' : 'desc'
                return true
            }
            this.sort_field = item.key
            this.sort_type = 'desc'
            return true
        },
        getDataMission () {
            this.$apollo.query({
                query: GET_MISSION_RESULT,
                variables: { 
                    validatorID: parseInt(this.id),
                }
            }).then((response) => {
                this.data = getData(response, this.module_name)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        getValidators() {
            this.$apollo.query({
                query: GET_VALIDATORS,
            }).then((response) => {
                this.validators = getData(response, this.module_validator)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        getTotalPoint() {
            this.$apollo.query({
                query: GET_TOTAL_POINT,
                variables: { 
                    validatorID: parseInt(this.id),
                }
            }).then((response) => {
                let { totalPoints } = getData(response, this.module_total_point)
                totalPoints = totalPoints == undefined ? 0 : totalPoints
                this.setRightBreadScrumbar(`Total ${totalPoints}Pt`)
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        setLeftBreadScrumbar (value) {
            this.$bus.emit('setLeftBreadScrumbar', value)
        },
        setRightBreadScrumbar (value) {
            this.$bus.emit('setRightBreadScrumbar', value)
        }
    }
}
</script>