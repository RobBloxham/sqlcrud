'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function AddPost(){
    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
        await fetch('/api/add-post', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content}) })
            
        router.refresh()
    } catch (error){
        console.error(error)
    }

    setTitle('');
    setContent('');
  };

    return (
        <main className="flex min-h-screen flex-col items-center justify-normal p-24">
            <Link href={'/'}>View Feed</Link>
        <h1 className="mt-10">Add Post</h1>
        <form className="mt-8 items-center justify-center"onSubmit={handleSubmit}>
        <div className="py-6 ">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="py-6">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <button className="py-6"type="submit">Submit</button>
      </form>
    </main>
    )
}