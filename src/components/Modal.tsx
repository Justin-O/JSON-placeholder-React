import ReactDom from 'react-dom';
import { Link } from 'react-router-dom';

type ModalProps = {
    children: any;
    open: boolean;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    currentAlbum: string | undefined;
}

export const Modal = ({ children, open, setModalState, currentAlbum }: ModalProps) => {
    if (!open) return null

    return ReactDom.createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 bg-black z-50">
            <div className="flex justify-center items-center h-screen">
                <div className={"flex flex-col bg-white p-6 w-4/5 h-[90%] max-w-3xl overflow-x-auto"}>
                    <div className='flex justify-end'>
                        <Link onClick={() => setModalState(false)} to={`/album/${currentAlbum}`}>
                            <button className="w-8 h-8 bg-gray-200 m-1 rounded-full hover:bg-gray-300 font-medium hover:transition-all">
                                X
                            </button>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal')!
    )
}
