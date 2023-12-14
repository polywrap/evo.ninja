import {
  allowTelemetryAtom,
  capReachedAtom,
  evoServiceAtom,
  userWorkspaceAtom,
  localOpenAiApiKeyAtom,
  showAccountModalAtom,
  errorAtom
} from "@/lib/store";
import { useCreateChat } from "@/lib/mutations/useCreateChat";
import { useAddChatLog } from "@/lib/mutations/useAddChatLog";
import { useAddMessages } from "@/lib/mutations/useAddMessages";
import { useChats } from "@/lib/queries/useChats";
import { useAddVariable } from "@/lib/mutations/useAddVariable";
import { useCheckForUserFiles } from "@/lib/hooks/useCheckForUserFiles";
import { ChatLog } from "@/components/Chat";
import { EvoThreadCallbacks, EvoThreadConfig } from "@/lib/services/evo/EvoThread";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InMemoryWorkspace } from "@evo-ninja/agent-utils";
import { ChatLogType, ChatMessage } from "@evo-ninja/agents";

export const useEvoService = (
  chatId: string | "<anon>" | undefined,
  isAuthenticated: boolean,
  onCreateChat: (chatId: string) => void
): {
  logs: ChatLog[] | undefined;
  isStarting: boolean;
  isRunning: boolean;
  handleStart: (goal: string) => void;
} => {
  // Globals
  const [evoService] = useAtom(evoServiceAtom);
  const [userWorkspace, setUserWorkspace] = useAtom(userWorkspaceAtom);
  const [allowTelemetry] = useAtom(allowTelemetryAtom);
  const [openAiApiKey] = useAtom(localOpenAiApiKeyAtom);
  const [, setCapReached] = useAtom(capReachedAtom);
  const [, setAccountModalOpen] = useAtom(showAccountModalAtom);
  const [, setError] = useAtom(errorAtom);

  // State
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const chatLogRef = useRef<ChatLog[]>([]);
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);

  const router = useRouter();
  const checkForUserFiles = useCheckForUserFiles(userWorkspace);

  // Mutations
  const { mutateAsync: createChat } = useCreateChat();
  const { mutateAsync: addChatLog } = useAddChatLog();
  const { mutateAsync: addMessages } = useAddMessages();
  const { mutateAsync: addVariable } = useAddVariable();

  // Queries
  const { data: chats } = useChats();

  const handleChatIdChange = (chatId: string | undefined) => {
    const currentThread = evoService.current;

    if (currentThread && currentThread.chatId === chatId) {
      return;
    }

    evoService.disconnect();

    const config: EvoThreadConfig = {
      chatId: chatId || "<anon>",
      loadChatLog,
      onChatLogAdded: handleChatLogAdded,
      onMessagesAdded: handleMessagesAdded,
      onVariableSet: handleVariableSet
    };
    const callbacks: EvoThreadCallbacks = {
      setIsRunning,
      setChatLog,
      onGoalCapReached: () => {
        setCapReached(true);
        setAccountModalOpen(true);
      },
      onError: (error: string) => {
        console.error(error);
        setError("Failed to start Evo.");
      },
    };
    evoService.connect(config, callbacks); 
  }

  const loadChatLog = async (chatId: string) => {
    if (chatId === "<anon>") {
      return [];
    }

    // TODO: handle this properly
    if (!chats) {
      console.error("CHATS NOT LOADED YET")
      return [];
    }

    const currentChat = chats?.find(c => c.id === chatId);

    if (!currentChat) {
      return [];
    }

    return currentChat.logs;
  }

  const handleChatLogAdded = async (chatLog: ChatLog) => {
    checkForUserFiles();
    chatLogRef.current = [...chatLogRef.current, chatLog];
    setChatLog(chatLogRef.current);
    if (isAuthenticated && chatId) {
      await addChatLog({ chatId, log: chatLog });
    }
  }

  const handleMessagesAdded = async (type: ChatLogType, messages: ChatMessage[]) => {
    if (!isAuthenticated || !chatId) {
      return;
    }

    await addMessages({
      chatId,
      messages,
      type
    })
  };

  const handleVariableSet = async (key: string, value: string) => {
    if (!isAuthenticated || !chatId) {
      return;
    }

    await addVariable({
      chatId,
      key,
      value
    });
  }

  const handleStart = async (goal: string) => {
    if (isStarting) {
      return;
    }

    setIsStarting(true);

    if (isAuthenticated) {
      // Create a ChatID
      if (!chatId) {
        chatId = uuid();
        await createChat(chatId);
        handleChatIdChange(chatId);
        onCreateChat(chatId);
      }
    }

    // If no workspace exists, create it
    const workspace = userWorkspace || new InMemoryWorkspace();
    if (!userWorkspace) {
      setUserWorkspace(workspace);
    }

    // Tell the EvoService to start the goal
    evoService.start({
      goal,
      workspace,
      allowTelemetry,
      openAiApiKey
    });
    setIsStarting(false);
  }

  useEffect(() => {
    handleChatIdChange(chatId);
  }, [chatId]);

  return {
    logs: chatLog,
    isStarting,
    isRunning,
    handleStart
  };
}