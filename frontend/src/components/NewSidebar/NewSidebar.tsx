import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faArrowRightFromBracket,
  faGlobe,
  faHome,
  faLock,
  faStickyNote,
  faTimes,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

import './style.css'

const sidebarItems = [
  {
    title: 'Meu Painel',
    subitems: [
      {
        icon: faStickyNote,
        link: '#',
        label: 'Minhas Anotações'
      },
      {
        icon: faUser,
        link: '#',
        label: 'Meus Dados'
      },
      {
        icon: faLock,
        link: '#',
        label: 'Alterar Senha'
      },
    ]
  },
  {
    title: 'Admin',
    subitems: [
      {
        icon: faGlobe,
        link: '#',
        label: 'Área Administrativa'
      },
      {
        icon: faUsers,
        link: '#',
        label: 'Gerenciar Usuários'
      },
      {
        icon: faLock,
        link: '#',
        label: 'Gerenciar anotações'
      },
      {
        icon: faArrowRightFromBracket,
        link: '#',
        label: 'Logout'
      },
    ]
  }
]

interface SubitemsProps {
  icon: IconDefinition
  link: string
  label: string
}

const NewSidebar = () => {

  const renderSidebar = (): Array<JSX.Element> => {
    return sidebarItems.map((elem, index) => {
      return (
        <React.Fragment key={index}>
          <h2 className='text-uppercase'>{elem.title}</h2>
          {renderItems(elem.subitems)}
        </React.Fragment >
      )
    })
  }

  const renderItems = (items: Array<SubitemsProps>) => {
    return items.map((subItems, index) => {
      return (
        <a key={index} href={subItems.link}>
          <FontAwesomeIcon icon={subItems.icon} className="mr-2"/>
          {subItems.label}
        </a>
      )
    })
  }

  return (
    <div className='sidebar'>
      <h1>HB Notes</h1>
      {renderSidebar()}
    </div>
  )
}

export default NewSidebar
