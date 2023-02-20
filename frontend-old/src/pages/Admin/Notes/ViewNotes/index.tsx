/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faChevronDown,
  faEdit,
  faEye,
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLayoutEffect, useState } from 'react'
import api from '../../../../utils/api'
// import './ViewNotes.css'

export const ViewNotes = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [totalDocuments, setTotalDocuments] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [previousPage, setPreviousPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(0)
  const [assignee, setAssignee] = useState<any>(null)

  useLayoutEffect(() => {
    const getNotes = async () => {
      try {
        const response = await api.get(`/notes?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        })
        setData(response.data.data)
        setTotalDocuments(response.data.totalDocuments)
        setTotalPages(response.data.totalPages)
        setPreviousPage(response.data.previousPage)
        setNextPage(response.data.nextPage)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    getNotes()
  }, [page, limit])

  const showNote = (note: any) => {
    // send the note data to the edit endpoint
    // set the note data to the form
    // open the dialog
    setSelectedNote(note)
    // setSelectedNote(note)
    setShowModal(true)
  }

  const editnote = (note: any) => {
    // send the note data to the edit endpoint
    // set the note data to the form
    // open the dialog
  }

  const confirmDeletenote = (note: any) => {
    // send the note data to the delete endpoint
    // set the note data to the form
    // open the dialog
  }

  // Search component
  const [query, setQuery] = useState('')
  const keys = ['title', 'status']
  const [filteredResults, setFilteredResults] = useState([])
  const pageLimit = ['5', '10', '15', '25', '50', '75', '100']

  const searchItems = (searchValue: any) => {
    setQuery(searchValue)

    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some((key) =>
          item[key]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByTitle = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['title']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByUser = async (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = await api
        .get(`/notes/search/request?field=assignee.name&value=${query}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        })
        .then((res) => {
          return res.data.notes
        })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByStatus = async (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['status']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })

      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const changePageLimit = (pageParam: number) => {
    setLimit(pageParam)
  }

  const onNext = () => {
    if (page < totalPages) {
      setPreviousPage(page)
      setPage(page + 1)
    }
  }

  const onPrevious = () => {
    if (page > 1) {
      setNextPage(page)
      setPage(page - 1)
    }
  }

  // End of search component
  const closeModal = () => {
    setShowModal(false)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <main className="main__container">
        <div className="main__title">
          <img width="60" src="https://i.imgur.com/6VBx3io.png" alt="avatar" />
          <div className="main__greetings">
            <h1>
              Olá, {user ? user?.name.split(' ')[0].trim() : 'Visitante'}!
            </h1>
            <p>Bem vindo ao painel de gerenciamento de usuários!</p>
          </div>
        </div>

        {/* Novo datatable */}

        <div className="wrapper">
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h3>Anotações</h3>
                <button className="btn btn-primary">Nova anotação</button>

                {/* Search Button */}

                <div className="search-wrapper">
                  <label htmlFor="search-form">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Buscar por título ou status"
                      onChange={(e) => searchItems(e.target.value)}
                    />
                    <span className="sr-only">Search data here</span>
                  </label>
                </div>

                {/* End of search button */}

                <div className="card-body">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Título
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por título"
                                  onChange={(e) =>
                                    searchItemsByTitle(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search title here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>
                            Criado por
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por criador"
                                  onChange={(e) =>
                                    searchItemsByUser(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search user here
                                </span>
                              </label>
                            </div>
                          </th>

                          <th>
                            Status
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por status (completed, pending, overdue)"
                                  onChange={(e) =>
                                    searchItemsByStatus(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search status here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {query.length > 1
                          ? filteredResults.map((item: any) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.title}</td>
                                  <td>
                                    {item.assignee.name
                                      ? item.assignee.name
                                      : item.assignee}
                                  </td>
                                  <td>
                                    <span
                                      className={`note-badge status-${item.status}`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="p-button-info mr-2"
                                      onClick={() => showNote(item)}
                                    />
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="p-button-success mr-2"
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="p-button-danger"
                                    />
                                  </td>
                                </tr>
                              )
                            })
                          : data.map((note: any) => {
                              // assignee.map((user: any) => {
                              //   if (note.assignee === user.id) {
                              //     note.assignee = user.name
                              //   }
                              // })

                              return (
                                <tr key={note.id}>
                                  <td>{note.title}</td>
                                  <td>{note.assignee.name}</td>
                                  <td>
                                    <span
                                      className={`note-badge status-${note.status}`}
                                    >
                                      {note.status}
                                    </span>
                                  </td>
                                  <td>
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="p-button-info mr-2"
                                      onClick={() => showNote(note)}
                                    />
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="p-button-success mr-2"
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="p-button-danger"
                                    />
                                  </td>
                                </tr>
                              )
                            })}
                      </tbody>
                    </table>
                  </div>

                  <div className="pagination">
                    <button className="btn btn-primary" onClick={onPrevious}>
                      Anterior
                    </button>
                    <button className="btn btn-primary" onClick={onNext}>
                      Próximo
                    </button>

                    <div className="page-info">
                      <span>
                        {page}-{totalPages} de {totalDocuments}
                      </span>

                      <div className="select">
                        <select
                          name="notes"
                          id="notes"
                          onChange={(e) =>
                            changePageLimit(parseInt(e.target.value))
                          }
                        >
                          {pageLimit.map((limit) => {
                            return (
                              <option value={limit} key={limit}>
                                {limit}
                              </option>
                            )
                          })}
                        </select>

                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal ${showModal ? 'isVisible' : 'isClosed'}`}>
          <div className="modal__content">
            <div className="modal__header">
              <h2>Visualizar Anotação</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal__close"
                onClick={closeModal}
              />

              <div className="modal__body">
                <div className="modal__body__left">
                  <div className="modal__body__left__info">
                    <h3>{selectedNote?.title}</h3>
                    <p>{selectedNote?.subject}</p>
                    <div className="modal__body__left__info__status">
                      <span
                        className={`note-badge status-${selectedNote?.status}`}
                        style={{ marginRight: '1rem' }}
                      >
                        {selectedNote?.status}
                      </span>
                      <span className={`note-badge note-${selectedNote?.id}`}>
                        Data de Início: {selectedNote?.start_date}
                        <br />
                        Data de Término: {selectedNote?.due_date}
                      </span>
                    </div>

                    <div className="modal__body__left__info__content">
                      <span
                        className={`note-badge status-${selectedNote?.status}`}
                        style={{ marginRight: '1rem' }}
                      >
                        {selectedNote?.content}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
