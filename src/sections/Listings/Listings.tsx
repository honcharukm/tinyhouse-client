import React from 'react'
import { server } from '../../lib/api'
import { ListingsData, DeleteListingData, deleteListingVariables } from './types'

const LISTINGS = `
    query Listings {
        listings {
            id
            title
            image
        }
    }
`

const DELETE_LISTING = `
    mutation DeleteListing($id: Int!) {
        deleteListing(id: $id)
    }
`

export const Listings = () => {
    const fetchListings = async () => {
        const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
        console.log(data)
    }

    const deleteListing = async() => {
        const { data } = await server.fetch<DeleteListingData, deleteListingVariables>({
            query: DELETE_LISTING,
            variables: {
                id: 22
            }
        })

        console.log(data)
    }

    return (
        <div>
            <h2>Tinyhouse Listings</h2>
            <button onClick={fetchListings}>Query Listings!</button>
            <button onClick={deleteListing}>Delete a listing</button>
        </div>
    )
}