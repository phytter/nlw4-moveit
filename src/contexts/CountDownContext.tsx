import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { ChallengeContext } from "./challengeContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number,
    seconds: number,
    isActive: boolean,
    hasFinished: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false);


    const { startNewChallenge } = useContext(ChallengeContext);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }

    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountdown,
            resetCountdown
        }}>
            { children}
        </CountdownContext.Provider>
    );
}