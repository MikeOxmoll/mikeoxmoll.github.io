import {VideoType} from "../../commons/types/VideoType";

import axios from "axios";
import {baseURL} from "../../routes/Routes";

const client = axios.create({
    baseURL: baseURL,
});

export async function fetchVideo(id: string) {
    let response = await client.get('?_limit=10');
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: 1 }), 500)
    );
}
export function fetchRawVideo(id: string) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: 1 }), 500)
    );
}
export function postVideo(video: VideoType) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: 1 }), 500)
    );
}
// export function postRawVideo(id: string) {
//     return new Promise<{ data: number }>((resolve) =>
//         setTimeout(() => resolve({ data: amount }), 500)
//     );
// }