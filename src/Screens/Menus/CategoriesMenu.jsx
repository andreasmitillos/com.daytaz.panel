import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import Buttons from "../../Components/Inputs/Buttons";
import Inputs from "../../Components/Inputs/Inputs";
import Modal from "../../Components/Modal/Modal";

const CategoriesMenu = (props) => {
  return (
    <MenuTemplate tab="categories" tabName="Categories">
      <div className="col-span-6">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="w-full my-2">
          <Buttons size="lg" variant="indigo" full loading>
            Register User to DaytaZ Admin
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="transparent" rounded loading>
            Invite User
          </Buttons>
          <Buttons size="md" variant="transparent" rounded>
            Invite User
          </Buttons>
          <Buttons size="lg" variant="transparent" rounded>
            Create Restaurant
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="indigo" rounded>
            Invite User
          </Buttons>
          <Buttons size="md" variant="indigo" rounded>
            Invite User
          </Buttons>
          <Buttons size="lg" variant="indigo" rounded>
            Create Restaurant
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="transparent">
            Invite User
          </Buttons>
          <Buttons size="md" variant="transparent">
            Invite User
          </Buttons>
          <Buttons size="lg" variant="transparent">
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="indigo">
            Invite User
          </Buttons>
          <Buttons size="md" variant="indigo">
            Invite User
          </Buttons>
          <Buttons size="lg" variant="indigo">
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="indigo" soft>
            Invite User
          </Buttons>
          <Buttons size="md" variant="indigo" soft>
            Invite User
          </Buttons>
          <Buttons size="lg" variant="indigo" soft>
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="blue" loading>
            Invite User
          </Buttons>
          <Buttons size="md" variant="blue">
            Invite User
          </Buttons>
          <Buttons size="lg" variant="blue">
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="blue" soft>
            Invite User
          </Buttons>
          <Buttons size="md" variant="blue" soft>
            Invite User
          </Buttons>
          <Buttons size="lg" variant="blue" soft>
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="red">
            Invite User
          </Buttons>
          <Buttons size="md" variant="red">
            Invite User
          </Buttons>
          <Buttons size="lg" variant="red">
            Invite User
          </Buttons>
        </div>

        <div className="my-2 flex items-center">
          <Buttons size="sm" variant="red" soft>
            Invite User
          </Buttons>
          <Buttons size="md" variant="red" soft>
            Invite User
          </Buttons>
          <Buttons size="lg" variant="red" soft>
            Invite User
          </Buttons>
        </div>
      </div>

      <div className="col-span-6 mt-8">
        <h2 className="text-2xl font-bold">Forms</h2>
        <h3 className="text-xl fond-semibold mb-3 mt-2">Inputs</h3>

        <div className="my-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-3">
              <Inputs
                isInput
                label="Email"
                cornerLabel="Required"
                subLabel="You'll use this to login"
                placeholder="me@daytaz.com"
                type="email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                }
                disabled
                // error="Not a valid email address"
              />
            </div>
            <div className="col-span-3">
              <Inputs
                isInput
                label="Password"
                cornerLabel="Required"
                subLabel="Keep this a secret!"
                placeholder="Your Password"
                type="password"
                // icon={
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     viewBox="0 0 24 24"
                //     fill="currentColor"
                //     className="w-5 h-5"
                //   >
                //     <path
                //       fillRule="evenodd"
                //       d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                //       clipRule="evenodd"
                //     />
                //   </svg>
                // }
                // disabled
                error="Not a valid email address"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-6">
        <h3 className="text-xl fond-semibold mb-3 mt-2">Text Area</h3>

        <div className="my-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Inputs
                isTextArea
                label="Restaurant Description"
                cornerLabel="Optional"
                subLabel="Used to greet your customers"
                placeholder="My restaurant is..."
                // icon={
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     viewBox="0 0 24 24"
                //     fill="currentColor"
                //     className="w-5 h-5"
                //   >
                //     <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                //     <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                //   </svg>
                // }
                // disabled
                // error="Not a valid email address"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-6">
        <h3 className="text-xl fond-semibold mb-3 mt-2">Select</h3>

        <div className="my-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Inputs
                isSelect
                label="Restaurant Description"
                cornerLabel="Optional"
                subLabel="Used to greet your customers"
                placeholder="My restaurant is..."
                // icon={
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     viewBox="0 0 24 24"
                //     fill="currentColor"
                //     className="w-5 h-5"
                //   >
                //     <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                //     <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                //   </svg>
                // }
                // disabled
                // error="Not a valid email address"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 my-6">
        <h2 className="text-2xl font-bold mb-2">Modals</h2>
        <Modal
          buttonText="Create new User"
          buttonVariant="indigo"
          buttonSize="md"
        ></Modal>
      </div>
    </MenuTemplate>
  );
};

export default CategoriesMenu;
