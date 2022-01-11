import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

export default function Profile({ user }) {
  const [editingDisabled, setEditingDisabled] = useState(true);
  const [avatarFormImg, setAvatarFormImg] = useState(user.avatar);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const form = useRef(null);

  const onAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    // console.log(e.target);
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
  const onEditingChange = () => { setEditingDisabled(!editingDisabled); };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', user.id);
    formData.append('avatar', user.avatar);
    formData.append('new_avatar', avatar);
    formData.append('name', name);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone', phone);

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    axios({
      url: '/profile/edit',
      method: 'POST',
      data: formData,
      config
    }).then((response) => {
      console.log('FormData resp: ', response);
      setEditingDisabled(true);
      // Inertia.reload();
    });
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
              ref={form}
              className="space-y-8 divide-y divide-gray-200"
              method="POST"
              onSubmit={onSubmit}
            >
              <div className="space-y-8 divide-y divide-gray-200">

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="flex flex-wrap sm:col-span-3 sm:row-span-2 content-center">
                    <label htmlFor="photo" className="w-full block text-sm font-medium text-gray-700">
                      Avatar
                    </label>
                    <div className="mt-1 grid grid-cols-12 gap-x-6 items-center">
                      <span className="w-14 h-14 flex rounded-full overflow-hidden bg-gray-100 col-span-2">
                        <img src={avatarFormImg} />
                      </span>
                      <input
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
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
