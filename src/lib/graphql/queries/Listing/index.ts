import { gql } from '@apollo/client'

export const LISTING = gql`
    query Listing($id: String!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
        id
        title
        description
        image
        host {
            id
            userId
            name
            avatar
            hasWallet
        }
        type
        address
        city
        bookings(limit: $limit, page: $bookingsPage) {
            total
            result {
            id
            tenant {
                id
                name
                avatar
            }
            checkIn
            checkOut
            }
        }
        bookingsIndex
        price
        numOfGuests
        }
    }
`