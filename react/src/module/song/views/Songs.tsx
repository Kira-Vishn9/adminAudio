import React, { useEffect } from 'react'
import { getSongs, type ISong } from '@/module/song'
import { SongTable } from '@/module/song/components/Table.tsx'
import PaginationControlled from '@/module/song/components/Pagination/Pagination.tsx'
import { type SongDtoRequest } from '@/module/song/song.dto.ts'
import { getSongInfo } from '@/module/song/song.service.ts'
import Song from '@/module/song/views/Song.tsx'
import { type ISongFilled } from '@/module/song/song.model.ts'

export const Songs = (): React.JSX.Element => {
  const [songs, setSongsResp] = React.useState<ISong[]>([])
  const [songsInput, setSongsRespInput] = React.useState<ISong[]>([])
  const [page, setPage] = React.useState(1)
  const [selectedSong, setSelectedSong] = React.useState<ISongFilled | null>(null)
  const [inputValue, setInputValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value)
    console.log(event)
  }
  const openSong = (id: string): void => {
    getSongInfo(id)
      .then((response) => {
        setSelectedSong(response.song)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    const params: SongDtoRequest = {
      params: {
        page,
        count: 25,
        inputValue
      }
    }
    getSongs(params)
      .then((data) => { setSongsRespInput(data.songs) })
      .catch((err) => { console.log(err) })
    console.log(songsInput)
    getSongs(params)
      .then((res) => { setSongsResp(res.songs) })
      .catch((err) => { console.log(err) })
  }, [page, inputValue])

  return (
    <>
      {(selectedSong != null)
        ? <Song songInfo={selectedSong} />
        : (
          <>
            <SongTable songs={songs} openSong={openSong} setInputValue={setInputValue}/>
            <PaginationControlled page={page} onChange={handleChange}/>
          </>
          )
      }

    </>
  )
}
// логика загрузки песен
// логику переключения страниц. текущая страница, функция для изменения страницы
// xерез юз жффект загружать данные при монтировании. В депенд передать текущую страницу, чттобы запрос выполнялся при изменений стриницы
// ВАЖНО
// функция для получения данных - отдельно от таблицы
//
// таблица с песнями по 25 штук
// пагинация внизу
// каждый элеент таблицы выводит
// картинка песни 50 на 50 +-
// name, artist.name, release date, edit button
