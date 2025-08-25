"use client";

import { useParams } from "next/navigation";

const PostDetail = () => {
  const params = useParams();
  return <div>PostDetail {params.id}</div>;
};

export default PostDetail;
