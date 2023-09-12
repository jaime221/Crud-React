import React, { useState } from 'react';
import UseUserStore from '../../stores/user.store';
import { CreateUser } from '../../types/user.type';
import UseRolStore from '../../stores/rol.store';

const CreateUserModal = () => {
    const { roles, GetAllRol } = UseRolStore();
    React.useEffect(() => {
        GetAllRol();
    }, []);
    const { CreateUser } = UseUserStore();
    const [user, setUser] = useState<CreateUser>({
        email: '',
        pass: '',
        rolId: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
      

    const handleSubmit = async () => {
        try {
            await CreateUser(user);
            closeModal();
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
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
                    className="mr-2"
                >
                    <path d="M12 5.25v13.5"></path>
                    <path d="M18.75 12H5.25"></path>
                </svg>
                <span>Agregar</span>
            </button>
            {isModalOpen && (
                <div>

                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-container bg-white p-6 rounded-lg shadow-lg relative">
                            <span onClick={closeModal} className="close-modal absolute top-2 right-4 text-gray-600 cursor-pointer text-2xl">
                                &times;
                            </span>
                            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Usuario</h2>
                            <input
                                type="text"
                                name="email"
                                placeholder="Correo electrónico"
                                value={user.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            />
                            <input
                                type="password"
                                name="pass"
                                placeholder="Contraseña"
                                value={user.pass}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            />

                            <select
                                name="rolId"
                                onChange={(e) => handleInputChange(e)}
                                value={user.rolId}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            >
                                <option value="" disabled>Selecciona un Rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.id} value={rol.id}>
                                        {rol.rol}
                                    </option>
                                ))}
                            </select>


                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Crear Usuario
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUserModal;
