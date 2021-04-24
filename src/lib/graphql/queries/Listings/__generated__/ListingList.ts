/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingsFilter } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: ListingList
// ====================================================

export interface ListingList_listings_result {
  __typename: "Listing";
  id: number;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface ListingList_listings {
  __typename: "Listings";
  result: ListingList_listings_result[];
}

export interface ListingList {
  listings: ListingList_listings;
}

export interface ListingListVariables {
  filter: ListingsFilter;
  limit: number;
  page: number;
}
