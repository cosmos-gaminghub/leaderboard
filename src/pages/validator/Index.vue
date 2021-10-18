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
                        </router-link></td>
                        <td><a :href="item.address | getAddressLink">{{ item.address }}</a></td>
                        <td><a :href="item.address | getValidatorLink">{{ item.totalPoints | getPoints }}</a></td>
                        <td>{{ item.totalTxs | getTxCount  }}</td>
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
import { GET_VALIDATORS } from '@/utils/graphql'
import { getErrorMessage, getData } from '@/utils/api_response'
export default {
    filters: {
      getPoints(value) {
        return value == null ? 0 : value
      },
      getTxCount(value) {
        return value == null ? 0 : value
      },
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
                    key: "point",
                    name: "Points",
                    sortable: true,
                },
                {
                    key: "total_txs",
                    name: "Tx Count",
                    sortable: true,
                }
            ],
            data: [],
            sort_type: "desc",
            sort_field: "moniker",
            module_name: "fetchValidators"
        }
    },
    mounted () {
        this.getData()
        this.setLeftBreadScrumbar('Leaderboard')
        this.setRightBreadScrumbar('')
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
            this.data.sort(function (a, b) {
              if(this.sort_type == 'asc'){ 
                return a[this.sort_field] - b[this.sort_field];
              } else { 
                return b[this.sort_field] - a[this.sort_field];
              }
            });
            return true
        },
        getData () {
            this.$apollo.query({
                query: GET_VALIDATORS,
            }).then((response) => {
                this.data = getData(response, this.module_name)
            }).catch((error) => {
                console.log(error.graphQLErrors)
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
