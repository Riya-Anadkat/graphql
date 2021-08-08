import React from 'react'
import { useQuery, gql } from '@apollo/client';

const Page = () => {
    const { data, loading, error } = useQuery(gql`
        query getComment($id: ID!){
            getComment(id: $id){
                comment
            }
    }`,{variables: {
        id: "2"
    }})
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export default Page
