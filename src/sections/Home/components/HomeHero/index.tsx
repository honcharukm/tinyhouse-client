import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Input, Row, Typography } from "antd"

import torontoImage from "../../assets/toronto.jpg"
import dubaiImage from "../../assets/dubai.jpg"
import losAngelesImage from "../../assets/los-angeles.jpg"
import londonImage from "../../assets/london.jpg"

const { Title } = Typography
const { Search } = Input

interface Props {
    onSearch: (value: string) => void
}

export const HomeHero: React.FC<Props> = ({ onSearch }) => {
    return (
        <div className="home-hero">
            <div className="home-hero__search">
                <Title>Find a place you'll love to stay at</Title>
                <Search 
                    placeholder="Search 'San Fransisco'"
                    size="large"
                    enterButton
                    className="home-hero__search-input"
                    onSearch={onSearch}
                />
            </div>
            <Row gutter={12} className="home-hero__cards">
                <Col md={6} xs={12}>
                    <Link to="/listings/toronto">
                        <Card cover={<img alt="Toronto" src={torontoImage} />}>Toronto</Card>
                    </Link>
                </Col>
                <Col md={6} xs={12}>
                    <Link to="/listings/dubai">
                        <Card cover={<img alt="Dubai" src={dubaiImage} />}>Dubai</Card>
                    </Link>
                </Col>
                <Col md={6} xs={0}>
                    <Link to="/listings/los%20angeles">
                        <Card cover={<img alt="Los Angeles" src={losAngelesImage} />}>Los Angeles</Card>
                    </Link>
                </Col>
                <Col md={6} xs={0}>
                    <Link to="/listings/london">
                        <Card cover={<img alt="London" src={londonImage} />}>London</Card>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}