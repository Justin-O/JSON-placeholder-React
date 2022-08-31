import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Albums } from './components/Albums';
import { AlbumPhotos } from './components/AlbumPhotos';
import { NoMatch } from './components/NoMatch';
import { Photo } from './components/Photo';

function App() {
  return (
    <div className="App flex justify-center font-family: font-roboto">
      <div className='container md:w-[1280px] mt-12 p-4'>
        <div className='flex justify-center w-full mb-4'>
          <Link to={'/'}>
            <h1 className='text-2xl md:text-4xl font-bold bg-slate-400 text-white px-4 py-2 md:px-8 md:py-4'>LOGO</h1>
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<Albums />} />
          <Route path='album/:albumId' element={<AlbumPhotos />}>
            <Route path=':albumTitle' element={<Photo />} />
          </Route>
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
