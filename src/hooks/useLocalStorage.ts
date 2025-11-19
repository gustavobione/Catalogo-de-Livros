import { useState, useEffect } from "react";

// Hook genérico <T> para aceitar qualquer tipo de dado (string, number, object)
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Inicialização preguiçosa (Lazy initialization)
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage chave "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Efeito para atualizar o localStorage quando o state mudar
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage chave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}