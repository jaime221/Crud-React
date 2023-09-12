import { useState, useEffect } from "react";
import UseUserStore from "../../stores/user.store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateUserModal from "../../components/User/CreateUser";
import UpdateUser from "./UpdateUser";


function UserList() {
    const { users, GetAllUser, DeleteUser } = UseUserStore();
    const [userToDelete, setUserToDelete] = useState<{ id: number; userEmail: string } | null>(null);

    useEffect(() => {
        GetAllUser();
    }, []);
    const handleDelete = (id: number, userEmail: string) => {
        setUserToDelete({ id, userEmail });
    };
    const confirmDelete = () => {
        if (userToDelete) {
            
            DeleteUser(userToDelete.id);
            toast.success(`Se ha eliminado el usuario  correctamente`, {
                position: 'top-right',
                autoClose: 3000,
            });
          
            setUserToDelete(null);
        }
    };
    const cancelDelete = () => {
        setUserToDelete(null);
    };

    return (

        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-center mb-4">Lista de Usuarios</h1>
          
            <div className="flex justify-end mb-4">
                <CreateUserModal />
            </div>
         
            <div className="flex justify-center">
  <table className="min-w-full">
    <thead>
      <tr className="bg-gray-800 text-white">
        <th className="py-2 px-4">email</th>
        <th className="py-2 px-4">rol</th>
        <th className="py-2 px-4">Acciones</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user) => (
        <tr key={user.id}>
          <td className="py-2 px-4 whitespace-nowrap text-center">{user.email}</td>
          <td className="py-2 px-4 whitespace-nowrap text-center">{user.rol.rol}</td>
          <td className="py-2 px-4 whitespace-nowrap text-center">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handleDelete(user.id, user.email)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <svg
                  width="27"
                  height="27"
                  fill="none"
                  stroke="#0d0c0c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Eliminar
              </button>
              <UpdateUser id={user.id} newEmailUser={user.email} newRolId={user.rolId} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            <ToastContainer />
            {userToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p>¿Estás seguro de que deseas eliminar el rol "{userToDelete.userEmail}"?</p>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Sí, eliminar
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserList;