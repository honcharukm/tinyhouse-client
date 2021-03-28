import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing'

const LISTINGS = gql`
    query Listings {
        listings {
            id
            title
            image
        }
    }
`

const DELETE_LISTING = gql`
    mutation DeleteListing($id: Int!) {
        deleteListing(id: $id)
    }
`

export const Listings = () => {
    const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS)

    const [deleteListing, { 
        loading: deleteListingLoading, 
        error: deleteListingError 
    }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

    const handleDeleteListing = async(id: number) => {
        await deleteListing({ variables: { id } })
        refetch()
    }

    const listings = data ? data.listings : null

    const listingsList = listings ? (
        <ul>
            {listings.map(listing => {
                return (
                    <li key={listing.id}>
                        {listing.title}
                        <button onClick={() => handleDeleteListing(parseInt(listing.id))}>delete</button>
                    </li>)
            })}
        </ul>
    ) : null 

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return (
            <h2>
                Uh oh! Something went wrong - please try again later :(
            </h2>
        )
    }

    const deleteListingLoadingMessage = deleteListingLoading 
        ? (
            <h4>Deletion in progress</h4>
        ) : null

    const deleteListingErrorMessage = deleteListingError
        ? (
            <h4>
                Uh oh! Something went wrong with deleting - please try again later :(
            </h4>
        ) : null

    return (
        <div>
            <h2>Tinyhouse Listings</h2>
            {listingsList}
            {deleteListingLoadingMessage}
            {deleteListingErrorMessage}
        </div>
    )
}