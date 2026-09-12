export interface Video {
    id: string;
    title: string;
    storageKey: string;
    contentType: string;
    createdAt: string;
    status: "PENDING" | "UPLOADED" | "REVIEWED";
}

export interface CreateUploadUrlRequest {
    title: string;
    filename: string;
    contentType: string;
}

export interface CreateUploadUrlResponse {
    videoId: string;
    uploadUrl: string;
}

export interface DownloadUrlResponse {
    url: string;
}
