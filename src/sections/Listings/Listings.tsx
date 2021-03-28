import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { Listings as ListingsData } from './__generated__/Listings'
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing'
import { List, Avatar, Button, Spin } from 'antd'
import { ListingsSkeleton } from './components'
import './styles/Listings.css'

const LISTINGS = gql`
    query Listings {
        listings {
            id
            title
            image
            address
        }
    }
`

const DELETE_LISTING = gql`
    mutation DeleteListing($id: Int!) {
        deleteListing(id: $id)
    }
`

interface Props {
    title: string
}

export const Listings: React.FunctionComponent<Props> = ({ title }) => {
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

    const listingsList = listings 
        ? (
            <List
                itemLayout="horizontal"
                dataSource={listings}
                renderItem={(listing) => (
                    <List.Item 
                        actions={[
                            <Button 
                                type="primary"
                                onClick={() => handleDeleteListing(parseInt(listing.id))}
                            >Delete</Button>
                        ]}>
                        <List.Item.Meta 
                            title={listing.title} 
                            description={listing.address}
                            avatar={
                                <Avatar
                                    src={listing.image}
                                    shape="square"
                                    size={48}
                                />
                            }
                        />
                    </List.Item>
                )}
            />
        ) : null

    if (loading) {
        return (
            <div className='listings'>
                <ListingsSkeleton title={title} />
            </div>
        )
    }

    if (error) {
        return (
            <div className='listings'>
                <ListingsSkeleton 
                    title={title}
                    error 
                />
            </div>
        )
    }

    const deleteListingErrorMessage = deleteListingError
        ? (
            <h4>
                Uh oh! Something went wrong with deleting - please try again later :(
            </h4>
        ) : null

    return (
        <div className="listings">
            <Spin
                spinning={deleteListingLoading}
            >
                <h2>{title}</h2>
                {listingsList}
                {deleteListingErrorMessage}
            </Spin>
        </div>
    )
}