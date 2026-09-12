import { useEffect } from 'react';
import CreateTestForm from '../components/CreateTestForm.tsx';
import TestList from '../components/TestList.tsx';
import VideoUploadForm from '../components/VideoUploadForm.tsx';
import VideoList from '../components/VideoList.tsx';
import { useTests } from '../hooks/useTest.ts';
import { useMyVideos } from '../hooks/useVideo.ts';

function Home() {
    const { tests, loading, error, getTests } = useTests();
    const { videos, loading: videosLoading, error: videosError, getMyVideos } = useMyVideos();

    useEffect(() => {
        getTests();
        getMyVideos();
    }, [getTests, getMyVideos]);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>
            <CreateTestForm onCreated={getTests} />
            <TestList tests={tests} loading={loading} error={error} />

            <h2>My videos</h2>
            <VideoUploadForm onUploaded={getMyVideos} />
            <VideoList videos={videos} loading={videosLoading} error={videosError} />
        </div>
    );
}

export default Home;
