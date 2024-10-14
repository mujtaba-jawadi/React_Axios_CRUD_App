import { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostAPI";

export const Form = ({ data, setData, updateApiData, setUpdateApiData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateApiData).length === 0;

  useEffect(() => {
    updateApiData &&
      setAddData({
        title: updateApiData.title || "",
        body: updateApiData.body || "",
      });
  }, [updateApiData]);

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
    // console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({
        title: "",
        body: "",
      });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateApiData.id, addData);
      // console.log(res);

      if (res.status === 200) {
        setData((previousData) => {
          return previousData.map((currentElement) => {
            return currentElement.id === res.data.id
              ? res.data
              : currentElement;
          });
        });
      }
      setAddData({
        title: "",
        body: "",
      });
      setUpdateApiData({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Update") {
      updatePostData();
    }
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
      <button type="submit" value={isEmpty ? "Add" : "Update"}>
        {isEmpty ? "Add" : "Update"}
      </button>
    </form>
  );
};
