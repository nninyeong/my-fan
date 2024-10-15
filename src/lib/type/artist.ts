export interface Song {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
}

export interface MajorSongs {
  song: Song[];
}

export interface MajorMembers {
  artist: Artist[];
}

export interface Item {
  id: string;
  title: string;
  demographic: string;
  period: string;
  link: string;
  image: string;
  majorSongs: MajorSongs;
  majorSongList: string;
  majorMembers: MajorMembers;
  relatedArtistList: string;
}

export interface ArtistData {
  title: string;
  link: string;
  description: string;
  lastBuildDate: string;
  total: string;
  start: string;
  display: string;
  item: Item;
}
