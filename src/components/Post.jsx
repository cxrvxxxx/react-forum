import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setPost(response.data);
                }
                console.log(response.data);
            })
            .catch(error => {

            });
    }, []);

    return (
        <div className="container">
            {post?.title}
        </div>
    );
}

export default Post;