import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile() {
  const { auth } = usePage().props;
  const user = auth.user;

  const fileInput = useRef();

  const [editingDisabled, setEditingDisabled] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatarFormImg, setAvatarFormImg] = useState(user.avatar);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const onAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (ev) {
      setAvatarFormImg(ev.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onNameChange = (e) => setName(e.target.value);
  const onLastNameChange = (e) => setLastName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    e.target.value === newPassword
      ? setPasswordsMatch(true)
      : setPasswordsMatch(false);
  };
  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    e.target.value === password
      ? setPasswordsMatch(true)
      : setPasswordsMatch(false);
  };
  const onEditingChange = () => {
    if (!editingDisabled) {
      setPasswordsMatch(true);
      setPassword('');
      setNewPassword('');
      setAvatarFormImg(user.avatar);
      setAvatar();
      setName(user.name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone(user.phone);
      fileInput.current.value = '';
    }
    setEditingDisabled(!editingDisabled);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('avatar', user.avatar);
      formData.append('new_avatar', avatar);
      formData.append('name', name);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', newPassword);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      // NB много времени убил на попытки адекватно отправить POST через инерцию,
      // но постоянно сыпались ошибки, так что решил использовать axios
      // ! Пока что axios привязан только в виде dev зависимости
      axios({
        url: '/profile/edit',
        method: 'POST',
        data: formData,
        config
      }).then(() => {
        setEditingDisabled(true);
        Inertia.reload();
      });
    }
  };
  return (
    <>
      <header>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">User Profile</h1>
        </div>
      </header>
      <main>
        <div className="flex flex-col place-items-center">
          <div className="my-6 overflow-x-auto sm:-mx-6 lg:-mx-8 max-w-2xl">
            <form
              className="space-y-8 divide-y divide-gray-200"
              method="POST"
              onSubmit={onSubmit}
            >
              <div className="space-y-8 divide-y divide-gray-200">

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="flex flex-wrap sm:col-span-6 content-center">
                    <label htmlFor="photo" className="w-full block text-sm font-medium text-gray-700">
                      Avatar
                    </label>
                    <div className="mt-1 w-full grid grid-cols-12 gap-x-6 items-center">
                      <span className="w-10 h-10 flex justify-center rounded-full overflow-hidden bg-gray-100 col-span-2">
                        <img src={avatarFormImg} />
                      </span>
                      <input
                        ref={fileInput}
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={onAvatarChange}
                        disabled={editingDisabled}
                        className="form-control
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          col-span-10
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        value={name}
                        onChange={onNameChange}
                        disabled={editingDisabled}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={onLastNameChange}
                        disabled={editingDisabled}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={onEmailChange}
                        disabled={editingDisabled}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        value={phone}
                        onChange={onPhoneChange}
                        disabled={editingDisabled}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        autoComplete="password"
                        onChange={onPasswordChange}
                        disabled={editingDisabled}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Repeat new password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        autoComplete="password"
                        value={newPassword}
                        disabled={editingDisabled}
                        onChange={onNewPasswordChange}
                        className={classNames(
                          !passwordsMatch ? 'border-red-300' : 'border-gray-300',
                          'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md'
                        )}
                        aria-invalid={!passwordsMatch}
                      />
                      {!passwordsMatch
                        && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                      }
                    </div>
                    {!passwordsMatch
                      && <p className="mt-2 text-sm text-red-600" id="password-error">
                        Passwords don't match
                      </p>
                    }

                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-center py-1">
                  {editingDisabled
                    ? <><button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={onEditingChange}
                    >
                      Edit
                    </button> </>
                    : <><button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={onEditingChange}
                    >
                      Cancel
                    </button>
                      <button
                        type="submit"
                        className={classNames(
                          passwordsMatch ? '' : 'opacity-50 cursor-not-allowed',
                          'ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        )}
                        disabled={!passwordsMatch}
                      >
                        Save
                      </button> </>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
