import React from 'react'
import { List, Typography } from 'antd'
import { ListingCard } from '../../../../lib/components'
import { ListingList } from '../../../../lib/graphql/queries/Listings/__generated__/ListingList'

interface Props {
    title: string,
    listings: ListingList['listings']['result']
}

const { Title } = Typography

export const HomeListings: React.FC<Props> = ({ title, listings }) => {
    return (
        <div className="home-listings">
            <Title level={4} className="home-listings__title">
                { title }
            </Title>
            <List 
                grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    lg: 4
                }}
                dataSource={listings}
                renderItem={listing => (
                    <List.Item>
                        <ListingCard listing={listing} />
                    </List.Item>
                )}
            />
        </div>
    )
}