/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postData } from "../api/PostAPI";

export const Form = ({ data, setData, updateApiData, setUpdateApiData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  

  useEffect(() => {
    updateApiData && setAddData({
      title: updateApiData.title || "",
      body: updateApiData.body || ""
    })
    
  }, [updateApiData])
  

  const handleFormInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({
         title: "",
         body: ""
      })
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="title-div">
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="off"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleFormInput}
        />
      </div>
      <div className="post-div">
        <label htmlFor="body"></label>
        <input
          type="text"
          name="body"
          id="body"
          autoComplete="off"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleFormInput}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
