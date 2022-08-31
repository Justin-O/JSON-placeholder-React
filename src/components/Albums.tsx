import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Albums = () => {

    const [albums, setAlbums] = useState<{ userId: number, id: number, title: string }[]>([]);
    const [users, setUsers] = useState<{ id: number, name: string }[]>([]);

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage, setAlbumsPerPage] = useState(10);
    const [totalAlbums, setTotalAlbums] = useState(0);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=${albumsPerPage}`);
            setAlbums(res.data);
            setTotalAlbums(parseInt(res.headers["x-total-count"]))
            setLoading(false);
        }
        fetchAlbums();
    }, [currentPage, albumsPerPage]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, []);

    return (
        <>
            <h1 className='text-2xl font-bold'>Albums</h1>
            {loading ? <h2 className='my-8'>Loading...</h2> :
                <>
                    <div className='flex flex-wrap gap-8 my-8'>
                        {albums.map(album =>
                            <Link key={album.id} to={`album/${album.id}`}>
                                <div
                                    className='flex flex-col justify-between w-36 h-36 sm:w-56 sm:h-56 bg-gray-200 rounded-md p-5 hover:bg-gray-300 hover:cursor-pointer transition-all'
                                >
                                    <h2 className='font-bold text-sm sm:text-lg mb-2'>{album.id} - {album.title}</h2>
                                    <p className='text-xs'>Created by: {users.filter(u => u.id === album.userId).map(u => u.name)}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                    <Navigation
                        total={totalAlbums}
                        amountPerPage={albumsPerPage}
                        page={currentPage}
                        PageSetter={setCurrentPage}
                        LimitSetter={setAlbumsPerPage}
                        paginate={true}
                    />
                </>
            }
        </>
    )
}
