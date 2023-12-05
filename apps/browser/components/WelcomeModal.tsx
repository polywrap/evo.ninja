import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const WELCOME_MODAL_SEEN_STORAGE_KEY = "welcome-modal-seen";

export default function WelcomeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <div
            className="fixed inset-0 overflow-y-auto"
            style={{ backgroundColor: "black" }}
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle text-zinc-50 shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold">
                    Welcome to Evo Ninja!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm">
                      Evo is an agent that can do many things. This is a
                      technical preview, feedback and questions are appreciated!
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-block h-12 cursor-pointer rounded-xl border-none bg-cyan-500 px-5 py-2.5 text-center text-zinc-950 shadow-md outline-none transition-all hover:bg-cyan-400"
                      onClick={onClose}
                    >
                      Try it out
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
