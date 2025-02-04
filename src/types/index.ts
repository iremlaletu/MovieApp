export type Movie = {
    genres: SideNavItem[];
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    media_type?: string;
    origin_country:string[]
    runtime: number
  }

  export type SideNavItem = {
    id: number,
    name: string
  }

// Reviews
export type CommentResults = Comment[];

export type Comment = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
}

export type AuthorDetails = {
  name?: string;
  avatar_path?: string;
  rating?: number;
}

export type CrewMember = {
  id: number;
  known_for_department: string;
  name: string;
  job: string;
  profile_path:string
  department:string
}

export type CastMember = {
  adult: boolean;
  cast_id: number;
  character: string;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}