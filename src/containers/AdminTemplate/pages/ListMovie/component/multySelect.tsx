'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown } from "lucide-react"
import { GenreMovie } from '@/types/movie'
import moviesAPI from '@/apis/movie'


export default function MultySelect() {

    const [data, setData] = useState<GenreMovie[]>([])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [buttonLabel, setButtonLabel] = useState('Chọn thể loại phim')
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const fetchGenreMovies = async () => {
        try {
          setIsLoading(true)
          const resp = await moviesAPI.getAllGenreMovies()
          setData(resp)
        } catch (error) {
          console.error('Failed to fetch genre movies:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchGenreMovies()
    }, [])
  
    const handleGenreToggle = (genreId: string) => {
      setSelectedGenres(prev => 
        prev.includes(genreId) 
          ? prev.filter(id => id !== genreId)
          : [...prev, genreId]
      )
    }
  
    useEffect(() => {
      if (selectedGenres.length === 0) {
        setButtonLabel('Chọn thể loại phim')
      } else if (selectedGenres.length === 1) {
        setButtonLabel(data.find(genre =>  String(genre.id_genre) === selectedGenres[0])?.genre_name || '')
      } else {
        setButtonLabel(`${selectedGenres.length} thể loại`)
      }
    }, [selectedGenres, data])
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {isLoading ? 'Loading...' : buttonLabel}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <div className="grid gap-4 p-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Chọn thể loại phim</h4>
              <p className="text-sm text-muted-foreground">
                Chọn 1 hoặc nhiều thể loại
              </p>
            </div>
            {isLoading ? (
              <div className="text-center">Loading genres...</div>
            ) : (
              <div className="grid gap-2">
                {data.map((genre) => (
                  <div key={genre.id_genre} className="flex items-center space-x-2">
                    <Checkbox 
                      id={String(genre.id_genre)} 
                      checked={selectedGenres.includes(String(genre.id_genre))}
                      onCheckedChange={() => handleGenreToggle(String(genre.id_genre))}
                    />
                    <Label htmlFor={String(genre.id_genre)}>{genre.genre_name}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
}