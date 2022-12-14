import { useState } from "react";
import { PostDetail } from "./PostDetail";

import { useQuery } from "@tanstack/react-query";

const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1); // for this api pages starts at 1
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: fetchPosts,
    staleTime: 20000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage < 1}
          onClick={() => {
            setCurrentPage((currentPage) => currentPage - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage - 1}
          onClick={() => {
            setCurrentPage((currentPage) => currentPage + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
