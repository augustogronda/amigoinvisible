import React from "react";
import { DownloadSimple, Link, ChatText } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { CopyButton } from "./CopyButton";
import { generateAssignmentLink, generateCSV } from "../utils/links";
import { Participant } from "../types";
import { GeneratedPairs, generateGenerationHash } from "../utils/generatePairs";

interface SecretSantaLinksProps {
  assignments: GeneratedPairs;
  instructions?: string;
  participants: Record<string, Participant>;
  onGeneratePairs: () => void;
}

export function SecretSantaLinks({ assignments, instructions, participants, onGeneratePairs }: SecretSantaLinksProps) {
  const { t } = useTranslation();

  const currentHash = generateGenerationHash(participants);
  const hasChanged = currentHash !== assignments.hash;

  const adjustedPairings = assignments.pairings.map(({ giver, receiver }): [string, string, string | undefined] => [
    participants[giver.id]?.name ?? giver.name,
    participants[receiver.id]?.name ?? receiver.name,
    participants[receiver.id]?.hint,
  ]);

  adjustedPairings.sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

  const handleExportCSV = () => {
    const csvContent = generateCSV(adjustedPairings.map(([giver, receiver]) => [giver, receiver]));
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'secret-santa-assignments.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return <>
    {hasChanged && (
      <div className="mb-2 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
        <p className="text-sm">
          {t('links.warningParticipantsChanged')}
        </p>
        <button
          className="mt-2 w-full px-2 py-1 bg-yellow-700/40 rounded hover:bg-yellow-700/50 text-center text-white text-xs"
          onClick={onGeneratePairs}
        >
          {t('links.resetAssignments')}
        </button>
      </div>
    )}
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex space-x-4 items-center mb-4">
        <p className="text-gray-600 text-balance">
          {t('links.shareInstructions')}
        </p>
        <button
          onClick={handleExportCSV}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex flex-none items-center gap-2"
        >
          <DownloadSimple size={20} weight="bold" />
          {t('links.exportCSV')}
        </button>
      </div>
      <div className="grid grid-cols-[minmax(100px,auto)_1fr] gap-3">
        {adjustedPairings.map(([giver, receiver, hint]) => (
          <React.Fragment key={giver}>
            <span className="font-medium self-center">
              {giver}:
            </span>
            <div className="flex gap-2">
              <CopyButton
                textToCopy={() => generateAssignmentLink(giver, receiver, hint, instructions)}
                className="p-2 bg-transparent border border-gray-400 text-gray-700 rounded hover:bg-gray-100 flex items-center justify-center gap-2 flex-1"
              >
                <Link size={20} weight="bold" />
                Link
              </CopyButton>
              <CopyButton
                textToCopy={async () => {
                  const link = await generateAssignmentLink(giver, receiver, hint, instructions);
                  return `¡Hola! 👋
Este es tu enlace para conocer quién es tu amigo invisible:
👉 ${link}

¡Que lo disfrutes y mucha suerte! 🎁✨`;
                }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2 flex-1"
              >
                <ChatText size={20} weight="bold" />
                Link con mensaje
              </CopyButton>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </>;
}