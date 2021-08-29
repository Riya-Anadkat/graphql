import React, {useState} from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { TrashFill } from 'react-bootstrap-icons';
import './styles.css'

const TopicPage = ({currentUser}) => {
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
            author: currentUser ? currentUser : "Anonymous user"
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
                <h5 className="userName"> {commentData.author}: </h5>
                <h5 className="comment"> {commentData.comment}</h5>
                <TrashFill onClick={() => handleDeleteComment(commentData.id)}/>
                </div>
            ))}
       </div>
       )
    }
     
    return (
        <div>
            <h2 className="heading" >Comments</h2>
            <input type="text" value={commentValue} onChange={handleTextChange} className="commentInputField" ></input>
            <button onClick={handleMutate} className="addCommentButton"> Add comment</button>
            <DisplayComments />
        </div>
    )
}

export default TopicPage
