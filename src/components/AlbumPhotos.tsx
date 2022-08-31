import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigation } from './Navigation';
import { Modal } from "./Modal";
import { Link, Outlet } from "react-router-dom";

export const AlbumPhotos = () => {

  const {albumId} = useParams();
  const [albumPhotos, setAlbumPhotos] = useState<{ id: number, title: string, url: string, thumbnailUrl: string }[]>([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(8);
  const [totalPhotos, setTotalPhotos] = useState(0);

  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_page=${currentPage}&_limit=${photosPerPage}`);
      setAlbumPhotos(res.data);
      setTotalPhotos(parseInt(res.headers["x-total-count"]))
      setLoading(false);
    }
    fetchAlbums();
  }, [albumId, currentPage, photosPerPage]);

  return (
    <>
      <h1 className="text-2xl font-bold">Album: {albumId}</h1>
      {loading ? <h2 className='my-8'>Loading...</h2> :
        <>
          <div className='flex flex-wrap gap-8 my-8'>
            {albumPhotos.map(album =>
              <Link
                key={album.id}
                to={`${album.title}`}
              >
                <div

                  onClick={() => setModalState(true)}
                  className='flex flex-col w-36 h-56 sm:w-56 sm:h-64 bg-gray-200 rounded-md p-5 hover:bg-gray-300 hover:cursor-pointer transition-all'
                >
                  <div className="flex justify-center mb-4"><img src={album.thumbnailUrl} alt="album thumbnail" width={150} height={150} /></div>
                  <h2 className="font-bold text-xs mb-2">{album.id} - {album.title}</h2>
                </div>
              </Link>
            )}
          </div>
          <Navigation
            total={totalPhotos}
            amountPerPage={photosPerPage}
            page={currentPage}
            PageSetter={setCurrentPage}
            paginate={false}
          />
        </>
      }
      <Modal open={modalState} setModalState={setModalState} currentAlbum={albumId}>
        <Outlet context={albumPhotos} />
      </Modal>
    </>
  )
}
