import React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Layout, Typography, Col, Row } from 'antd'
import { HomeHero, HomeListings, HomeListingsSkeleton } from './components'
import mapBackground from './assets/map-background.jpg'
import { displayErrorMessage } from '../../lib/utils'
import sanFransiscoImage from './assets/san-fransisco.jpg'
import cancunImage from './assets/cancun.jpg'
import { useQuery } from '@apollo/client'
import { LISTING_LIST } from '../../lib/graphql/queries'
import { 
    ListingList as ListingsData, 
    ListingListVariables as ListingsVariables
} from '../../lib/graphql/queries/Listings/__generated__/ListingList'
import { ListingsFilter } from '../../lib/graphql/globalTypes'

const { Content } = Layout
const { Paragraph, Title } = Typography

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const { loading, data } = useQuery<ListingsData, ListingsVariables>(LISTING_LIST, {
        variables: {
            filter: ListingsFilter.PRICE_HIGH_TO_LOW,
            limit: 4,
            page: 1
        }
    })

    const onSearch = (value: string) => {
        const trimmedValue = value.trim()

        if (trimmedValue) {
            history.push(`/listings/${trimmedValue}`)
        } else {
            displayErrorMessage('Please enter a valid search!')
        }
    }

    const renderListingSection = () => {
        if (loading) {
            return <HomeListingsSkeleton />
        }

        if (data) {
            return (
                <HomeListings title="Premium listings" listings={data.listings.result} />
            )
        }

        return null
    }

    return (
        <Content className="home" style={{ backgroundImage: `url(${mapBackground})` }}>
            <HomeHero onSearch={onSearch} />

            <div className="home__cta-section">
                <Title level={2} className="home__cta-section-title">
                    Your guide for all things rental
                </Title>   
                <Paragraph>
                    Helping you make the best decision in renting your last minute location.
                </Paragraph>
                <Link 
                    to="/listings/united%20states" 
                    className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
                >
                    Popular listings in the United States
                </Link>
            </div>

            { renderListingSection() }

            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20fransisco">
                            <div className="home__listings-img-cover">
                                <img src={sanFransiscoImage} alt="San Fransisco" className="home__listings-img" />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancum">
                            <div className="home__listings-img-cover">
                                <img src={cancunImage} alt="Cancun" className="home__listings-img" />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}