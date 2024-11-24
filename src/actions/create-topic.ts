'use server';
import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import {redirect} from 'next/navigation';
import paths from "@/paths";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name:z.string().min(3).regex(/^[a-z-]+$/,{message:'Must be a lowercase letters or dashes without spaces'}),
  description:z.string().min(10)
})

interface FormStateType{
  errors:{
    name?:string[];
    description?:string[];
    _form?:string[];
  }
}

export async function createTopic(formState:FormStateType, formData: FormData):Promise<FormStateType>{
  // const name = formData.get('name');
  // const description = formData.get('description');
  const session = await auth();

  const result = createTopicSchema.safeParse({
    name : formData.get('name'),
    description : formData.get('description')
  })

  if(!result.success){
    return {errors:result.error.flatten().fieldErrors}
  }

  if(!session || !session.user){
    return {
      errors:{
        _form:["You must be signed in to create a Topic!"]
      }
    }
  }

  let topic:Topic;
  try{
    topic = await db.topic.create({
      data:{
        slug:result.data.name,
        description:result.data.description
      }
    })

  }catch(err:unknown){
    if(err instanceof Error){
      return {
        errors:{
          _form:[err.message]
        }
      }
    }else{
      return {
        errors:{
          _form:['Something went really wrong!']
        }
      }
    }
  }
  revalidatePath('/');
  redirect(paths.topicShow(topic.slug));
}