import React, { useState } from 'react';
import UseUserStore from '../../stores/user.store';
import UseRolStore from '../../stores/rol.store';

const UpdateUser = ({ id, newEmailUser, newRolId }: { id: number, newEmailUser: string, newRolId: number }) => {
    const { roles, GetAllRol } = UseRolStore();
    React.useEffect(() => {
        GetAllRol();
    }, []);

    const { UpdateUser } = UseUserStore();
    const [newEmail, setNewEmail] = useState(newEmailUser);
    const [newRol, setNewRol] = useState(newRolId);
    const [newPassword, setNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewEmail(newEmailUser);
        setNewRol(newRolId);
        setNewPassword('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRol(Number(e.target.value));
    };

    const handleSubmit = async () => {
        if (newEmail.trim() !== '') {
            const updatedUser = {
                id: id,
                email: newEmail,
                rolId: newRol,
                pass: newPassword,
            };

            await UpdateUser(id, updatedUser);
            closeModal();
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
                >
                    <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Actualizar</span>
            </button>
            {isModalOpen && (
                <div>

                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-container bg-white p-6 rounded-lg shadow-lg relative">
                            <span onClick={closeModal} className="close-modal absolute top-2 right-4 text-gray-600 cursor-pointer text-2xl">
                                &times;
                            </span>
                            <h2 className="text-xl font-semibold mb-4">Actualizar Usuario</h2>

                            <label htmlFor="email" className="block font-semibold mb-2">Correo:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={newEmail}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            />

                            <label htmlFor="rolId" className="block font-semibold mb-2">Selecciona un Rol:</label>
                            <select
                                id="rolId"
                                name="rolId"
                                onChange={handleSelectChange}
                                value={newRol}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            >
                                <option value="" disabled>Selecciona un Rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.id} value={rol.id}>
                                        {rol.rol}
                                    </option>
                                ))}
                            </select>
                            <div className='mx-2'></div>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Guardar
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
