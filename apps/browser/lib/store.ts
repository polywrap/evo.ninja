import { Workspace } from "@evo-ninja/agent-utils";
import { InMemoryFile } from "@nerfzael/memory-fs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ProxyEmbeddingApi, ProxyLlmApi } from "./api";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "./supabase/dbTypes";

export const localOpenAiApiKeyAtom = atomWithStorage<string | null>(
  "openai-api-key",
  null
);
export const allowTelemetryAtom = atomWithStorage("allow-telemetry", false);
export const welcomeModalAtom = atomWithStorage("welcome-modal-seen", false);
export const showDisclaimerAtom = atomWithStorage("show-disclaimer", true);
export const capReachedAtom = atom<boolean>(false)
export const errorAtom = atom<string | undefined>(undefined)
export const showAccountModalAtom = atom<boolean>(false);
export const userFilesAtom = atom<InMemoryFile[]>([]);
export const uploadedFilesAtom = atom<InMemoryFile[]>([]);
export const userWorkspaceAtom = atom<Workspace | undefined>(undefined);
export const sidebarAtom = atom<boolean>(true)
export const chatIdAtom = atom<string>("")
export const proxyLlmAtom = atom<ProxyLlmApi | undefined>(undefined)
export const proxyEmbeddingAtom = atom<ProxyEmbeddingApi | undefined>(undefined)

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw Error("Env missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw Error("Env missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabaseAtom = atom<SupabaseClient<Database>>(createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
))