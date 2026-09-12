import { useState } from "react";
import type { FormEvent } from "react";
import { useVideoUpload } from "../hooks/useVideo";

interface VideoUploadFormProps {
    onUploaded?: () => void;
}

function VideoUploadForm({ onUploaded }: VideoUploadFormProps) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const { uploadVideo, uploading, error } = useVideoUpload();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            await uploadVideo(file, title);
            setTitle("");
            setFile(null);
            onUploaded?.();
        } catch {
            //
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                />
                <button type="submit" disabled={uploading || !file}>
                    {uploading ? "Uploading..." : "Upload video"}
                </button>
            </form>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}

export default VideoUploadForm;
