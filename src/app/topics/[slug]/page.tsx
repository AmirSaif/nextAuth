import PostCreateForm from "@/components/posts/postCreateFrom";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicShowProps{
  params:{
    slug:string
  }
}
export default function TopicShow({params}:TopicShowProps){
  const {slug} = params;
  return <div className="grid grid-cols-4 gap-4">
    <div className="col-span-3">
      <h1 className="text-2xl font-bold mb-2">
        {slug}
      </h1>
      <PostList fetchData={()=>fetchPostsByTopicSlug(slug)}/>
    </div>
    <PostCreateForm slug={slug}/>
  </div>
}