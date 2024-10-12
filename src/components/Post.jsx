import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostAPI";
import { Form } from "./Form";

export const Post = () => {
  const [data, setData] = useState([]);

  // Get Post Method
  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);

  //Delete Post Method
  const handleDeletePost = async (id) => {
   const res = await deletePost(id);

     try {
           if(res.status === 200){
            const updatedPosts = data.filter((currentPost)=>{
               return currentPost.id !== id
            })
            setData(updatedPosts)
           }else{
            console.log("Failed to dlete Post", res.status)
           }
           
      } catch (error) {
         console.log(error)
      
    }
  };

  return (
    <>
    <section>
      <Form data={data} setData={setData}/>
    </section>

    <section className="post-section">
      <ol>
        {data.map((currentElement) => {
          const { id, title, body } = currentElement;
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button>Edit</button>
              <button onClick={() => handleDeletePost(id)}>Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
    </>
  );
};

