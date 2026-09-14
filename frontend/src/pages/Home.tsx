import { useEffect } from 'react';
import VideoUploadForm from '../components/VideoUploadForm.tsx';
import VideoList from '../components/VideoList.tsx';
import { useMyVideos } from '../hooks/useVideo.ts';
import { useAuth } from '../hooks/useAuth';

function Home() {
    const { logout } = useAuth();
    const { videos, loading: videosLoading, error: videosError, getMyVideos } = useMyVideos();

    useEffect(() => {
        getMyVideos();
    }, [getMyVideos]);

    return (
        <div>
            <nav aria-label="Session">
                <button onClick={logout}>Sign out</button>
            </nav>

            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>

            <h2>My videos</h2>
            <VideoUploadForm onUploaded={getMyVideos} />
            <VideoList videos={videos} loading={videosLoading} error={videosError} />
        </div>
    );
}

export default Home;
