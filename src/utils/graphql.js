import gql from 'graphql-tag'

export const GET_VALIDATORS = gql`
  query GET_VALIDATORS {
    fetchValidators {
        id,
        moniker,
        operator_address,
        address,
        totalPoints,
        totalTxs,
    }
  }
`

export const GET_VALIDATOR_DETAIL = gql`
  query GET_VALIDATOR_DETAIL ($validatorID: Int!) {
    fetchValidator(validatorID: $validatorID) {
        id,
        moniker,
        operator_address,
        address,
        totalPoints,
        totalTxs,
    }
  }
`

export const GET_MISSION_RESULT = gql`
  query GET_MISSION_RESULT ($validatorID: Int!) {
    fetchMissionResult(validatorID: $validatorID) {
        id,
        name,
        detail,
        point,
        isCompleted
    }
  }
`

