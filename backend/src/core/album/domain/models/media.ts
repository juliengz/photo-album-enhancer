import { MediaId } from './media_id';
import { MediaPath } from './medis_path';

export interface MediaProps {
    id: MediaId;
    path: MediaPath;
}

export class Media {
    private constructor(
        readonly id: MediaId,
        readonly path: MediaPath,
    ) {
        this.id = id;
        this.path = path;
    }

    static create(props: MediaProps): Media {
        return new Media(props.id, props.path);
    }
}
