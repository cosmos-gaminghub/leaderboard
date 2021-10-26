import gql from 'graphql-tag'

export const GET_VALIDATORS = gql`
  query GET_VALIDATORS {
    fetchValidators {
        id,
        moniker,
        operatorAddress,
        address,
        totalTxs,
        totalMissedBlocks,
        totalSlashedCounts,
    }
  }
`

export const GET_MISSION_RESULT = gql`
  query GET_MISSION_RESULT ($validatorID: Int) {
    fetchMissionResult(validatorID: $validatorID) {
        id,
        name,
        detail,
        point,
        isCompleted
    }
  }
`

export const GET_TOTAL_POINT = gql`
  query GET_MY_POINT ($validatorID: Int) {
    fetchMyPoint(validatorID: $validatorID) {
      totalPoints
    }
  }
`

