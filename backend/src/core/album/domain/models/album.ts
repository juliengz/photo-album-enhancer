import { AlbumId } from './album_id';
import { Media } from './media';
import { OwnerId } from './owner_id';

export interface AlbumProps {
    id: AlbumId;
    ownerId: OwnerId
    medias: Media[];
}

export class Album {
    private constructor(
        readonly id: AlbumId,
        readonly ownerId: OwnerId,
        readonly medias: Media[],
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.medias = medias;
    }

    static create(props: AlbumProps): Album {
        return new Album(props.id, props.ownerId, props.medias);
    }
}
