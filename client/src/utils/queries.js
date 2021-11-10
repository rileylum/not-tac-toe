import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query get_books {
        books {
            title
            author
        }
    }
`