/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faEdit,
  faEye,
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import api from '../../../../utils/api'
import './index.css'
// import { Row, Col, Container, Card, Table, Alert } from 'react-bootstrap'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import DeleteConfirmation from '../../../../components/DeleteConfirmation'
import { AuthContext } from '../../../../context/auth'

export const ViewUsers = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [totalDocuments, setTotalDocuments] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [previousPage, setPreviousPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(0)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [newUser, setUser] = useState<any>(null)
  const [preview, setPreview] = useState<any>(null)
  const [type, setType] = useState('')
  const [id, setId] = useState('')
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false)
  const [deleteMessage, setDeleteMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [profilePicture, setProfilePicture] = useState<string>('')
  const { registerAdmin }: any = useContext(AuthContext as any)

  const uploadImage = (img: any) => {
    const body = new FormData()
    body.set('key', `${import.meta.env.VITE_IMGBB_API_KEY}`)
    body.append('image', img)

    console.log(`${import.meta.env.VITE_IMGBB_API_KEY}`)

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
  }

  const showUser = (user: any) => {
    // send the user data to the edit endpoint
    // set the user data to the form
    // open the dialog
    console.log(user)
    setSelectedUser(user)
    // setSelectedUser(user)
    setShowModal(true)
  }

  const editUser = (user: any) => {
    // send the user data to the edit endpoint
    // set the user data to the form
    // open the dialog
    setSelectedUser(user)

    setShowEditModal(true)
  }

  const showDeleteModal = (type: string, user: any) => {
    setType(type)
    setId(user.id)
    setUserMessage('')

    if (type === 'user') {
      setDeleteMessage(
        `Are you sure you want to delete the user '${user?.name}'?`
      )
    }

    setDisplayConfirmationModal(true)
  }

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const deleteUser = async (type: string, user: any) => {
    // send the user data to the delete endpoint
    // set the user data to the form
    // open the dialog
    setSelectedUser(user)

    if (type === 'user') {
      setUserMessage(`The user '${user.name}' was deleted successfully.`)
    }

    await api
      .delete(`users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      )

    setDisplayConfirmationModal(false)
  }

  function handleChange(e: any) {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = (e: any) => {
    e.preventDefault()
    registerAdmin(selectedUser)
  }

  function onFileChange(e: any) {
    setPreview(e.target.files[0])
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    uploadImage(selectedUser.profile_picture).then((resp) => {
      console.log(resp.data.data.display_url)
      setProfilePicture(resp.data.data.display_url)
    })

    console.log('profile 0: ', profilePicture)

    // const formData = new FormData()

    // const userFormData: any = await Object.keys(selectedUser).forEach((key) =>
    //   formData.append(key, selectedUser[key])
    // )

    // formData.append('selectedUser', userFormData)

    setUser({
      name: selectedUser.name,
      email: selectedUser.email,
      profile_picture: profilePicture
    })

    console.log(newUser)

    await api
      .put(`users/${selectedUser.id}/edit`, newUser, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  // Search component
  const [query, setQuery] = useState('')
  const keys = ['name', 'email', 'role', 'status']
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

  const searchItemsByName = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['name']
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

  const searchItemsByEmail = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['email']
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

  const searchItemsByRole = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['role']
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

  const searchItemsByStatus = (searchValue: any) => {
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
      setPreviousPage(page - 2)
      setPage(page - 1)

      console.log('previous page', previousPage)
    }
  }

  // End of search component

  useEffect(() => {
    api
      .get(`/users?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then((res) => res.data)
      .then(
        (data) => {
          console.log(data)
          setData(data.data)
          setLoading(false)
          setTotalPages(data.totalPages)
          setTotalDocuments(data.totalDocuments)
        },
        (err) => {
          setError(err.response.data.message)
          setLoading(false)
        }
      )
  }, [limit, page])

  const closeModal = () => {
    setShowModal(false)
    console.log('close modal')
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    console.log('close edit modal')
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    console.log('close add modal')
  }

  const pageReload = () => {
    // setTimeout(() => {
    //   setShowEditModal(false)
    //   window.location.reload()
    // }, 1500)
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
                {userMessage && <Alert variant="success">{userMessage}</Alert>}

                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddModal(true)}
                >
                  Novo usuário
                </button>

                {/* Search Button */}

                <div className="search-wrapper">
                  <label htmlFor="search-form">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Buscar por nome, email, função ou status"
                      onChange={(e) => searchItems(e.target.value)}
                    />
                    <span className="sr-only">Search data here</span>
                  </label>
                </div>
              </div>

              {/* End of search button */}

              <div className="card-body">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Usuário
                          <div className="search-wrapper">
                            <label htmlFor="search-form">
                              <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Buscar por usuário"
                                onChange={(e) =>
                                  searchItemsByName(e.target.value)
                                }
                              />
                              <span className="sr-only">Search names here</span>
                            </label>
                          </div>
                        </th>
                        <th>
                          E-mail
                          <div className="search-wrapper">
                            <label htmlFor="search-form">
                              <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Buscar por e-mail"
                                onChange={(e) =>
                                  searchItemsByEmail(e.target.value)
                                }
                              />
                              <span className="sr-only">Search email here</span>
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
                                placeholder="Buscar por status..."
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
                        <th>
                          Função
                          <div className="search-wrapper">
                            <label htmlFor="search-form">
                              <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Buscar por função..."
                                onChange={(e) =>
                                  searchItemsByRole(e.target.value)
                                }
                              />
                              <span className="sr-only">Search roles here</span>
                            </label>
                          </div>
                        </th>
                        <th>
                          Ações
                          <div className="search-wrapper">
                            <label htmlFor="search-form">
                              <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="field_hidden"
                                placeholder=""
                                disabled
                              />
                              <span className="sr-only">null</span>
                            </label>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {query.length > 1
                        ? filteredResults.map((item: any) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                  <span
                                    className={`user-badge status-${item.status}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`user-badge role-${item.role}`}
                                  >
                                    {item.role}
                                  </span>
                                </td>
                                <td>
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="p-button-info mr-2"
                                    onClick={() => showUser(item)}
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
                        : data.map((user: any) => (
                            <tr key={user.id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>
                                <span
                                  className={`user-badge status-${user.status}`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`user-badge role-${user.role}`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td>
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="p-button-info mr-2"
                                  onClick={() => showUser(user)}
                                />
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="p-button-success mr-2"
                                  onClick={() => editUser(user)}
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="p-button-danger"
                                  onClick={() => showDeleteModal('user', user)}
                                />
                              </td>
                              <DeleteConfirmation
                                showModal={displayConfirmationModal}
                                confirmModal={() => deleteUser('user', user)}
                                hideModal={hideConfirmationModal}
                                type={type}
                                id={id}
                                message={deleteMessage}
                              />
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination">
                  <div className="page_left">
                    {previousPage > 0 ? (
                      <button className="btn btn-primary" onClick={onPrevious}>
                        Anterior
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Anterior
                      </button>
                    )}
                    {page < totalPages ? (
                      <button className="btn btn-primary" onClick={onNext}>
                        Próxima
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Próxima
                      </button>
                    )}
                  </div>

                  <div className="page_right">
                    <div className="page-info">
                      <span>
                        {page}-{totalPages} de {totalDocuments}
                      </span>
                    </div>

                    <div className="select">
                      <select
                        name="users"
                        id="users"
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
              <h2>Visualizar Usuário</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal__close"
                onClick={closeModal}
              />
            </div>

            <div className="modal__body">
              <div className="modal__body__left">
                <img src={selectedUser?.profile_picture} alt="avatar" />
                {/* <img
                  src="https://xsgames.co/randomusers/assets/images/favicon.png"
                  alt="avatar"
                /> */}

                <div className="modal__body__left__info">
                  <h3>Nome: {selectedUser?.name}</h3>
                  <p>E-mail: {selectedUser?.email}</p>

                  <div className="modal__body__left__info__status">
                    <span
                      className={`user-badge status-${selectedUser?.status}`}
                      style={{ marginRight: '1rem' }}
                    >
                      Status: {selectedUser?.status}
                    </span>

                    <span className={`user-badge role-${selectedUser?.role}`}>
                      Função: {selectedUser?.role}
                    </span>

                    <span>
                      Último Login:{' '}
                      {selectedUser?.lastLoginDate === null
                        ? 'N/A'
                        : selectedUser?.lastLoginDate}
                    </span>
                    <span>Última Atualização: {selectedUser?.updated_at}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal ${showEditModal ? 'isVisible' : 'isClosed'}`}>
          <div className="modal__content">
            <div className="modal__header">
              <h2>Editar Dados do Usuário</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal__close"
                onClick={closeEditModal}
              />
            </div>

            <div className="modal__body">
              <div className="modal__body__left">
                {/* <img src={selectedUser?.avatar} alt="avatar" /> */}
                {(selectedUser?.profile_picture || preview) && (
                  <img
                    src={preview && URL.createObjectURL(preview)}
                    alt={selectedUser?.name}
                  />
                )}

                {/* <img src="https://i.imgur.com/6VBx3io.png" alt="avatar" /> */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={onFileChange}
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    value={selectedUser?.name || ''}
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    value={selectedUser?.email || ''}
                    onChange={handleChange}
                  />

                  <button type="submit" onClick={pageReload}>
                    Atualizar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal ${showAddModal ? 'isVisible' : 'isClosed'}`}>
          <div className="modal__content">
            <div className="modal__header">
              <h2>Registrar Novo Usuário</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal__close"
                onClick={closeAddModal}
              />
            </div>

            <div className="modal__body">
              <div className="modal__body__left">
                <img src="https://i.imgur.com/6VBx3io.png" alt="avatar" />

                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    onChange={handleChange}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    onChange={handleChange}
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Digite uma senha"
                    onChange={handleChange}
                  />

                  <button type="submit">Cadastrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
