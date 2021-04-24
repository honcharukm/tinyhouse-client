import { gql } from '@apollo/client'

export const LISTING_LIST = gql`
    query ListingList($filter: ListingsFilter!, $limit: Int!, $page: Int!) {
        listings(filter: $filter, limit: $limit, page: $page) {
            result {
                id
                title
                image
                address
                price
                numOfGuests
            }
        }
    }
`