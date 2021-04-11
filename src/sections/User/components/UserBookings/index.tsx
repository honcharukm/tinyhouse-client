import React from 'react'
import { List, Typography } from 'antd'
import { ListingCard } from '../../../../lib/components'
import { User } from '../../../../lib/graphql/queries/User/__generated__/User'

interface Props {
    userBookings: User['user']['bookings']
    bookingsPage: number
    limit: number
    setBookingsPage: (page: number) => void
}

const { Paragraph, Title, Text } = Typography

export const UserBookings: React.FC<Props> = ({
    userBookings, 
    bookingsPage,
    limit,
    setBookingsPage
}) => {
    const total = userBookings ? userBookings.total : null
    const result = userBookings ? userBookings.result : null

    const userBookingsList = userBookings ? (
        <List
            grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                lg: 4
            }}
            dataSource={result ? result : undefined}
            locale={{
                emptyText: 'User doesn\'t have any bookings!'
            }}
            pagination={{
                position: "top",
                current: bookingsPage,
                total: total ? total : undefined,
                defaultPageSize: limit,
                hideOnSinglePage: true,
                showLessItems: true,
                onChange: (page: number) => setBookingsPage(page)
            }}
            renderItem={userBooking => {
                const bookingHistory = (
                    <div className="user-bookings__booking-history">
                        <div>
                            Check in: <Text strong>{ userBooking.checkIn }</Text>
                        </div>
                        <div>
                            Check out: <Text strong>{ userBooking.checkOut }</Text>
                        </div>
                    </div>
                )
                return (
                    <List.Item>
                        { bookingHistory }
                        <ListingCard listing={userBooking.listing} />
                    </List.Item>
                )
            }}
        />
    ) : null

    const userBookingsElement = userBookingsList ? (
        <div className="user-bookings">
            <Title level={4} className="user-bookings__title">
                Bookings
            </Title>
            <Paragraph className="user-bookings__description">
                This section highlights the bookings you've made, 
                and the check-in/check-out dates associate.
            </Paragraph>
            { userBookingsList }
        </div>
    ) : null

    return userBookingsElement
}