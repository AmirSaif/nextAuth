import TopicCreateForm from "@/components/topics/topics-create-form";
import TopicList from "@/components/topics/topics-list";
import { Divider } from "@nextui-org/react";
export default function Home(){
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top posts</h1>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm/>
        <Divider className="my-2"/>
        <h3 className="text-lg">Topic</h3>
        <TopicList/>
      </div>
    </div>
  )
}