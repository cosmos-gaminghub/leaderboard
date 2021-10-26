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
                      <tr v-for="item in data"  v-bind:key="item.address">
                        <td>
                          <router-link
                            :to="{ name: 'validator.detail', params: { id: item.id }}"
                          >{{ item.moniker }} 
                        </router-link> <a :href="item.operatorAddress | getValidatorLink" target="_blank"><i class="fa fa-external-link" aria-hidden="true" style="color:gray; margin-left: 5px;"></i></a></td>
                        <td><a :href="item.address | getAddressLink">{{ item.address }}</a></td>
                        <td>{{ item.totalTxs }}</td>
                        <td>{{ item.totalMissedBlocks }}</td>
                        <td>{{ item.totalSlashedCounts }}</td>
                      </tr>
                      <tr v-if="data.length == 0" style="text-align: center">
                          <td colspan="6">No data</td>
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
import { GET_VALIDATORS } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
export default {
    filters: {
      getAddressLink(value){
        return `https://neuron.game-explorer.io/account/${value}`
      },
      getValidatorLink(value) {
        return `https://neuron.game-explorer.io/validators/${value}`
      }
    },
    data () {
        return {
            tableHeader:[
                {
                    key: "moniker",
                    name: "Validator",
                    sortable: false,
                },
                {
                    key: "address",
                    name: "Address",
                    sortable: false,
                },
                {
                    key: "totalTxs",
                    name: "Tx Count",
                    sortable: true,
                },
                {
                    key: "totalMissedBlocks",
                    name: "Total Missed Block",
                    sortable: true,
                },
                {
                    key: "totalSlashedCounts",
                    name: "Total Slashed Counts",
                    sortable: true,
                },
            ],
            data: [],
            sort_type: "desc",
            sort_field: "totalTxs",
            module_name: "fetchValidators"
        }
    },
    mounted () {
        this.setLeftBreadScrumbar('Leaderboard')
        this.setRightBreadScrumbar('')
        this.getData()
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

            const sortField = item.key
            let sortType = 'desc'
            if(sortField == this.sort_field){
                sortType = this.sort_type == 'desc' ? 'asc' : 'desc'
            }

            this.setSortType(sortType)
            this.setSortField(sortField)
            this.sort()
            return true
        },
        getData () {
            this.$apollo.query({
                query: GET_VALIDATORS,
            }).then((response) => {
                this.data = getData(response, this.module_name)
                this.formatData()
                this.sort()
            }).catch((error) => {
                let message = getErrorMessage(error.graphQLErrors)
                this.$toast.error(message);
            })
        },
        sort () {
            const sortField = this.sort_field
            if(this.sort_type == 'asc'){ 
              this.data.sort(function (a, b) {
                  return a[sortField] - b[sortField];
              });
            } else {
              this.data.sort(function (a, b) {
                  return b[sortField] - a[sortField];
              });
            }
        },
        formatData () {
          this.data.forEach((elment, index) => {
              if(elment.totalTxs == null){
                  this.data[index].totalTxs = 0
              }
              if(elment.totalMissedBlocks == null){
                  this.data[index].totalMissedBlocks = 0
              }
              if(elment.totalSlashedCounts == null){
                  this.data[index].totalSlashedCounts = 0
              }
          })
        },
        setLeftBreadScrumbar (value) {
            this.$bus.emit('setLeftBreadScrumbar', value)
        },
        setRightBreadScrumbar (value) {
            this.$bus.emit('setRightBreadScrumbar', value)
        },
        setSortField(field){
            this.sort_field = field
        },
        setSortType(type){
            this.sort_type = type
        }

    }
}
</script>
