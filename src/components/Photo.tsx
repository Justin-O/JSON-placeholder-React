import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

export const Photo = () => {
    const albumPhotos: { id: number, title: string, url: string, thumbnailUrl: string }[] = useOutletContext();

    const params = useParams();
    const currentTitle = params['albumTitle'];
    const photoFilter = albumPhotos.filter(p => p.title === currentTitle);

    const [comments, setComments] = useState<{ id: number, name: string, email: string, body: string }[]>([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${photoFilter[0].id}/comments?_limit=50`)
            .then(res => {
                setComments(res.data);
                console.log(res.data);                
            })
            .catch(err => {
                console.log(err);

            })
    }, []); //Inf loop probleem

    return (
        <>
            {photoFilter.map(photo =>
                <div className="mb-8" key={photo.id}>
                    <h2 className="font-bold text-sm sm:text-2xl mb-4">{photo.id} - {photo.title}</h2>
                    <div className="flex justify-center">
                        <img src={photo.url} alt="album large" width={400} height={400} />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-1 mb-6">
                <form className="flex flex-col gap-1">
                    <label className="font-medium">
                        E-mail:
                        <input className="border-2 border-gray-200 ml-2" type="text" name="name" />
                    </label>
                    <label className="font-medium">
                        Comment:
                        <input className="border-2 border-gray-200 ml-2" type="text" name="name" />
                    </label>
                    <input className="bg-gray-200 w-1/4" type="submit" value="Submit" />
                </form>
            </div>
            <div className="bg-gray-100 h-96 overflow-x-auto">
                {comments.map(c =>
                    <div key={c.id} className="flex flex-col p-4 gap-1 border-b-4 border-white">
                        <p className="text-sm"><span className="font-medium">E-mail:</span> {c.email}</p>
                        <p className="text-sm">{c.body}</p>
                    </div>
                )}
            </div>
        </>
    )
}
