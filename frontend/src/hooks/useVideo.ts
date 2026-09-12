import { useCallback, useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../api/endpoints";
import { getErrorMessage } from "../api/errors";
import useFetch from "./useFetch";
import type { Video, CreateUploadUrlRequest, CreateUploadUrlResponse, DownloadUrlResponse } from "../types/Video.ts";

export function useMyVideos() {
    const { data, error, loading, fetchData } = useFetch<Video[]>();

    const getMyVideos = useCallback(() => {
        return fetchData(ENDPOINTS.videos.myVideos);
    }, [fetchData]);

    return { videos: data, loading, error, getMyVideos };
}

export function useVideoUpload() {
    const { fetchData: requestUploadUrl } = useFetch<CreateUploadUrlResponse>();
    const { fetchData: markComplete } = useFetch<Video>();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadVideo = useCallback(async (file: File, title: string) => {
        setUploading(true);
        setError(null);

        try {
            const { videoId, uploadUrl } = await requestUploadUrl(ENDPOINTS.videos.uploadUrl, {
                method: "POST",
                data: { title, filename: file.name, contentType: file.type } satisfies CreateUploadUrlRequest,
            });

            // Uploaded directly to S3 via the presigned url
            await axios.put(uploadUrl, file, {
                headers: { "Content-Type": file.type },
            });

            return await markComplete(ENDPOINTS.videos.completeUpload(videoId), { method: "POST" });
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setUploading(false);
        }
    }, [requestUploadUrl, markComplete]);

    return { uploadVideo, uploading, error };
}

export function useVideoDownloadUrl() {
    const { fetchData } = useFetch<DownloadUrlResponse>();

    const getDownloadUrl = useCallback(async (videoId: string) => {
        const result = await fetchData(ENDPOINTS.videos.downloadUrl(videoId));
        return result.url;
    }, [fetchData]);

    return { getDownloadUrl };
}
