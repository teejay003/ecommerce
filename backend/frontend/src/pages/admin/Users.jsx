import { useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../slices/AdminSlice';
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../slices/AdminSlice';


function Users() {

  const { user } = useSelector(state => state.auth)
  const { users, loading } = useSelector(state => state.admin)
  const redirect = useNavigate()
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [id, setId] = useState(null)
  
  useEffect(() => {

    if (!user.is_admin) {
      redirect('/')
    } else {

      dispatch(getUsers(user.access))
    }
  
  }, [dispatch, user, redirect])
  

  const handleDeleteUser = (id) => {
    setModal(false)
    dispatch(deleteUser({ id, token: user.access }))
  }
  

  return (
    <div className="container">
      {user.is_admin && (
        <>
          {loading ? (
            <Spinner />
          ) : (
              <div>
                {modal &&
                  <div className='delete-modal fixed-top'>
                    <div>
                      <h2 className="text-center mb-4">Delete User?</h2>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-danger" onClick={() => {
                          handleDeleteUser(id)
                          setModal(false)
                        }}>Yes</button>
                        <button className="btn btn-warning ml-3" onClick={()=>setModal(false)}>No</button>
                      </div>
                    </div>
                  </div>
                }
                <div className="responsive-table">
                  <table className="table table-hover table-bordered">
                      <caption>List of users</caption>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col" className="d-none d-sm-table-cell">
                          EMAIL
                        </th>
                        <th scope="col">ADMIN</th>
                        <th scope="col">OPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr key={user.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{user.name}</td>
                          <td className="d-none d-sm-table-cell">{user.email}</td>
                          <td>
                            {user.is_admin ? (
                              <i className="fa fa-check  text-success"></i>
                            ) : (
                              <i className="fa fa-check  text-danger"></i>
                            )}
                          </td>
                          <td className="d-flex">
                            <button
                              className="btn fa fa-trash text-danger"
                              onClick={() => {
                                setId(user.id)
                                setModal(true)
                              }}
                            ></button>
                      
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Users