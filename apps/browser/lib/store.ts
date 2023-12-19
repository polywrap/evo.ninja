import { InMemoryWorkspace, Workspace } from "@evo-ninja/agent-utils";
import { InMemoryFile } from "@nerfzael/memory-fs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { EvoService } from "@/lib/services/evo/EvoService";

interface ChatInfo {
  id: string | "<anon>" | undefined;
  name: string | undefined;
}
export const chatInfoAtom = atom<ChatInfo, Partial<ChatInfo>[], ChatInfo>(
  { id: "<anon>", name: undefined },
  (get, set, args) => {
    const currentState: ChatInfo = get(chatInfoAtom);
    const newState: ChatInfo = set(chatInfoAtom, { ...currentState, ...args });
    return newState;
  }
);

export const localOpenAiApiKeyAtom = atomWithStorage<string | undefined>(
  "openai-api-key",
  undefined
);
export const allowTelemetryAtom = atomWithStorage("allow-telemetry", false);
export const welcomeModalAtom = atomWithStorage("welcome-modal-seen", false);
export const showDisclaimerAtom = atomWithStorage("show-disclaimer", true);
export const signInModalAtom = atom<boolean>(false);
export const capReachedAtom = atom<boolean>(false);
export const errorAtom = atom<string | undefined>(undefined);
export const showAccountModalAtom = atom<boolean>(false);
export const userFilesAtom = atom<InMemoryFile[]>([]);
export const uploadedFilesAtom = atom<InMemoryFile[]>([]);
export const userWorkspaceAtom = atom<Workspace>(new InMemoryWorkspace());
export const sidebarAtom = atom<boolean>(true);
export const evoServiceAtom = atom<EvoService>(new EvoService("<anon>"));
