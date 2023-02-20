import React, { useContext, useEffect, useState } from 'react';
import { CgNotes } from 'react-icons/cg';
import { FaChartArea, FaStickyNote, FaUser, FaUsers } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Charts } from '../../components/Chart';
import { IToast, ToastMapKey } from '../../components/Toast/helpers';
import { IUser } from '../../interfaces';
import { AuthContext } from '../../store/contexts/AuthContext';
import { ToastContext } from '../../store/contexts/ToastContext';
import api from '../../utils/api';
import './index.css';

type Props = {
  user: IUser | null;
};

export const MainPanel: React.FC<Props> = ({ user }) => {
  const { logout, isAuthenticated, isLoading } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalInactiveUsers, setTotalInactiveUsers] = useState<number>(0);
  const [totalNotes, setTotalNotes] = useState<number>(0);
  const [totalCompletedNotes, setTotalCompletedNotes] = useState<number>(0);
  const [totalPendingNotes, setTotalPendingNotes] = useState<number>(0);
  const [totalOverdueNotes, setTotalOverdueNotes] = useState<number>(0);
  const [totalUndatedNotes, setTotalUndatedNotes] = useState<number>(0);

  const { toastList, setToastList } = useContext(ToastContext);

  const location = useLocation();
  const navigate = useNavigate();

  const createToast = (type: ToastMapKey, title: string, message: string) => {
    const newToast: IToast = {
      type: type,
      title: title,
      message: message,
    };
    setToastList([...toastList, newToast]);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    const endpoints = [
      '/users',
      '/users/active',
      '/users/inactive',
      '/notes',
      '/notes/completed',
      '/notes/pending',
      '/notes/overdue',
      '/notes/undated',
    ];

    for (const element of endpoints) {
      api
        .get(element, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
        .then(
          ({ data }) => {
            switch (element) {
            case '/users':
              setTotalUsers(data.data.length > 0 ? data.totalDocuments : 0);
              break;
            case '/users/active':
              setTotalActiveUsers(
                data.result.data.length > 0 ? data.result.totalDocuments : 0
              );
              break;
            case '/users/inactive':
              setTotalInactiveUsers(
                data.result.data.length > 0 ? data.result.totalDocuments : 0
              );
              break;
            case '/notes':
              setTotalNotes(data.data.length > 0 ? data.totalDocuments : 0);
              break;
            case '/notes/completed':
              setTotalCompletedNotes(
                data.result.data.length > 0 ? data.result.data.length : 0
              );
              break;
            case '/notes/pending':
              setTotalPendingNotes(
                data.result.data.length > 0 ? data.result.data.length : 0
              );
              break;
            case '/notes/overdue':
              setTotalOverdueNotes(
                data.result.data.length > 0 ? data.result.data.length : 0
              );
              break;
            case '/notes/undated':
              setTotalUndatedNotes(
                data.result.data.length > 0 ? data.result.data.length : 0
              );
              break;
            default:
              break;
            }
          },
          (err) => {
            console.log(err.response.data.message);
          }
        );
    }
  }, [isAuthenticated, navigate]);

  console.log(user);

  return (
    <>
      <main className="main__container">
        <div className="main__title">
          <img width="60" src="https://i.imgur.com/6VBx3io.png" alt="avatar" />
          <div className="main__greeting">
            <h1>Olá, {user && user.name.split(' ')[0]}!</h1>
            <p>Bem vindo ao seu painel!</p>
          </div>
        </div>

        <div className="main__cards">
          <div className="card">
            <FaUsers className="text-lightblue" />
            <div className="card_inner">
              <p className="text-primary-p">Usuários Cadastrados</p>
              <span className="text-title font-bold">{totalUsers}</span>
            </div>
          </div>

          <div className="card">
            <FaUsers className="text-lightblue" />
            <div className="card_inner">
              <p className="text-primary-p">Usuários Ativos</p>
              <span className="text-title font-bold">{totalActiveUsers}</span>
            </div>
          </div>

          <div className="card">
            <FaUser className="text-red" />
            <div className="card_inner">
              <p className="text-primary-p">Usuários Inativos</p>
              <span className="text-title font-bold">{totalInactiveUsers}</span>
            </div>
          </div>

          <div className="card">
            <CgNotes className="text-yellow" />
            <div className="card_inner">
              <p className="text-primary-p">Anotações Criadas</p>
              <span className="text-title font-bold">{totalNotes}</span>
            </div>
          </div>

          <div className="card">
            <CgNotes className="text-green" />
            <div className="card_inner">
              <p className="text-primary-p">Anotações (S/ Data)</p>
              <span className="text-title font-bold">{totalUndatedNotes}</span>
            </div>
          </div>

          <div className="card">
            <CgNotes className="text-purple" />
            <div className="card_inner">
              <p className="text-primary-p">Anotações (Pendentes)</p>
              <span className="text-title font-bold">{totalPendingNotes}</span>
            </div>
          </div>

          <div className="card">
            <CgNotes className="text-cyan" />
            <div className="card_inner">
              <p className="text-primary-p">Anotações (Concluídas)</p>
              <span className="text-title font-bold">
                {totalCompletedNotes}
              </span>
            </div>
          </div>

          <div className="card">
            <CgNotes className="text-scarlet" />
            <div className="card_inner">
              <p className="text-primary-p">Anotações (Atrasadas)</p>
              <span className="text-title font-bold">{totalOverdueNotes}</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>São Bernardo do Campo, São Paulo, SP</p>
              </div>
              <div>
                <FaStickyNote id="note" />
              </div>
            </div>
            <div id="apex1"></div>
            <Charts
              totalUsers={totalUsers}
              totalActiveUsers={totalActiveUsers}
              totalInactiveUsers={totalInactiveUsers}
              totalNotes={totalNotes}
              totalUndatedNotes={totalUndatedNotes}
              totalPendingNotes={totalPendingNotes}
              totalCompletedNotes={totalCompletedNotes}
              totalOverdueNotes={totalOverdueNotes}
            />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Daily Reports</h1>
                <p>São Bernardo do Campo, São Paulo, SP</p>
              </div>
              <div>
                <FaChartArea />
              </div>
            </div>
            <div id="apex1"></div>

            <div className="charts__right__cards">
              <div className="card0">
                <h1>Usuários Cadastrados</h1>
                <p>{totalUsers}</p>
              </div>

              <div className="card1">
                <h1>Usuários Ativos</h1>
                <p>{totalActiveUsers}</p>
              </div>

              <div className="card2">
                <h1>Usuários Inativos</h1>
                <p>{totalInactiveUsers}</p>
              </div>

              <div className="card3">
                <h1>Anotações Criadas</h1>
                <p>{totalNotes}</p>
              </div>

              <div className="card4">
                <h1>Anotações (S/ Data)</h1>
                <p>{totalUndatedNotes}</p>
              </div>

              <div className="card5">
                <h1>Anotações (Pendentes)</h1>
                <p>{totalPendingNotes}</p>
              </div>

              <div className="card6">
                <h1>Anotações (Concluídas)</h1>
                <p>{totalCompletedNotes}</p>
              </div>

              <div className="card7">
                <h1>Anotações (Atrasadas)</h1>
                <p>{totalOverdueNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
