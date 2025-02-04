"use server"

import { Movie } from "@/types"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.NEXT_API_KEY

  export async function getNowPlayingMovies() {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1 ` )

    if(!response.ok){
        throw new Error("Failed to Fetch")
    }

    return response.json()
  }

  export async function getPopularMovies() {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }
  
  export async function getTopRatedMovies() {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }
  
  export async function getUpcomingMovies() {
    const res = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }
  
  export async function fetchMovieByGenre(id: string, page = 1) {
    
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=en-US&page=${page}`
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }

  export async function fetchMovieById(id: string): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }

  export async function fetchMovieByIdReviews(id: string) {
    const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }

  export async function fetchMovieByIdVideos(id: string) {
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }

  export async function fetchMovieByIdCredit(id: string) {
    const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
  
    return res.json();
  }

  export async function fetchRecomendation(id:string){
    const res = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`)
    if(!res.ok){
      throw new Error("Failed to fetch")
    }
    return res.json()
  }

  export async function fetchSearchMovies(keyword:string) {
    const res = await fetch(`${BASE_URL}/search/movie?include_adult=false&api_key=${API_KEY}&query=${keyword}
    `)
    if(!res.ok){
      throw new Error("Failed to fetch")
    }
    return res.json()
  }