import React from 'react'
import { server } from '../../lib/api'

export const Listings = () => {
    const fetchListings = () => {
        console.log('Here!')
    }
    return (
        <div>
            <h2>Tinyhouse Listings</h2>
            <button onClick={fetchListings}>Query Listings!</button>
        </div>
    )
}