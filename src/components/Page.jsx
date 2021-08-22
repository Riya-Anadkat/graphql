import React, {useState} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import './styles.css'

const Page = () => {
    const [ commentValue , setCommentValue ] = useState("");

    const { data, loading, error } = useQuery(gql`
        query getComment($id: ID!){
            getComment(id: $id){
                comment
            }
    }`,{variables: {
        id: "2"
    }})
    const { data: commentsData, refetch} = useQuery(gql`
    query getComments{
        getComments {
            author
            comment
            id
        }
    }`,{variables: {

    }})
    const [mutateFunction] = useMutation(gql`
        mutation createComment($comment: String,  $author: String){
            createComment(commentInput: {comment: $comment, author: $author}){
                author
                comment
            }
    }`)

    const [deleteCommentFunction, {data: deleteCommentData}] = useMutation(gql`
        mutation deleteComment($id: ID!){
            deleteComment(id: $id)
        }
    `)

    const handleMutate = () => {
        mutateFunction({variables: {
            comment: commentValue,
            author: "Anonymous user"
        }})
        setCommentValue("")
        refetch();
    }

    const handleTextChange = ({ target: { value } }) => {
        setCommentValue(value)
    };

    const handleDeleteComment = (id) => {
        deleteCommentFunction({variables: {
            id: id
        }});
        refetch();
    }

   const DisplayComments = () => {
    return (
       <div>
            {commentsData?.getComments.map((commentData) => (
                <div>
                <h5><button onClick={() => handleDeleteComment(commentData.id)}>delete</button></h5>
                <h5> {commentData.author}: </h5>
                <h5> {commentData.comment}</h5>
                </div>
            ))}
       </div>
       )
    }
     
    return (
        <div>
            <h2>Comments</h2>
            <input type="text" value={commentValue} onChange={handleTextChange}></input>
            <button onClick={handleMutate}> Add comment</button>
            <DisplayComments />
        </div>
    )
}

export default Page
