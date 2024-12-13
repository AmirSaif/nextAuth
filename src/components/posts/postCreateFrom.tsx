'use client';
import { useFormState } from 'react-dom';
import {Button,Input,Textarea,Popover,PopoverTrigger,PopoverContent} from '@nextui-org/react';
import FormButton from '../common/formButton';
import * as actions from '@/actions';
interface PostCreateFormProps{
  slug:string
}
export default function PostCreateForm({slug}:PostCreateFormProps){
  const [formState, action] = useFormState(actions.createPost.bind(null,slug),{
    errors:{}
  })
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 w-80 p-4'>
            <h3 className='text-lg'>Create a Post</h3>

            <Input isInvalid={!!formState.errors.title} name='title' label='Title' labelPlacement='outside' placeholder='Title'
            errorMessage={formState.errors.title?.join(', ')}/>

            <Textarea name='content' label='Content' labelPlacement='outside' placeholder='Content' isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(',')}/>

            {formState.errors._form ? <div className='rounded p-2 bg-red-200 border border-red-400'>{formState.errors._form.join(',')}</div> : null}
            <FormButton>Create Post!</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}