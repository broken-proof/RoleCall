import { useState } from "react";
import type { Video } from "../types/Video";
import { useVideoDownloadUrl } from "../hooks/useVideo";

interface VideoListProps {
    videos: Video[] | null;
    loading: boolean;
    error: string | null;
}

function VideoList({ videos, loading, error }: VideoListProps) {
    const { getDownloadUrl } = useVideoDownloadUrl();
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [urls, setUrls] = useState<Record<string, string>>({});

    if (loading && videos === null) return <p>Loading videos...</p>;
    if (error) return <p role="alert">{error}</p>;

    const handlePlay = async (id: string) => {
        if (!urls[id]) {
            const url = await getDownloadUrl(id);
            setUrls((prev) => ({ ...prev, [id]: url }));
        }
        setPlayingId(id);
    };

    return (
        <ul>
            {videos?.map((video) => (
                <li key={video.id}>
                    {video.title} ({video.status})
                    {video.status === "UPLOADED" && (
                        <button onClick={() => handlePlay(video.id)}>Play</button>
                    )}
                    {playingId === video.id && urls[video.id] && (
                        <video src={urls[video.id]} controls width={320} />
                    )}
                </li>
            ))}
        </ul>
    );
}

export default VideoList;
