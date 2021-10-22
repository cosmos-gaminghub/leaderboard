import gql from 'graphql-tag'

export const GET_VALIDATORS = gql`
  query GET_VALIDATORS {
    fetchValidators {
        id,
        moniker,
        operatorAddress,
        address,
        totalPoints,
        totalTxs,
        totalMissedBlocks,
        totalSlashedCounts,
    }
  }
`

export const GET_VALIDATOR_DETAIL = gql`
  query GET_VALIDATOR_DETAIL ($validatorID: Int) {
    fetchValidator(validatorID: $validatorID) {
        id,
        moniker,
        operatorAddress,
        address,
        totalPoints,
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

