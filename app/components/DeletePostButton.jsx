'use client'

import { useRouter } from "next/navigation" 

export default function DeletePostButton({ postId }) {
    const router = useRouter()

    async function handleDelete() {
        try {await fetch(`/api/post/${postId}`, {
            method: "DELETE"
            })

            router.refresh()
            }  catch (error) {
                console.error(error)
            }
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}