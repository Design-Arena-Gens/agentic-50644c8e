"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Sparkles } from "lucide-react";

type RecognitionInstance = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
};

type RecognitionConstructor = new () => RecognitionInstance;

type RecognitionResultEvent = {
  results: Array<{
    0: {
      transcript: string;
    };
  }>;
};

type RecognitionErrorEvent = {
  error?: string;
  message?: string;
};

const COMMAND_DICTIONARY = [
  { id: "hero", phrases: ["home", "hero", "top"] },
  { id: "services", phrases: ["services", "features", "solutions"] },
  { id: "integrations", phrases: ["live", "integrations", "insights"] },
  { id: "coverage", phrases: ["coverage", "map", "cities"] },
  { id: "voice", phrases: ["voice", "navigation", "assistant"] },
  { id: "booking", phrases: ["book", "booking", "ride", "call"] },
  { id: "contact", phrases: ["contact", "partner", "connect"] },
];

const SECTION_TITLES: Record<string, string> = {
  hero: "Welcome",
  services: "Mobility Engine",
  integrations: "Live Operations",
  coverage: "Coverage Heatmap",
  voice: "Voice Navigation",
  booking: "Book a Ride",
  contact: "Partner with FairGo",
};

export default function VoiceNavigator() {
  const recognitionConstructor = useMemo(() => {
    if (typeof window === "undefined") return null;
    const browserWindow = window as typeof window & {
      SpeechRecognition?: RecognitionConstructor;
      webkitSpeechRecognition?: RecognitionConstructor;
    };
    const SpeechRecognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
    return SpeechRecognition ?? null;
  }, []);

  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "unsupported">(
    recognitionConstructor ? "idle" : "unsupported",
  );
  const [lastCommand, setLastCommand] = useState<string>("");
  const recognitionRef = useRef<RecognitionInstance | null>(null);

  const dispatchCommand = useCallback((transcript: string) => {
    const match = COMMAND_DICTIONARY.find((entry) =>
      entry.phrases.some((phrase) => transcript.includes(phrase)),
    );

    if (!match) {
      setLastCommand(`Sorry, "${transcript}" is not linked yet.`);
      setStatus("idle");
      return;
    }

    const target = typeof document !== "undefined" ? document.getElementById(match.id) : null;

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setLastCommand(`Navigated to ${SECTION_TITLES[match.id] ?? match.id}`);
    } else {
      setLastCommand(`Section "${match.id}" is not visible right now.`);
    }

    setStatus("idle");
  }, []);

  useEffect(() => {
    if (!recognitionConstructor) {
      return;
    }

    const recognition = new recognitionConstructor();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .toLowerCase()
        .trim();

      if (!transcript) {
        setStatus("idle");
        return;
      }

      setStatus("processing");
      dispatchCommand(transcript);
    };

    recognition.onerror = () => {
      setStatus("idle");
    };

    recognition.onend = () => {
      setStatus((prev) => (prev === "processing" ? "processing" : "idle"));
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [dispatchCommand, recognitionConstructor]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (status === "listening") {
      recognitionRef.current.stop();
      setStatus("idle");
      return;
    }

    try {
      recognitionRef.current.start();
      setStatus("listening");
      setLastCommand("");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "unsupported") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 text-slate-100">
      {lastCommand ? (
        <div className="max-w-xs rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/20">
          <div className="flex items-center gap-2 font-semibold uppercase tracking-wide text-cyan-200">
            <Sparkles size={16} />
            Voice Command
          </div>
          <p className="mt-1 text-slate-100/90">{lastCommand}</p>
        </div>
      ) : null}
      <button
        type="button"
        onClick={toggleListening}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-cyan-500/80 text-slate-900 transition hover:scale-105 hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        aria-pressed={status === "listening"}
        aria-label="Toggle voice navigation"
      >
        {status === "listening" ? <Mic size={26} /> : <MicOff size={26} />}
      </button>
    </div>
  );
}
